"use client"

import React, { useState, createContext, useEffect } from 'react'

export const LeoContext = createContext()


const LeoProvider = ({ children }) => {
    const [leo, setLeo] = useState({
        dataLoaded: false,
        isLowPoer: false
    })

    useEffect(() => {
        async function loadData() {
            const response = await fetch('https://leonhardlaupichler.com/backend/wp-json/wp/v2/posts?acf_format=standard&per_page=100')

            if (!response.ok) {
                console.log(response)
                return
            }

            const posts = await response.json()
            console.log(posts)
        }
        loadData()
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