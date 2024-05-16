import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"
import useTimeout from "@/helpers/useSetTimeout"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import LowPowerThumbs from "./LowPowerThumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"
import LowPowerProjectNav from "./LowPowerProjectNav"

import BlackLoader from "./BlackLoader"
import ProjectLoader from "./ProjectLoader"

const MobileProject = () => {
    const [leo] = useContext(LeoContext)
    // console.log("is low: ", leo.isLowPower)
    // console.log(leo.mobileProjects)

    const [imagesCount, setImagesCount] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [currentImageLength, setCurrentImageLength] = useState(5000)
    const [nextProjectSet, setNextProjectSet] = useState(false)

    const [projectLoaded, setProjectLoaded] = useState(false)

    const [mobileCurrentProject, setMobileCurrentProject] = useState({})
    const [mobileTimerPaused, setMobileTimerPaused] = useState(false)
    const [random] = useState(Math.random() * 1)

    // reset data on page navigation or reload
    useEffect(() => {
        console.log('resetting')
        setProjectLoaded(false)
        setMobileTimerPaused(true)
        setImagesCount([])
        setImageIndex(0)
    },[random])
    
    // decide which project to view if coming from overviews, or choose first project
    // and if on low power mode select major project
    useEffect(() => {
        if ((Object.keys(mobileCurrentProject).length === 0 && !nextProjectSet)) {
            var nextProject = []
            // console.log('in effect: ', mobileCurrentProject, leo.isLowPower)
            if (leo.isLowPower) {
                const filteredMobile = leo.mobileProjects.filter(project => project.acf.overview_size === 'large-square' || project.acf.overview_size === 'landscape' || project.acf.overview_size === 'portrait')
                nextProject = filteredMobile[Math.floor(Math.random()*filteredMobile.length)];
                console.log('in low: ', nextProject)
            } else {
                var thisID = leo.newProjectId === 0 ? leo.mobileProjects[0].id : leo.newProjectId
                var nextProjectArray = leo.mobileProjects.filter(project => project.id === thisID)
                nextProject = nextProjectArray[0]
            }
            console.log("before: ", mobileCurrentProject)
            setMobileCurrentProject(nextProject)
            console.log("after: ", mobileCurrentProject)
            setImageIndex(0)
            setNextProjectSet(true)
        }
    }, [leo.newProjectId, leo.mobileProjects])

    // load new project with fade in
    useEffect(() => {
        // console.log("in load: ", mobileCurrentProject)
        if (!projectLoaded && Object.keys(mobileCurrentProject).length !== 0) {
            setProjectLoaded(false)
            if (imagesCount.length === mobileCurrentProject.imageArray.length) {
                setProjectLoaded(true)
                setImageIndex(0)
                setImagesCount([])
                setCurrentImageLength(parseInt(mobileCurrentProject.imageArray[imageIndex].video_length.concat('000')))
                clearMobileLoading()
                if (leo.isLowPower) {
                    clearMobileTimer()
                    setMobileTimerPaused(true)
                }
            }
        }
    }, [imagesCount, projectLoaded, mobileCurrentProject])

    // mobile loading timer
    const { clear: clearMobileLoading } = useTimeout(() => {
        setProjectLoaded(true)
        setMobileTimerPaused(false)
        setImageIndex(0)
        setImagesCount([])
        setCurrentImageLength(parseInt(mobileCurrentProject.imageArray[imageIndex].video_length.concat('000')))
    }, 6000)

    // image timer
    const { clear: clearMobileTimer, reset: resetMobileTimer } = useTimeout(() => {
        console.log("leo low power: ", leo.isLowPower)
        if (!leo.isLowPower) {
            if (projectLoaded) {
                console.log("timer project loaded")
                if (imageIndex !== mobileCurrentProject.imageArray.length - 1) {
                    setImageIndex(index => index + 1)
                    resetMobileTimer()
                    setMobileTimerPaused(true)
                    setTimeout(() => {
                        setMobileTimerPaused(false)
                    }, 1)
                } else {
                    console.log("timer project not loaded")
                    nextProject()
                }
            }
        }
    }, currentImageLength)

    // get new image length
    useEffect(() => {
        if (Object.keys(mobileCurrentProject).length !== 0) {
            setCurrentImageLength(mobileCurrentProject.imageArray[imageIndex].video_length.concat('000'))
        }
    }, [imageIndex])

    // pause timer to hide thumbs when info or about is open
    useEffect(() => {
        if (leo.infoOpen || leo.aboutOpen) {
            setMobileTimerPaused(true)
            clearMobileTimer()
        } else {
            setMobileTimerPaused(false)
            resetMobileTimer()
        }
    }, [leo.infoOpen, leo.aboutOpen])

    const nextProject = () => {
        const currentIndex = leo.mobileProjects.findIndex(project => project.id === mobileCurrentProject.id)

         if (currentIndex === leo.mobileProjects.length - 1) {
            setMobileTimerPaused(true)
            setProjectLoaded(false)
            setImageIndex(0)
            setImagesCount([])
            setMobileCurrentProject(leo.mobileProjects[0])
         } else {
            setMobileTimerPaused(false)
            setProjectLoaded(false)
            setImageIndex(0)
            setImagesCount([])
            setMobileCurrentProject(leo.mobileProjects[currentIndex + 1])
         }
    }

    // restart
    useEffect(() => {
        if (projectLoaded || leo.isLowPower) {
            console.log("restart loaded")
            setTimeout(() => {
                setMobileTimerPaused(false)
                resetMobileTimer()
            }, 10)
        } else {
            console.log("restart not loaded")
            setMobileTimerPaused(true)
            clearMobileTimer()
        }
    }, [projectLoaded, leo.isLowPower])
        
    return (
        <>
            {(Object.keys(mobileCurrentProject).length === 0) && !nextProjectSet ? (
                <BlackLoader />
            ) : (
                <AnimatePresence>
                    <motion.div
                        className="project-info-wrapper"
                        key={`${mobileCurrentProject.id}-mobile-project-info-wrapper`} 
                    >
                        <About key={`${mobileCurrentProject.id}-mobile-about`} />
                        <ProjectInfo project={mobileCurrentProject}  key={`${mobileCurrentProject.id}-mobile-project-info`} />
                        {!leo.isLowPower ? (
                            <Thumbs
                                thumbs={mobileCurrentProject.imageArray}
                                imageIndex={imageIndex}
                                setImageIndex={setImageIndex}
                                clearTimer={clearMobileTimer}
                                resetTimer={resetMobileTimer}
                                timerPaused={mobileTimerPaused}
                                setTimerPaused={(setMobileTimerPaused)}
                                projectLoaded={projectLoaded}
                                key={`${mobileCurrentProject.id}-mobile-thumbs`} 
                            />
                        ) : (
                            <LowPowerThumbs
                                thumbs={mobileCurrentProject.imageArray}
                                imageIndex={imageIndex}
                                setImageIndex={setImageIndex}
                                projectLoaded={projectLoaded}
                                key={`${mobileCurrentProject.id}-mobile-thumbs`} 
                            />
                        )}
                    </motion.div>
                    {!projectLoaded && <ProjectLoader 
                            image={mobileCurrentProject.acf.loading_image_portrait.sizes.medium} 
                            title={mobileCurrentProject.title.rendered}
                        />
                    }
                    <motion.div
                        className="project-images-wrapper"
                        key={`${mobileCurrentProject.id}-mobile-project-wrapper`}
                    >
                        <ProjectImages
                            images={mobileCurrentProject.imageArray}
                            isDesktop={false}
                            setImagesCount={setImagesCount}
                            title={mobileCurrentProject}
                            imageIndex={imageIndex}
                            timerPaused={mobileTimerPaused}
                            setTimerPaused={setMobileTimerPaused}
                            clearTimer={clearMobileTimer}
                            resetTimer={resetMobileTimer}
                            key={`${mobileCurrentProject.id}-mobile-project-images`}
                        />
                    </motion.div>

                    {!leo.isLowPower ? (
                        <ProjectNav
                            imageIndex={imageIndex}
                            setImageIndex={setImageIndex}
                            timerPaused={mobileTimerPaused}
                            setTimerPaused={setMobileTimerPaused}
                            images={mobileCurrentProject.imageArray}
                            nextProject={nextProject}
                            clearTimer={clearMobileTimer}
                            resetTimer={clearMobileTimer}
                            projectLoaded={projectLoaded}
                            setProjectLoaded={setProjectLoaded}
                            key={`${mobileCurrentProject.id}-mobile-project-nav`}
                        />
                    ) : (
                        <LowPowerProjectNav 
                            imageIndex={imageIndex}
                            setImageIndex={setImageIndex}
                            images={mobileCurrentProject.imageArray}
                            nextProject={nextProject}
                            projectLoaded={projectLoaded}
                            setProjectLoaded={setProjectLoaded}
                            key={`${mobileCurrentProject.id}-mobile-project-nav`}
                        />
                    )}
                    
                </AnimatePresence>
            )}
        </>
    )
}

export default MobileProject