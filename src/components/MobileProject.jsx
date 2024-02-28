import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"

import Loader from "./Loader"
import ProjectLoader from "./ProjectLoader"

const MobileProject = () => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [projectLoaded, setProjectLoaded] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [lastProjectId, setLastProjectId] = useState(0)
    // console.log("mobile p: ",leo.mobileProjects)
    
    useEffect(() => {
        var thisID = leo.currentID === 0 ? leo.mobileProjects[0].id : leo.currentID
        var nextProject = leo.mobileProjects.filter(project => project.id === thisID)
        setLeo(state => ({ ...state, 
            currentProject: nextProject[0],
            currentImageIndex: 0,
            currentImageLength: 0,
            timerPaused: false
        }))
    }, [leo.currentID])

    useEffect(() => {
        // console.log(leo.currentProject)
        if (Object.keys(leo.currentProject).length !== 0) {
            
            // console.log("before project loaded")
            if (lastProjectId !== leo.currentProject.id) {
                setImagesLoaded(false)
            }
            handleTimer(null, false)
            setLeo(state => ({ ...state, timerPaused: true }))
            setTimeout(() => {
                setImagesLoaded(true)
                handleTimer(0, true)
                setLeo(state => ({ ...state, timerPaused: false }))
            }, 1000)
            setProjectLoaded(true)
            setLastProjectId(leo.currentProject.id)
        } else {
            setProjectLoaded(false)
        }
    }, [leo.currentProject, leo.loadedImages])

    return (
        <>
            {!projectLoaded ? (
                <Loader />
            ) : (
                <div className="project-container">
                    <About />
                    <ProjectInfo project={leo.currentProject} />
                    {!imagesLoaded && <ProjectLoader image={leo.currentProject.acf.loading_image_portrait.sizes.medium} title={leo.currentProject.title.rendered}/>}
                    <Thumbs thumbs={leo.currentProject.imageArray} />
                    <ProjectImages images={leo.currentProject.imageArray} />
                    <ProjectNav />
                </div>
            )}
        </>
    )
}

export default MobileProject