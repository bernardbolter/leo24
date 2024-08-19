import { useContext, useState, useMemo, useRef, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"
import { useWindowSize } from "@/helpers/useWindowSize"
import DOMPurify from "dompurify"
import Close from '@/svg/close'

const infos = [
    { slug: "agency", name: "Agency"},
    { slug: "art_direction", name: "Art Direction"},
    { slug: "assistant_art_direction", name: "Assistant Art Direction"},
    { slug: "cgi", name: "CGI"},
    { slug: "client", name: "Client"},
    { slug: "code", name: "Code"},
    { slug: "chief_creative_officer", name: " Chief Creative Officer" },
    { slug: "concept_research_and_strategy", name: "Concept, Research, and Strategy"},
    { slug: "content_direction", name: "Content Direction"},
    { slug: "creative_direction", name: "Creative Direction"},
    { slug: "curation", name: "Curation"},
    { slug: "design", name: "Design"},
    { slug: "design_director", name: "Design Direction"},
    { slug: "director", name: "Director"},
    { slug: "editor", name: "Editor"},
    { slug: "editors", name: "Editors"},
    { slug: "editorial_design", name: "Editorial Design"},
    { slug: "exhibition_design", name: "Exhibition Design"},
    { slug: "fashion_editor", name: "Fashion Editor"},
    { slug: "graphic_design", name: "Graphic Design"},
    { slug: "hair_stylist", name: "Hair Stylist"},
    { slug: "illustration", name: "Illustration"},
    { slug: "jersey_design", name: "Jersey Design"},
    { slug: "logo_design", name: "Logo Design"},
    { slug: "makeup_artist", name: "Makeup Artist"},
    { slug: "model", name: "Model"},
    { slug: "motion_design", name: "Motion Design"},
    { slug: "packaging", name: "Packaging"},
    { slug: "photography", name: "Photography"},
    { slug: "production", name: "Production"},
    { slug: "project_engineering", name: "Project Engineering"},
    { slug: "publisher", name: "Publisher"},
    { slug: "set_design", name: "Set Design"},
    { slug: "shoe_design", name: "Shoe Design"},
    { slug: "stylist", name: "Stylist"},
    { slug: "styling", name: "Styling"},
    { slug: "talent", name: "Talent"},
    { slug: "type_design", name: "Typography"},
    { slug: "visuals", name: "Visuals"},
    { slug: "video", name: "Video"},
    { slug: "video_editing", name: "Video Editing"},
    { slug: "webdesign", name: "Web Design"},
]

const ProjectInfo = ({ project }) => {
    const [leo, setLeo] = useContext(LeoContext)
    const { acf } = project
    const titleRef = useRef(null)
    const infoRef = useRef(null)
    const size = useWindowSize()
    const [infoScrollDone, setInfoScrollDone] = useState(false)

    useEffect(() => {
        if (titleRef.current !== null) {
            setLeo(state => ({ ...state, currentTitleWidth: titleRef.current.clientWidth }))
        }
    }, [titleRef])

    useEffect(() => {
        if (infoRef.current) {
            console.log("client: ", infoRef.current.clientHeight)
            console.log("window6: ", (size.height * .6))
            if (infoRef.current.clientHeight < 400) {
                setInfoScrollDone(true)
            } else {
                setInfoScrollDone(false)
            }
        }
    }, [infoRef.current, size.height])

    // useEffect(() => {
    //     if (infoRef.current) {
    //         console.log("cli height: " , infoRef.current.clientHeight, size.height * .6)
    //         console.log("donw 1: ", infoScrollDone)
    //         if (infoRef.current.clientHeight < size.height * .6) {
    //             setInfoScrollDone(true)
    //         }
    //         // if (size.width > 850) {
    //         //     console.log("height start: ", infoRef.current.clientHeight)
    //         //     if (infoRef.current.clientHeight < size.height * .6) {
    //         //         setInfoScrollDone(true)
    //         //     }
    //         // } else {
    //         //     console.log("height start: ", infoRef.current.clientHeight)
    //         //     if (infoRef.current.clientHeight < size.height * .6) {
    //         //         setInfoScrollDone(true)
    //         //     }
    //         // }
    //     }
    //     console.log("donw 2: ", infoScrollDone)
    // }, [infoRef, size, leo.infoOpen])

    const infoLeft = useMemo(() => {
        if (size.width < 850) {
            if (leo.aboutOpen) {
                return -104
            } else {
                return 0
            }
        } else {
            if (leo.aboutOpen) {
                return -108
            } else {
                return 0
            }
        }
    })

    // const infoHeight = useMemo(() => {
    //     if (size.width < 850) {
    //         return '60vh'
    //     } else {
    //         return infoRef.current.clientHeight
    //     }
    // }, [infoRef])

    const summary = useMemo(() => {
        return DOMPurify.sanitize(acf.project_summary)
    }, [acf])

    const handle = useMemo(() => {
        return DOMPurify.sanitize(acf.handle)
    }, [acf])

    const handleScroll = () => {
        if (infoRef.current) {
            console.log(infoRef.current.scrollHeight, infoRef.current.clientHeight, infoRef.current.scrollTop)
            console.log('total: ', (infoRef.current.scrollHeight - infoRef.current.clientHeight) === infoRef.current.scrollTop)
            if ((infoRef.current.scrollHeight - infoRef.current.clientHeight) === infoRef.current.scrollTop) {
                setInfoScrollDone(true)
            } else {
                setInfoScrollDone(false)
            }
        }
    }

    return (
        <section className="project-info">
            {leo.infoOpen ? (
                <div 
                    className="info-close"
                    onClick={() => setLeo(state => ({
                        ...state,
                        infoOpen: false
                    }))}   
                >
                    <Close />
                </div>
            ) : (
                <motion.h1
                    ref={titleRef}
                    initial={{ translateX: 0}}
                    animate={{ translateX: infoLeft}}
                    transition={{ duration: .1, ease: "linear" }}
                    whileHover={{
                        scale: 1.05,
                      }}
                    className="project-title"
                    onClick={() => {
                            setLeo( state => ({
                            ...state,
                            infoOpen: true,
                            aboutOpen: state.aboutOpen ? false : false
                        }))}
                    }
                >{project.title.rendered}</motion.h1>
            )}

            <AnimatePresence>
                {leo.infoOpen && (
                    <motion.div 
                        className="project-info-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .7 }}
                        key="project-info-container"
                        // style={{ maxHeight : infoHeight }}
                    >

                        <div 
                            className={infoScrollDone ? "project-info-fade" : "project-info-fade project-info-fade-mask"}
                            ref={infoRef}
                            onScroll={handleScroll}
                            // style={{ maxHeight : infoHeight }}
                        >
                            {acf.project_summary.length !== 0 && (
                                <h1 dangerouslySetInnerHTML={{ __html: summary }}/>
                            )}

                            {infos.map(info => {
                                // console.log(info)
                                return acf[info.slug].length !== 0 && (
                                    <div key={info.slug}>
                                        <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(acf[info.slug])}} />
                                        <p>{info.name}</p>
                                    </div>
                                )
                            })}

                            {acf.handle.length !== 0 && (
                                <h2 dangerouslySetInnerHTML={{ __html: handle}} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>          
        </section>
    )
}

export default ProjectInfo