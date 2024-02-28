import { useContext, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"

import About from "./About"
import ProjectInfo from "./ProjectInfo"
import Thumbs from "./Thumbs"
import ProjectImages from "./ProjectImages"
import ProjectNav from "./ProjectNav"

import Loader from "./Loader"
import ProjectLoader from "./ProjectLoader"

const DesktopProject = () => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [projectLoaded, setProjectLoaded] = useState(false)
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [lastProjectId, setLastProjectId] = useState(0)
    const [newP, setNewP] = useState(0)
    const [projectOne, setProjectOne] = useState(true)
    const [projectTwo, setProjectTwo] = useState(false)

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
            // setTimeout(() => {
            //     handleTimer(0, true)
            // }, 10000)
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
                <AnimatePresence>
                        {projectOne && (
                            <motion.div 
                                className="project-container"
                                style={{
                                    transformStyle: 'preserve-3d'
                                }}
                                initial={{ 
                                    left: '100%',
                                    translateZ: '-150px',
                                    rotateY: '15deg',
                                    perspective: '200px'
                                }}
                                animate={{ 
                                    left: '0%',
                                    translateZ: '0px',
                                    rotateY: '0deg',
                                    perspective: '0px'
                                }}
                                exit={{ 
                                    left: '-100%' ,
                                    translateZ: '150px',
                                    rotateY: '-15deg',
                                    perspective: '-200px'
                                }}
                                transition={{ duration: 1 }}
                                key={'projectONe'}
                            >
                                <div 
                                style={{  position: 'fixed', zIndex: 1001, top: 200, color: 'white'}}
                                onClick={() => {
                                    setNewP(newP + 1)
                                    setProjectOne(!projectOne)
                                    setProjectTwo(!projectTwo)
                                }}>new P</div>
                                <About />
                                <ProjectInfo project={leo.desktopProjects[newP]} />
                                {!imagesLoaded && <ProjectLoader image={leo.desktopProjects[newP].acf.loading_image_landscape.sizes.medium} title={leo.desktopProjects[newP].title.rendered}/>}
                                <Thumbs thumbs={leo.desktopProjects[newP].imageArray} />
                                <ProjectImages images={leo.desktopProjects[newP].imageArray} />
                                <ProjectNav />
                            </motion.div>
                        )}
                        {projectTwo && (
                            <motion.div 
                                className="project-container"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: 'rotateX(1deg)'
                                }}
                                initial={{ 
                                    left: '100%',
                                    translateZ: '-150px',
                                    rotateY: '15deg',
                                    perspective: '200px'
                                }}
                                animate={{ 
                                    left: '0%',
                                    translateZ: '0px',
                                    rotateY: '0deg',
                                    perspective: '200px'
                                }}
                                exit={{ 
                                    left: '-100%',
                                    translateZ: '-150px',
                                    rotateY: '15deg',
                                    perspective: '200px'
                                }}
                                transition={{ duration: 1 }}
                                key={'projectTwo'}
                            >
                                <div 
                                style={{  position: 'fixed', zIndex: 1001, top: 200, color: 'white'}}
                                onClick={() => {
                                    setNewP(newP + 1)
                                    setProjectOne(!projectOne)
                                    setProjectTwo(!projectTwo)
                                }}>new P</div>
                                <About />
                                <ProjectInfo project={leo.desktopProjects[newP + 1]} />
                                {!imagesLoaded && <ProjectLoader image={leo.desktopProjects[newP + 1].acf.loading_image_landscape.sizes.medium} title={leo.desktopProjects[newP + 1].title.rendered}/>}
                                <Thumbs thumbs={leo.desktopProjects[newP + 1].imageArray} />
                                <ProjectImages images={leo.desktopProjects[newP + 1].imageArray} />
                                <ProjectNav />
                            </motion.div>
                        )}
                  
                </AnimatePresence>
            )}
        </>
    )

    // return (
    //     <>
    //         {!projectLoaded ? (
    //             <Loader />
    //         ) : (
    //             <AnimatePresence>
    //                 <motion.div 
    //                     className="project-container"
    //                     inital={{ left: '100%'}}
    //                     animate={{ left: '0%' }}
    //                     exit={{ left: '-100%' }}
    //                     key={leo.currentProject.id}
    //                 >
    //                     <About />
    //                     <ProjectInfo project={leo.currentProject} />
    //                     {!imagesLoaded && <ProjectLoader image={leo.currentProject.acf.loading_image_landscape.sizes.medium} title={leo.currentProject.title.rendered}/>}
    //                     <Thumbs thumbs={leo.currentProject.imageArray} />
    //                     <ProjectImages images={leo.currentProject.imageArray} />
    //                     <ProjectNav />
    //                 </motion.div>
    //             </AnimatePresence>
    //         )}
    //     </>
    // )
}

export default DesktopProject