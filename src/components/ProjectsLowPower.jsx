import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

const ProjectsLowPower = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <section className="projects-container">
            <h1>Low Power Projects</h1>
        </section>
    )
}

export default ProjectsLowPower