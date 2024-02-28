"use client"

import React, { useState, createContext, useEffect, useRef } from 'react'
import { arrangeDesktopPosts, arrangeMobilePosts } from '@/helpers'
import { useWindowSize } from '@/helpers/useWindowSize'

export const LeoContext = createContext()

const LeoProvider = ({ children }) => {
    const size = useWindowSize()
    const timer = useRef(null)
    const [leo, setLeo] = useState({
        dataLoaded: false,
        dataError: false,
        aboutError: false,
        isLowPower: false,
        rawPosts: [],
        about: {},
        desktopProjects: [],
        sortedDesktop: [],
        mobileProjects: [],
        soretedMobile: [],
        currentID: 0,
        currentProject: {},
        aboutOpen: false,
        infoOpen: false,
        currentTitleWidth: 0,
        currentImageIndex: 0,
        currentImageLength: 0,
        timerPaused: false,
        restartVideo: false,
        loadedImages: 0,
        allImagesLoaded: false,
        loadedOverviews: 0,
        allOverviews: false
    })

    const handleTimer = (index, start) => {
        // console.log("index: ", index)
        // console.log("cur ind: ", leo.currentImageIndex)
        // console.log("length: ", length)
        // console.log("start: ", start)

        if (start) {
            // console.log("cur ind: ", leo.currentImageIndex)
            var thisLength = parseInt(leo.currentProject.imageArray[index].video_length.concat("000"))
            var nextIndex = index + 1
            // var nextLength = parseInt(leo.currentProject.imageArray[index + 1].video_length.concat("000"))
            // console.log("next i: ", nextIndex)
            // console.log("next l: ", nextLength)
            timer.current = setTimeout(() => {
                // console.log('in the timeout')
                // console.log(index)
                // console.log(leo.currentProject.imageArray.length - 1)
                if (index === leo.currentProject.imageArray.length - 1) {
                    console.log('on to the next')
                    nextProject()
                } else {
                    handleTimer(nextIndex, true)
                    setLeo(state => ({ ...state, currentImageIndex: nextIndex, restartVideo: true }))
                    setTimeout(() => {
                        setLeo(state => ({ ...state, restartVideo: false }))
                    }, 100)
                }
            }, thisLength)
        } else {
            // console.log("time to stop")
            clearTimeout(timer.current) 
        }
    }

    const prevProject = () => {
        let prevProject = {}
        handleTimer(null, false)
        if (size.width < 850) {
            if (leo.currentProject.id === leo.mobileProjects[0].id) {
                prevProject = leo.mobileProjects[leo.mobileProjects.length - 1]
                setLeo(state => ({ ...state, currentProject: prevProject, currentImageIndex: 0 }))
            } else {
                const currentProjectsIndex = leo.mobileProjects.findIndex(project => project.id === leo.currentProject.id)
                const nextProjectId = leo.mobileProjects[currentProjectsIndex - 1].id
                prevProject = leo.mobileProjects.find(project => project.id === nextProjectId)
                setLeo(state => ({ ...state, currentProject: prevProject, currentImageIndex: 0 }))
            }
        } else {
            if (leo.currentProject.id === leo.desktopProjects[0].id) {
                prevProject = leo.desktopProjects[leo.desktopProjects.length - 1]
                setLeo(state => ({ ...state, currentProject: prevProject, currentImageIndex: 0 }))
            } else {
                const currentProjectsIndex = leo.desktopProjects.findIndex(project => project.id === leo.currentProject.id)
                const nextProjectId = leo.desktopProjects[currentProjectsIndex - 1].id
                prevProject = leo.desktopProjects.find(project => project.id === nextProjectId)
                setLeo(state => ({ ...state, currentProject: prevProject, currentImageIndex: 0 }))
            }
        }
    }

    const nextProject = () => {
        let nextProject = {}
        handleTimer(null, false)
        if (size.width < 850) {
            if (leo.currentProject.id === leo.mobileProjects[leo.mobileProjects.length -1].id) {
                nextProject = leo.mobileProjects[0]
                setLeo(state => ({ ...state, currentProject: nextProject, currentImageIndex: 0 }))
            } else {
                const currentProjectsIndex = leo.mobileProjects.findIndex(project => project.id === leo.currentProject.id)
                const nextProjectId = leo.mobileProjects[currentProjectsIndex + 1].id
                nextProject = leo.mobileProjects.find(project => project.id === nextProjectId)
                setLeo(state => ({ ...state, currentProject: nextProject, currentImageIndex: 0 }))
            }
        } else {
            if (leo.currentProject.id === leo.desktopProjects[leo.desktopProjects.length -1].id) {
                nextProject = leo.desktopProjects[0]
                setLeo(state => ({ ...state, currentProject: nextProject, currentImageIndex: 0 }))
            } else {
                const currentProjectsIndex = leo.desktopProjects.findIndex(project => project.id === leo.currentProject.id)
                const nextProjectId = leo.desktopProjects[currentProjectsIndex + 1].id
                nextProject = leo.desktopProjects.find(project => project.id === nextProjectId)
                setLeo(state => ({ ...state, currentProject: nextProject, currentImageIndex: 0 }))
            }
        }
    }
    
    useEffect(() => {
        async function loadData() {
            const response = await fetch('https://leonhardlaupichler.com/backend/wp-json/wp/v2/posts?acf_format=standard&per_page=100')

            if (!response.ok) {
                setLeo(state => ({ ...state, dataError: true, dataLoaded: true }))
                return
            }

            const posts = await response.json()
            setLeo(state => ({ 
                ...state, 
                rawPosts: posts, 
                mobileProjects: arrangeMobilePosts(posts),
                desktopProjects: arrangeDesktopPosts(posts),
                dataLoaded: true,
            }))

        }
        if (leo.rawPosts.length === 0) {
            loadData()
        }
    }, [])

    useEffect(() => {
        async function loadAbout() {
            const response = await fetch('https://leonhardlaupichler.com/backend/wp-json/wp/v2/pages/104')

            if (!response.ok) {
                console.log(response)
                setLeo(state => ({ ...state, aboutError: true }))
                return
            }

            const aboutData = await response.json()
            setLeo(state => ({ ...state, about: aboutData.acf }))
        }
        if (Object.keys(leo.about).length === 0) {
            loadAbout()
        }
    }, [])
    
    return (
        <LeoContext.Provider
            value={[leo, setLeo, handleTimer, prevProject, nextProject]}
        >
            {children}
        </LeoContext.Provider>
    )
}

export default LeoProvider