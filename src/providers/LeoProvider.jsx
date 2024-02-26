"use client"

import React, { useState, createContext, useEffect } from 'react'
import { arrangeDesktopPosts, arrangeMobilePosts } from '@/helpers'
import { useWindowSize } from '@/helpers/useWindowSize'

export const LeoContext = createContext()

const LeoProvider = ({ children }) => {
    const size = useWindowSize()
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
        currentImageIndex: 0
    })

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
            value={[leo, setLeo]}
        >
            {children}
        </LeoContext.Provider>
    )
}

export default LeoProvider