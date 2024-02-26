"use client"

import { useContext, useState, useEffect, useRef } from 'react'
import { LeoContext } from '@/providers/LeoProvider'

import Loader from '@/components/Loader'
import Error from '@/components/Error'

import ProjectsLowPower from '@/components/ProjectsLowPower'
import Overviews from '@/components/Overviews'

const Home = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const videoRef = useRef()
    console.log(leo.dataLoaded)

    useEffect(() => {
        console.log(videoRef)
        videoRef.current.play()
        .then(() => {
            console.log('playing')
        })
        .catch((error) => {
            if (error.name === "NotAllowedError") {
               //low power mode
               console.log("low power mode")
               setLeo(state => ({ ...state, isLowPower: true }))
            }
        })
    }, [])

    return (
        <>
            <video ref={videoRef} src={'/video/leo_logo.mp4'} muted autoPlay playsInline id="testVideo"></video>
            {!leo.dataLoaded ? (
                <Loader />
            ) : leo.dataError ? (
                <Error />
            ) : leo.isLowPower ? (
                <ProjectsLowPower />
            ) : <Overviews />}
        </>
    )
}

export default Home