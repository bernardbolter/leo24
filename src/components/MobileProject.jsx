import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"
import useTimeout from "@/helpers/useSetTimeout"
import Image from "next/image"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"

import Loader from "./Loader"

const MobileProject = () => {
    const [leo] = useContext(LeoContext)

    const [imagesCount, setImagesCount] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [currentImageLength, setCurrentImageLength] = useState(5000)

    const [projectLoaded, setProjectLoaded] = useState(false)
    const [transitionOn, setTransitionOn] = useState(false)
    const [lastPlaceholder, setLastPlaceholder] = useState('https://www.tlbx.app/200-300.svg')
    const [nextPlaceholder, setNextPlaceholder] = useState('https://www.tlbx.app/200-300.svg')

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
        var nextProject = []
        if (leo.isLowPower) {
            const filteredMobile = leo.mobileProjects.filter(project => project.acf.overview_size === 'large-square' || project.acf.overview_size === 'landscape' || project.acf.overview_size === 'portrait')
            nextProject = filteredMobile[Math.floor(Math.random()*filteredMobile.length)];
        } else {
            var thisID = leo.newProjectId === 0 ? leo.mobileProjects[0].id : leo.newProjectId
            var nextProjectArray = leo.mobileProjects.filter(project => project.id === thisID)
            nextProject = nextProjectArray[0]
        }
        console.log(nextProject)
        setMobileCurrentProject(nextProject)
        setImageIndex(0)
    }, [leo.newProjectId, leo.mobileProjects])

    // load new project with fade in
    useEffect(() => {
        if (!projectLoaded && Object.keys(mobileCurrentProject).length !== 0) {
            setProjectLoaded(false)
            if (imagesCount.length === mobileCurrentProject.imageArray.length) {
                setProjectLoaded(true)
                setImageIndex(0)
                setImagesCount([])
                setCurrentImageLength(parseInt(mobileCurrentProject.imageArray[imageIndex].video_length.concat('000')))
                clearMobileLoading()
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
    }, 3000)

    // image timer
    const { clear: clearMobileTimer, reset: resetMobileTimer } = useTimeout(() => {
        if (projectLoaded) {
            if (imageIndex !== mobileCurrentProject.imageArray.length - 1) {
                setImageIndex(index => index + 1)
                resetMobileTimer()
                setMobileTimerPaused(true)
                setTimeout(() => {
                    setMobileTimerPaused(false)
                }, 1)
            } else {
                nextProject()
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
        let theLastPlaceholder
        let theNextPlaceholder

        const currentIndex = leo.mobileProjects.findIndex(project => project.id === mobileCurrentProject.id)
        if (mobileCurrentProject.imageArray[mobileCurrentProject.imageArray.length - 1].image) {
            theLastPlaceholder = mobileCurrentProject.imageArray[mobileCurrentProject.imageArray.length - 1].image.sizes.medium
        } else {
            theLastPlaceholder = mobileCurrentProject.imageArray[mobileCurrentProject.imageArray.length - 1].thumbnail.sizes.medium
        }

        if (currentIndex === leo.mobileProjects.length -1) {
            theNextPlaceholder = leo.mobileProjects[0].acf.loading_image_landscape.sizes.medium
        } else {
            theNextPlaceholder = leo.mobileProjects[currentIndex + 1].acf.loading_image_landscape.sizes.medium
        }

         // console.log("t last: ",theLastPlaceholder)
         setLastPlaceholder(theLastPlaceholder)
         // console.log(" t next: ", theNextPlaceholder)
         setNextPlaceholder(theNextPlaceholder)

         if (currentIndex === leo.mobileProjects.length - 1) {
            setTransitionOn(true)
            setMobileTimerPaused(true)
            setTimeout(() => {
                setProjectLoaded(false)
                setImageIndex(0)
                setImagesCount([])
                setMobileCurrentProject(leo.mobileProjects[0])
            }, 500)
         } else {
            setTransitionOn(true)
            setMobileTimerPaused(false)
            setTimeout(() => {
                setProjectLoaded(false)
                setImageIndex(0)
                setImagesCount([])
                setMobileCurrentProject(leo.mobileProjects[currentIndex + 1])
            }, 500)
         }
    }

    // restart
    useEffect(() => {
        if (projectLoaded) {
            setTransitionOn(false)
            setTimeout(() => {
                setMobileTimerPaused(false)
                resetMobileTimer()
            }, 500)
        } else {
            setMobileTimerPaused(true)
            clearMobileTimer()
        }
    }, [projectLoaded])
        
    return (
        <>
            {Object.keys(mobileCurrentProject).length === 0 ? (
                <Loader />
            ) : (
                <AnimatePresence>
                    <motion.div
                        className="project-info-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        key={`${mobileCurrentProject.id}-mobile-project-info-wrapper`} 
                    >
                        <About key={`${mobileCurrentProject.id}-mobile-about`} />
                        <ProjectInfo project={mobileCurrentProject}  key={`${mobileCurrentProject.id}-mobile-project-info`} />
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
                    </motion.div>
                    <div className={transitionOn ? 'transition-container transition-container-show' : 'transition-container'}>
                        <Image
                            src={lastPlaceholder}
                            alt="last placeholder"
                            fill
                            priority
                            loading="eager"
                            style={{ objectFit: 'cover'}}
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: projectLoaded ? 1 : 0}}
                        transition={{ duration: 3 }}
                        className="'project-images-wrapper"
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
                            transitionOn={transitionOn}
                            key={`${mobileCurrentProject.id}-mobile-project-images`}
                        />
                    </motion.div>
                    <ProjectNav
                        imageIndex={imageIndex}
                        setImageIndex={setImageIndex}
                        timerPaused={mobileTimerPaused}
                        setTimerPaused={setMobileTimerPaused}
                        images={mobileCurrentProject.imageArray}
                        nextProject={nextProject}
                        clearTimer={clearMobileTimer}
                        resetTimer={clearMobileTimer}
                        key={`${mobileCurrentProject.id}-mobile-project-nav`}
                    />
                </AnimatePresence>
            )}
        </>
    )
}

export default MobileProject