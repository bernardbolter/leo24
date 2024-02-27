import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"

import Loader from "./Loader"

const DesktopProject = () => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)

    useEffect(() => {
        var thisID = leo.currentID === 0 ? leo.desktopProjects[0].id : leo.currentID
        var nextProject = leo.desktopProjects.filter(project => project.id === thisID)
        setLeo(state => ({ ...state, 
            currentProject: nextProject[0],
            currentImageIndex: 0,
            currentImageLength: 0,
            timerPaused: false
        }))
    }, [leo.currentID])

    useEffect(() => {
        // console.log(leo.currentProject)
        Object.keys(leo.currentProject).length !== 0 && (
                handleTimer(null, null, false),
                handleTimer(0, parseInt(leo.currentProject.imageArray[0].video_length.concat("000")), true)
            )
    }, [leo.currentProject])

    return (
        <>
            {Object.keys(leo.currentProject).length === 0 ? (
                <Loader />
            ) : (
                <AnimatePresence>
                    <motion.div 
                        className="project-container"
                        inital={{ left: '100%'}}
                        animate={{ left: '0%' }}
                        key={leo.currentProject.id}
                    >
                        <About />
                        {Object.keys(leo.currentProject).length !== 0 && <ProjectInfo project={leo.currentProject} />}
                        {Object.keys(leo.currentProject).length !== 0 && <Thumbs thumbs={leo.currentProject.imageArray} />}
                        {Object.keys(leo.currentProject).length !== 0 && <ProjectImages images={leo.currentProject.imageArray} />}
                        <ProjectNav />
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    )
}

export default DesktopProject