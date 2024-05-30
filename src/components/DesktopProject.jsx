import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"
import useTimeout from "@/helpers/useSetTimeout"
import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"

import Loader from "./Loader"
import ProjectLoader from "./ProjectLoader"

const DesktopProject = () => {
    const [leo] = useContext(LeoContext)

    const [imagesCount, setImagesCount] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [currentImageLength, setCurrentImageLength] = useState(5000)
    const [nextProjectSet, setNextProjectSet] = useState(false)

    const [projectLoaded, setProjectLoaded] = useState(false)

    const [desktopCurrentProject, setDesktopCurrentProject] = useState({})
    const [desktopTimerPaused, setDesktopTimerPaused] = useState(false)
    const [random] = useState(Math.random() * 1)

    // reset data on page navigation or reload
    useEffect(() => {
        setProjectLoaded(false)
        setDesktopTimerPaused(true)
        setImagesCount([])
        setImageIndex(0)
    },[random])

    // decide which project to view if coming from overviews, or chose first project
    useEffect(() => {
        if ((Object.keys(desktopCurrentProject).length === 0 && !nextProjectSet)) {
            var nextProject = []
            console.log(leo.newProjectId)
            if (leo.newProjectId === 0) {
                const filteredDesktop = leo.desktopProjects.filter(project => project.acf.overview_size === 'large-square' || project.acf.overview_size === 'landscape' || project.acf.overview_size === 'portrait')
                nextProject = filteredDesktop[Math.floor(Math.random()*filteredDesktop.length)];
            } else {
                var nextProjectArray = leo.desktopProjects.filter(project => project.id === leo.newProjectId)
                nextProject = nextProjectArray[0]
            }
            console.log(nextProject.id)
            setDesktopCurrentProject(nextProject)
            setImageIndex(0)
            setNextProjectSet(true)
        }
    }, [leo.newProjectId, leo.desktopProjects])

    // load new project with fade in
    useEffect(() => {
        // console.log("new project fade: ", projectLoaded, imagesCount)
        if (!projectLoaded && Object.keys(desktopCurrentProject).length !== 0) {
            setProjectLoaded(false)
            if (imagesCount.length === desktopCurrentProject.imageArray.length) {
                setProjectLoaded(true)
                setImageIndex(0)
                setImagesCount([])
                setCurrentImageLength(parseInt(desktopCurrentProject.imageArray[imageIndex].video_length.concat('000')))
                clearLoading()
            }
        }
    }, [imagesCount, projectLoaded, desktopCurrentProject])

    // Loading timer
    const { clear: clearLoading } = useTimeout(() => {
        setProjectLoaded(true)
        setDesktopTimerPaused(false)
        setImageIndex(0)
        setImagesCount([])
        setCurrentImageLength(parseInt(desktopCurrentProject.imageArray[imageIndex].video_length.concat('000')))
    }, 6000)

    // Image timer
    const { clear: clearTimer, reset: resetTimer } = useTimeout(() => {
        console.log("dat time: ", leo.isLowPower)
        if (!leo.isLowPower) {
            if (projectLoaded) {
                if (imageIndex !== desktopCurrentProject.imageArray.length - 1) {
                    setImageIndex(index => index + 1)
                    resetTimer()
                    setDesktopTimerPaused(true)
                    setTimeout(() => {
                        setDesktopTimerPaused(false)
                    }, 1)
                } else {
                    // console.log("next project")
                    nextProject()
                }
            }
        }
    }, currentImageLength)

    // get new image length for timer
    useEffect(() => {
        if (Object.keys(desktopCurrentProject).length !== 0) {
            setCurrentImageLength(parseInt(desktopCurrentProject.imageArray[imageIndex].video_length.concat('000')))
        }
    }, [imageIndex])

    // pause timer to hide thumbs when timer paused and info or about open
    useEffect(() => {
        if (leo.infoOpen || leo.aboutOpen) {
            // console.log("info open paused")
            setDesktopTimerPaused(true)
            clearTimer()
        } else {
            // console.log("info closed unpaused")
            setDesktopTimerPaused(false)
            resetTimer()
        }
    }, [leo.infoOpen, leo.aboutOpen])


    const nextProject = () => {
        // console.log("next project in desktop")

        const currentIndex = leo.desktopProjects.findIndex(project => project.id === desktopCurrentProject.id)


        if (currentIndex === leo.desktopProjects.length - 1) {
            setDesktopTimerPaused(true)
            setProjectLoaded(false)
            setImageIndex(0)
            setImagesCount([])
            setDesktopCurrentProject(leo.desktopProjects[0])
        } else {
            setDesktopTimerPaused(true)
            setProjectLoaded(false)
            setImageIndex(0)
            setImagesCount([])
            setDesktopCurrentProject(leo.desktopProjects[currentIndex + 1])
        }
    }

    // restart
    useEffect(() => {
        // console.log('set placeholder')
        if (projectLoaded) {
            // setTransitionOn(false)
            // console.log("PROJECT LOADED")
            setTimeout(() => {
                // console.log("resseting timer project loaded")
                setDesktopTimerPaused(false)
                resetTimer()
            }, 500)
        } else {
            // console.log("PROJECT NOT LOADED")
            setDesktopTimerPaused(true)
            clearTimer()
        }
    }, [projectLoaded])


    return (
        <>
            {Object.keys(desktopCurrentProject).length === 0 ? (
                <Loader />
            ) : (
                <AnimatePresence>
                    <motion.div
                        className="project-info-wrapper"
                        key={`${desktopCurrentProject.id}-desktop-project-inf0-wrapper`}
                    >
                        <About key={`${desktopCurrentProject.id}-desktop-about`}/>
                        <ProjectInfo 
                            project={desktopCurrentProject} 
                            key={`${desktopCurrentProject.id}-desktop-project-info`}
                        />
                        <Thumbs 
                            thumbs={desktopCurrentProject.imageArray} 
                            imageIndex={imageIndex}
                            setImageIndex={setImageIndex}
                            clearTimer={clearTimer}
                            resetTimer={resetTimer}
                            timerPaused={desktopTimerPaused}  
                            setTimerPaused={setDesktopTimerPaused}
                            projectLoaded={projectLoaded}
                            key={`${desktopCurrentProject.id}-desktop-project-thumbs`}
                        />
                    </motion.div>
                    {!projectLoaded && <ProjectLoader image={desktopCurrentProject.acf.loading_image_landscape.sizes.large} title={desktopCurrentProject.title.rendered} />}
          
                    <motion.div
                        className="project-images-wrapper"
                        key={`${desktopCurrentProject.id}-desktop-project-images-wrapper`}
                    >
                        <ProjectImages 
                            images={desktopCurrentProject.imageArray} 
                            isDesktop={true} 
                            setImagesCount={setImagesCount}
                            title={desktopCurrentProject.title.rendered}
                            imageIndex={imageIndex}
                            timerPaused={desktopTimerPaused}
                            setTimerPaused={setDesktopTimerPaused}
                            clearTimer={clearTimer}
                            resetTimer={resetTimer}
                            key={`${desktopCurrentProject.id}-desktop-project-images`}
                        />
                    </motion.div>
                    <ProjectNav 
                        imageIndex={imageIndex}
                        setImageIndex={setImageIndex}
                        timerPaused={desktopTimerPaused}
                        setTimerPaused={setDesktopTimerPaused}
                        images={desktopCurrentProject.imageArray}
                        nextProject={nextProject}
                        clearTimer={clearTimer}
                        resetTimer={resetTimer}
                        projectLoaded={projectLoaded}
                        setProjectLoaded={setProjectLoaded}
                        key={`${desktopCurrentProject.id}-desktop-project-nav`}
                    />
                </AnimatePresence>
            )}
        </>
    )
}

export default DesktopProject