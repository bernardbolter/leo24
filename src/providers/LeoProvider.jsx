"use client"

import React, { useState, createContext, useEffect } from 'react'
import { arrangeDesktopPosts, arrangeMobilePosts } from '@/helpers'
import { isTablet } from 'react-device-detect'
import { useWindowSize } from '@/helpers/useWindowSize'

export const LeoContext = createContext()

const LeoProvider = ({ children }) => {
    const size = useWindowSize()
    const [leo, setLeo] = useState({
        isTablet: false,
        dataLoaded: false,
        dataError: false,
        aboutError: false,
        impressumError: false,
        isLowPower: false,
        rawPosts: [],
        about: {},
        desktopProjects: [],
        mobileProjects: [],
        newProjectId: 0,
        aboutOpen: false,
        infoOpen: false,
        imageIndex: 0,
        imprint: {},


        currentTitleWidth: 0,
        currentImageIndex: 0,
        currentImageLength: 0,
        timerPaused: true,
        restartVideo: false,
        imagesCount: 0,
        projectLoaded: false,
        overviewsCount: 0,
        overviewsLoaded: false,
    })

    useEffect(() => {
        setLeo(state => ({ ...state, isTablet: isTablet }))
    }, [isTablet])

    // useEffect(() => {
    //     console.log(size)
    //     console.log(window.screen.orientation.type)
    // }, [size])
    
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

    useEffect(() => {
        async function loadImprint() {
            const response = await fetch('https://leonhardlaupichler.com/backend/wp-json/wp/v2/pages/487')

            if (!response.ok) {
                console.log(response)
                setLeo(state => ({ ...state, imprintError: true }))
                return
            }

            const imprintData = await response.json()
            setLeo(state => ({ ...state, imprint: imprintData }))
        }
        if (Object.keys(leo.imprint).length === 0) {
            loadImprint()
        }
    }, [])
    
    return (
        <LeoContext.Provider
            value={[
                leo,
                setLeo
            ]}
        >
            {children}
        </LeoContext.Provider>
    )
}

export default LeoProvider