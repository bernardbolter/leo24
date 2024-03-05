import { useRef, useEffect, useState } from 'react'
import Image from "next/image"
import ReactPlayer from "react-player"

const ProjectImage = ({ 
    image, 
    index, 
    isDesktop, 
    setImagesCount, 
    imageIndex, 
    title, 
    timerPaused,
    setTimerPaused,
    clearTimer,
    resetTimer,
    transitionOn
}) => {
    const [playing, setPlaying] = useState(true)
    const videoRef = useRef(null)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [videoWasPaused, setVideoWasPaused] = useState(false)

    useEffect(() => {
        // console.log(videoRef.current)
        // console.log('video effect: ', timerPaused)
        // console.log(imageIndex)
        if (videoRef.current !== null) {
            if (!timerPaused && (index === imageIndex)) {
                // console.log('video effect inside')
                videoRef.current.seekTo(0, "seconds")
                setPlaying(true)
            } else {
                // console.log('video effect inside not')
                setPlaying(false)
            }
        }
    }, [timerPaused])

    useEffect(() => {
        // console.log("check video loaded: ", videoLoaded)
        if (index === imageIndex) {
            // console.log(index, " this video loaded: ", videoLoaded)
            if (!videoLoaded) {
                // console.log(index, " this video not loaded")
                setVideoWasPaused(true)
                setTimerPaused(true)
                clearTimer()
            } else {
                if (videoWasPaused) {
                    // console.log(index, " this video loaded")
                    setTimerPaused(false)
                    resetTimer()
                }
            }
        }
    }, [videoLoaded])

    return (
        <div className={transitionOn ? "project-image" : "project-image project-image-hide"}>
            {!image.image && !image.video ? (
                <Image
                    src={'https://www.tlbx.app/200-300.svg'}
                    alt={`project image from the ${title} project`}
                    fill
                    priority
                    onLoad={() => {
                        // console.log(`svg project ${index} loaded`)
                        setImagesCount(imagesCount => [...imagesCount, index])
                    }}
                />
            ) : image.image ? (
                <Image
                    src={isDesktop ? image.image.url : image.image.sizes.medium_large}
                    alt={`project image from the ${title} project`}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    onLoad={() => {
                        // console.log(`image project ${index} loaded `)
                        setImagesCount(imagesCount => [...imagesCount, index])
                    }}
                />
            ) : (
                <ReactPlayer
                    ref={videoRef}
                    url={image.video}
                    poster={image.thumbnail ? image.thumbnail.url : 'https://www.tlbx.app/200-300.svg'}
                    width='100%'
                    height='100%'
                    playsinline
                    muted={true}
                    playing={playing}
                    loop
                    onReady={() => {
                        // console.log(`video project ${index} loaded`)
                        setVideoLoaded(true)
                        setImagesCount(imagesCount => [...imagesCount, index])
                    }}
                />
            )}
        </div>
    )
}

export default ProjectImage