import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"

const DesktopProject = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const [thisProject, setThisProject] = useState({})

    useEffect(() => {
        var thisID = leo.currentID === 0 ? leo.desktopProjects[0].id : leo.currentID
        var nextProject = leo.desktopProjects.filter(project => project.id === thisID)
        setThisProject(nextProject[0])
    }, [leo.currentID])

    return (
        <div className="project-container">
            <About />
            {Object.keys(thisProject).length !== 0 && <ProjectInfo project={thisProject} />}
            {Object.keys(thisProject).length !== 0 && <Thumbs thumbs={thisProject.imageArray} />}
            {Object.keys(thisProject).length !== 0 && <ProjectImages images={thisProject.imageArray} />}
        </div>
    )
}

export default DesktopProject