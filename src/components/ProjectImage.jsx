import { useContext, useRef, useEffect, useState } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import Image from "next/image"
import ReactPlayer from "react-player"

const ProjectImage = ({ image, index }) => {
    const [leo, setLeo] = useContext(LeoContext)
    const [playing, setPlaying] = useState(true)
    // console.log(leo)
    const videoRef = useRef(null)

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
    }, [leo.timerPaused, leo.currentIndex, leo.restartVideo])

    return (
        <div className="project-image">
            {image.image ? (
                <Image
                    src={image.image.url}
                    alt="portfolio image"
                    fill
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
                />
            )}
        </div>
    )
}

export default ProjectImage