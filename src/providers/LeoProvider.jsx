"use client"

import React, { useState, createContext, useEffect, useRef } from 'react'
import { arrangeDesktopPosts, arrangeMobilePosts } from '@/helpers'
import { useWindowSize } from '@/helpers/useWindowSize'
import { prevProject, nextProject} from '@/helpers'

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
        timerPaused: true,
        restartVideo: false,
        imagesCount: 0,
        projectLoaded: false,
        overviewsCount: 0,
        overviewsLoaded: false
    })

    const handleTimer = (
            currentId,
            projects,
            imageIndex, 
            imageArray, 
            length, 
            start
        ) => {
        console.log("index: ", index)
        console.log("cur ind: ", leo.currentImageIndex)
        console.log("length: ", length)
        console.log("start: ", start)

        // if (start) {
        //     // console.log("cur ind: ", leo.currentImageIndex)
        //     var thisLength = parseInt(length.concat("000"))
        //     var nextIndex = imageIndex + 1
        //     // var nextLength = parseInt(leo.currentProject.imageArray[index + 1].video_length.concat("000"))
        //     // console.log("next i: ", nextIndex)
        //     // console.log("next l: ", nextLength)
        //     timer.current = setTimeout(() => {
        //         // console.log('in the timeout')
        //         // console.log(index)
        //         // console.log(leo.currentProject.imageArray.length - 1)
        //         if (imageIndex === imageArray.length - 1) {
        //             console.log('on to the next')
        //             var next = nextProject(currentId, projects)
        //             setLeo(state => ({ ...state, currentImag }))
        //         } else {
        //             handleTimer(nextIndex, true)
        //             setLeo(state => ({ ...state, currentImageIndex: nextIndex, restartVideo: true }))
        //             setTimeout(() => {
        //                 setLeo(state => ({ ...state, restartVideo: false }))
        //             }, 100)
        //         }
        //     }, thisLength)
        // } else {
        //     // console.log("time to stop")
        //     clearTimeout(timer.current) 
        // }
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
            value={[
                leo,
                setLeo, 
                handleTimer, 
                prevProject, 
                nextProject,
            ]}
        >
            {children}
        </LeoContext.Provider>
    )
}

export default LeoProvider