"use client"

import React, { useState, createContext, useEffect } from 'react'
import { arrangePosts } from '@/helpers'
import { useWindowSize } from '@/helpers/useWindowSize'
import { createProjectsWithImageArray } from '@/helpers'

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
        mobileProjects: [],
        projectID: 0,
        projectsArray: [],
        viewProjects: false
    })

    useEffect(() => {
        async function loadData() {
            const response = await fetch('https://leonhardlaupichler.com/backend/wp-json/wp/v2/posts?acf_format=standard&per_page=100')

            if (!response.ok) {
                setLeo(state => ({ ...state, dataError: true, dataLoaded: true }))
                return
            }

            const posts = await response.json()
            setLeo(state => ({ ...state, rawPosts: posts, dataLoaded: true }))

        }
        loadData()
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
        loadAbout()
    }, [])

    useEffect(() => {
        setLeo(state => ({
            ...state,
            desktopProjects: arrangePosts(leo.rawPosts, true),
            mobileProjects: arrangePosts(leo.rawPosts, false)
        }))
    }, [leo.rawPosts])

    useEffect(() => {
        if (leo.projectID !== 0) {
            const newProjects = createProjectsWithImageArray(leo.projectID, leo.rawPosts, size.width)
            setLeo(state => ({ ...state, projectsArray: newProjects, viewProjects: true  }))
        }
    }, [leo.projectID, leo.rawPosts, size.width])
    
    return (
        <LeoContext.Provider
            value={[leo, setLeo]}
        >
            {children}
        </LeoContext.Provider>
    )
}

export default LeoProvider