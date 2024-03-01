import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useSearchParams } from "next/navigation"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"

import Loader from "./Loader"
import ProjectLoader from "./ProjectLoader"

const DesktopProject = () => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [projectLoadCheck, setProjectLoadCheck] = useState(false)
    const [imagesCount, setImagesCount] = useState([])
    const pathname = usePathname()
    const searchParams = useSearchParams()

    console.log("desk tp: ", leo.timerPaused)

    useEffect(() => {
        setLeo(state => ({ ...state, imagesLoaded: false }))
        setProjectLoadCheck(false)
        setImagesCount([])
        // console.log(pathname, searchParams)
    },[leo.currentProject, pathname, searchParams])

    // decide which project to view if coming from overviews, or chose first project
    useEffect(() => {
        var thisId = leo.currentID === 0 ? leo.desktopProjects[0].id : leo.currentID
        var nextProjectArray = leo.desktopProjects.filter(project => project.id === thisId)
        setLeo(state => ({ ...state, 
            currentProject: nextProjectArray[0],
            currentImageIndex: 0,
            currentImageLength: 0
        }))
    }, [leo.currentID])

    useEffect(() => {
        // console.log(imagesCount.length, leo.projectLoaded)

        if (!leo.projectLoaded && Object.keys(leo.currentProject).length !== 0) {
            if (imagesCount.length === leo.currentProject.imageArray.length) {
                setLeo(state => ({ ...state, projectLoaded: true }))
                setImagesCount([])
            } else {
                if (!projectLoadCheck) {
                    setTimeout(() => {
                        if (!leo.projectLoaded) {
                            setLeo(state => ({ ...state, projectLoaded: true }))
                            setImagesCount([])
                        }
                    }, 3000)
                }
                setProjectLoadCheck(true)
                setLeo(state => ({ ...state, projectLoaded: false }))
            }
        }
    }, [imagesCount, leo.projectLoaded, leo.currentProject])

    return (
        <>
            {Object.keys(leo.currentProject).length === 0 ? (
                <Loader />
            ) : (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: Object.keys(leo.currentProject).length === 0 ? 0 : 1 }}
                        transition={{ duration: .2 }}
                        className="project-wrapper"
                    >
                        <About />
                        <ProjectInfo project={leo.currentProject} />
                        {!leo.projectLoaded && <ProjectLoader image={leo.currentProject.acf.loading_image_landscape.sizes.medium} title={leo.currentProject.title.rendered} />}
                        <Thumbs thumbs={leo.currentProject.imageArray} />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: leo.projectLoaded ? 1 : 0}}
                            transition={{ duration: .3 }}
                            className="'project-images-wrapper"
                        >
                            <ProjectImages 
                                images={leo.currentProject.imageArray} 
                                isDesktop={true} 
                                setImagesCount={setImagesCount}
                                title={leo.currentProject.title.rendered}
                            />
                        </motion.div>
                        <ProjectNav />
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    )
}

export default DesktopProject