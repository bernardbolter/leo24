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
    resetTimer
}) => {
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
            />)}
        </div>
    )
}

export default ProjectImages