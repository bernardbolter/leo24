import { useContext, useMemo, useRef, useEffect } from "react"
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
    { slug: "editor", name: "CGI"},
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
    { slug: "talent", name: "Talent"},
    { slug: "type_design", name: "Typography"},
    { slug: "visuals", name: "Visuals"},
    { slug: "video", name: "Video"},
    { slug: "video_editing", name: "Video Editing"},
    { slug: "webdesign", name: "Web Design"},
]

const ProjectInfo = ({ project }) => {
    // console.log(project)
    const [leo, setLeo] = useContext(LeoContext)
    const { acf } = project
    const titleRef = useRef(null)
    const size = useWindowSize()

    useEffect(() => {
        if (titleRef.current !== null) {
            setLeo(state => ({ ...state, currentTitleWidth: titleRef.current.clientWidth }))
        }
    }, [titleRef])

    const infoLeft = useMemo(() => {
        if (size.width < 850) {
            if (leo.aboutOpen) {
                return -104
            } else {
                return 0
            }
        } else {
            if (leo.aboutOpen) {
                return -126
            } else {
                return 0
            }
        }
    })

    const summary = useMemo(() => {
        return DOMPurify.sanitize(acf.project_summary)
    }, [acf])

    const handle = useMemo(() => {
        return DOMPurify.sanitize(acf.handle)
    }, [acf])

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
                    onClick={() => setLeo( state => ({
                        ...state,
                        infoOpen: true,
                        aboutOpen: state.aboutOpen ? false : false
                    }))}
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
                    </motion.div>
                )}
            </AnimatePresence>          
        </section>
    )
}

export default ProjectInfo