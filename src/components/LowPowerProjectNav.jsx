import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

const LowPowerProjectNav = ({ 
    imageIndex, 
    setImageIndex, 
    images, 
    nextProject,
    projectLoaded,
    setProjectLoaded
}) => {
    const [leo] = useContext(LeoContext)

    return (
        <div 
            className="project-nav-container"
            onClick={() => {
                if (leo.aboutOpen || leo.infoOpen ) {
                    console.log("infos open")
                } else {
                    if (projectLoaded) {
                        // console.log("nav hit")
                        if (imageIndex === images.length - 1) {
                            // console.log("nav next p")
                            setProjectLoaded(false)
                            nextProject()
                        } else {
                            setImageIndex(index => index + 1)
                        }
                    }
                }
            }}
        />
    )
}

export default LowPowerProjectNav