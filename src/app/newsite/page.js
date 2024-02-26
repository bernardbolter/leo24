"use client"

import { useContext, useState, useEffect, useRef } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import Loader from '@/components/Loader'
import Error from '@/components/Error'

import DesktopOverviews from '@/components/DesktopOverviews'
import DesktopProjects from '@/components/DektopProjects'
import MobileOverviews from '@/components/MobileOverviews'
import MobileProjects from '@/components/MobileProjects'

const Home = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()
    const videoRef = useRef()

    useEffect(() => {
        videoRef.current.play()
        .then(() => {
            console.log('playing')
        })
        .catch((error) => {
            if (error.name === "NotAllowedError") {
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
            ) : size.width > 850  ? (
                leo.viewProjects ? <DesktopProjects /> : <DesktopOverviews />
            ) : (
                leo.viewProjects || leo.isLowPower ? <MobileProjects /> : <MobileOverviews />
            )}
        </>
    )
}

export default Home