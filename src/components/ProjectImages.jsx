import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"

import ProjectImage from "./ProjectImage"

const ProjectImages = ({ images }) => {
    // console.log(images)
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <div 
            className="project-images"
            style={{
                width: size.width * images.length,
                left: -size.width * leo.currentImageIndex
            }}
        >
            {images.map((image, i) => <ProjectImage image={image} key={i} index={i} />)}
        </div>
    )
}

export default ProjectImages