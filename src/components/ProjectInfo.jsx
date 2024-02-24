import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

const ProjectInfo = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <section className="project-info-container">
            <h1>ProjectInfo</h1>
        </section>
    )
}

export default ProjectInfo