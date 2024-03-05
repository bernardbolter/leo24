import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"

import ProjectImage from "./ProjectImage"

const ProjectImages = ({ 
    images, 
    isDesktop, 
    setImagesCount, 
    title, 
    imageIndex, 
    timerPaused,
    setTimerPaused, 
    clearTimer, 
    resetTimer,
    transitionOn
}) => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <div 
            className="project-images"
            style={{
                width: size.width * images.length,
                left: -size.width * imageIndex
            }}
        >
            {images.map((image, i) => <ProjectImage 
                image={image} 
                key={i} 
                index={i} 
                isDesktop={isDesktop} 
                setImagesCount={setImagesCount}
                imageIndex={imageIndex}
                title={title}
                timerPaused={timerPaused}
                setTimerPaused={setTimerPaused}
                clearTimer={clearTimer}
                resetTimer={resetTimer}
                transitionOn={transitionOn}
            />)}
        </div>
    )
}

export default ProjectImages