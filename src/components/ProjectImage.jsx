import { useContext, useRef, useEffect, useState } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import Image from "next/image"
import ReactPlayer from "react-player"

const ProjectImage = ({ image, index, isDesktop, setImagesCount, title }) => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [playing, setPlaying] = useState(true)
    const videoRef = useRef(null)
    const [videoLoaded, setVideoLoaded] = useState(false)

    // console.log(image)

    // useEffect(() => {
    //     // console.log(videoLoaded, index)
    //     if (leo.currentImageIndex === index) {
    //         console.log(videoLoaded, index)
    //     }
    // }, [videoLoaded, leo.currentImageIndex, index])

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