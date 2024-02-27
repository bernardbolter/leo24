import { useContext, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import Image from "next/image"

const ProjectNav = () => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [leftHover, setLeftHover] = useState(false)
    const [rightHover, setRightHover] = useState(false)

    return (
        <div className="project-nav-container">
            <div 
                className={!leo.timerPaused ? "project-nav-left project-nav-left-cursor" : "project-nav-left"}
                onClick={() => {
                    if (!leo.timerPaused) {
                        console.log("left")
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
                        console.log("right")
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