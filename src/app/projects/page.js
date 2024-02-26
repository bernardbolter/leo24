"use client"

import { useContext, useEffect, useRef } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import Loader from '@/components/Loader'
import Error from '@/components/Error'

import DesktopProject from '@/components/DesktopProject'
import MobileProject from '@/components/MobileProject'

const Projects = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const videoRef = useRef()
    const size = useWindowSize()

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
                ) : size.width > 850  ? <DesktopProject /> : <MobileProject />
            }
        </>
    )
}

export default Projects