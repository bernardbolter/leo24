"use client"

import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import Loader from '@/components/Loader'
import Error from '@/components/Error'

import DesktopOverviews from '@/components/DesktopOverviews'
import MobileOverviews from '@/components/MobileOverviews'

const Home = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const [displayDesktop, setDisplayDesktop] = useState(true)
    const size = useWindowSize()
    const videoRef = useRef()
    const router = useRouter()

    useEffect(() => {
        videoRef.current.play()
        .then(() => {})
        .catch((error) => {
            if (error.name === "NotAllowedError") {
                setLeo(state => ({ ...state, isLowPower: true }))
                router.push('/projects')
            }
        })
    }, [])

    useEffect(() => {
        const orientation = window.matchMedia('(orientation:landscape)').matches
        // console.log("is landscape: ", orientation)
        // console.log("is tab: ", leo.isTablet)
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
                ) : !displayDesktop  ? <MobileOverviews projects={leo.mobileProjects} /> : <DesktopOverviews projects={leo.desktopProjects} />
            }
        </>
    )
}

export default Home