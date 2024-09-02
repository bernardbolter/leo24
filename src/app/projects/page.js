"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import Loader from '@/components/Loader'
import Error from '@/components/Error'

import DesktopProject from '@/components/DesktopProject'
import MobileProject from '@/components/MobileProject'

const Projects = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const [displayDesktop, setDisplayDesktop] = useState(true)
    const videoRef = useRef()
    const size = useWindowSize()

    useEffect(() => {
        videoRef.current.play()
        .then(() => {})
        .catch((error) => {
            if (error.name === "NotAllowedError") {
               setLeo(state => ({ ...state, isLowPower: true }))
            }
        })
    }, [])

    useEffect(() => {
        const orientation = window.matchMedia('(orientation:landscape)').matches
        if (orientation) {
            setDisplayDesktop(true)
        } else if (size.width < 850) {
            setDisplayDesktop(false)
        } else if (leo.isTablet) {
            setDisplayDesktop(false)
        } else {
            setDisplayDesktop(true)
        }
    }, [size])

    return (
        <>
            <video ref={videoRef} src={'/video/leo_logo.mp4'} muted autoPlay playsInline id="testVideo"></video>
            {!leo.dataLoaded ? (
                    <Loader />
                ) : leo.dataError ? (
                    <Error />
                ) : !displayDesktop ? <MobileProject /> : <DesktopProject />
            }
        </>
    )
}

export default Projects