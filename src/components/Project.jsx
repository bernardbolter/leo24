import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import Loader from "./Loader"

const Project = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <>
            {!leo.viewProjects ? (
                <Loader />
            ) : (
                <section className="project-container">
                    <About />
                    <ProjectInfo />
                    <Thumbs />
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                    <h1>Project</h1>
                </section>
            )}
        </>
    )
}

export default Project