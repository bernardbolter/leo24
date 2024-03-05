const ProjectNav = ({ 
    imageIndex, 
    setImageIndex, 
    timerPaused,
    setTimerPaused,
    images, 
    nextProject,
    clearTimer,
    resetTimer,
    projectLoaded,
    setProjectLoaded
}) => {
    return (
        <div 
            className="project-nav-container"
            onClick={() => {
                if (!timerPaused && projectLoaded) {
                    // console.log("nav hit")
                    if (imageIndex === images.length - 1) {
                        // console.log("nav next p")
                        setProjectLoaded(false)
                        nextProject()
                    } else {
                        setImageIndex(index => index + 1)
                        setTimerPaused(true)
                        clearTimer()
                        setTimeout(() => {
                            resetTimer()
                            setTimerPaused(false)
                        }, 1)
                    }
                }
            }}
        />
    )
}

export default ProjectNav