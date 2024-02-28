import { useContext, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import Image from "next/image"

const ProjectNav = () => {
    const [leo, setLeo, handleTimer, prevProject, nextProject] = useContext(LeoContext)
    const [leftHover, setLeftHover] = useState(false)
    const [rightHover, setRightHover] = useState(false)

    return (
        <div className="project-nav-container">
            <div 
                className={!leo.timerPaused ? "project-nav-left project-nav-left-cursor" : "project-nav-left"}
                onClick={() => {
                    if (!leo.timerPaused) {
                        if (leo.currentImageIndex === 0) {
                            prevProject()
                        } else {
                            console.log("left")
                            handleTimer(null, false)
                            setLeo(state => ({ ...state, currentImageIndex: state.currentImageIndex -1, restartVideo: true }))
                            setTimeout(() => {
                                setLeo(state => ({ ...state, restartVideo: false }))
                            }, 100)
                            handleTimer(leo.currentImageIndex - 1, true)
                        }
                    }
                }}
                onMouseOver={() => setLeftHover(true)} 
                onMouseLeave={() => setLeftHover(false)} 
            >
                <div className={leftHover && !leo.timerPaused ? "project-nav-left-button project-nav-left-button-show" : "project-nav-left-button" }>
                    <Image
                        src={'/images/back.png'}
                        alt="arrow button"
                        width={39}
                        height={39}
                    />
                </div>
            </div>
            <div 
                className={!leo.timerPaused ? "project-nav-right project-nav-right-cursor" : "project-nav-right"}
                onClick={() => {
                    if (!leo.timerPaused) {
                        if (leo.currentImageIndex === leo.currentProject.imageArray.length - 1) {
                            nextProject()
                        } else {
                            console.log("right")
                            handleTimer(null, false)
                            setLeo(state => ({ ...state, currentImageIndex: state.currentImageIndex + 1, restartVideo: true }))
                            setTimeout(() => {
                                setLeo(state => ({ ...state, restartVideo: false }))
                            }, 100)
                            handleTimer(leo.currentImageIndex + 1, true)
                        }
                    }
                }}
                onMouseOver={() => setRightHover(true)}
                onMouseLeave={() => setRightHover(false)}    
            >
                <div className={rightHover && !leo.timerPaused ? "project-nav-right-button project-nav-right-button-show" : "project-nav-right-button"}>
                    <Image
                        src={'/images/back.png'}
                        alt="arrow button"
                        width={39}
                        height={39}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectNav