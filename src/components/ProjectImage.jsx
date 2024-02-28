import { useContext, useRef, useEffect, useState } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import Image from "next/image"
import ReactPlayer from "react-player"

const ProjectImage = ({ image, index }) => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [playing, setPlaying] = useState(true)
    const videoRef = useRef(null)
    const [videoLoaded, setVideoLoaded] = useState(false)

    useEffect(() => {
        // console.log(videoLoaded, index)
        if (leo.currentImageIndex === index) {
            console.log(videoLoaded, index)
        }
    }, [videoLoaded, leo.currentImageIndex, index])

    useEffect(() => {
        // console.log(videoRef.current)
        // console.log('video effect: ', leo.restartVideo)
        if (videoRef.current !== null) {
            if (!leo.timerPaused) {
                // console.log('video effect inside')
                videoRef.current.seekTo(0, "seconds")
                setPlaying(true)
            } else {
                setPlaying(false)
            }
            if (leo.restartVideo) {
                // console.log("in video restart")
                videoRef.current.seekTo(0, "seconds")
                setPlaying(true)
            }
        }
    }, [leo.timerPaused, leo.restartVideo])

    return (
        <div className="project-image">
            {image.image ? (
                <Image
                    src={image.image.url}
                    alt="portfolio image"
                    fill
                    priority={index === ( 0 || 1 ) ? true : false}
                    placeholder="blur"
                    blurDataURL={image.image.sizes.thumbnail}
                />
            ) : (
                <ReactPlayer
                    ref={videoRef}
                    url={image.video.url}
                    poster={image.thumbnail.url}
                    width='100%'
                    height='100%'
                    playsinline
                    muted={true}
                    playing={playing}
                    loop
                    onReady={() => setVideoLoaded(true)}
                />
            )}
        </div>
    )
}

export default ProjectImage