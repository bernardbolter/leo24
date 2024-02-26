import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

import Loader from "./Loader"

const Projects = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <section className="projects-container">
            {!leo.viewProjects ? (
                <Loader />
            ) : (
                <p>currentProject</p>
            )}
            <h1>Projects</h1>
        </section>
    )
}

export default Projects