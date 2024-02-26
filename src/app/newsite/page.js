"use client"

import { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import Loader from '@/components/Loader'
import Error from '@/components/Error'

import DesktopOverviews from '@/components/DesktopOverviews'
import MobileOverviews from '@/components/MobileOverviews'

const Home = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()
    const videoRef = useRef()
    const router = useRouter()

    useEffect(() => {
        videoRef.current.play()
        .then(() => {
            console.log('playing')
        })
        .catch((error) => {
            if (error.name === "NotAllowedError") {
                setLeo(state => ({ ...state, isLowPower: true }))
                router.push('/projects')
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
                ) : size.width > 850  ? <DesktopOverviews projects={leo.desktopProjects} /> : <MobileOverviews projects={leo.mobileProjects}/>
            }
        </>
    )
}

export default Home