import { useContext, useMemo, useRef, useEffect, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"
import DOMPurify from "dompurify"
import Image from "next/image"

const infos = [
    { slug: "agency", name: "Agency"},
    { slug: "art_direction", name: "Art Direction"},
    { slug: "assistant_art_direction", name: "Assistant Art Direction"},
    { slug: "cgi", name: "CGI"},
    { slug: "client", name: "Client"},
    { slug: "code", name: "Code"},
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
    const [leo, setLeo] = useContext(LeoContext)
    const { acf } = project
    const projectTitleRef = useRef(null)
    const [projectTitleLeft, setProjectTitleLeft] = useState(0)
    const size = useWindowSize()

    useEffect(() => {
        // console.log(projectTitleRef.current.clientWidth)
        setLeo(state => ({ ...state, currentTitleWidth: projectTitleRef.current.clientWidth }))
    }, [projectTitleRef, leo.currentProject])

    const summary = useMemo(() => {
        return DOMPurify.sanitize(acf.project_summary)
    }, [acf])

    const handle = useMemo(() => {
        return DOMPurify.sanitize(acf.handle)
    }, [acf])

    useEffect(() => {
        if ( size.width < 850 ) {
            console.log("title mobile")
            if (leo.aboutOpen) {

                setProjectTitleLeft(50)
            } else {
                setProjectTitleLeft(155)
            }
        } else {
            if (leo.aboutOpen) {
                setProjectTitleLeft(59)
            } else {
                setProjectTitleLeft(183)
            }
        }
    }, [size.width, leo.aboutOpen])

    return (
        <section className="project-info-wrapper">
            {leo.infoOpen ? (
                <div 
                    className="info-close"
                    style={{ left: projectTitleLeft }}
                    onClick={() => setLeo(state => ({
                        ...state,
                        infoOpen: false,
                        timerPaused: false
                    }))}   
                >
                    <Image
                        src={'/images/close.png'}
                        alt="close icon"
                        width={39}
                        height={39}
                    />
                </div>
            ) : (
                <h1 
                    className="project-title"
                    ref={projectTitleRef}
                    style={{ left: projectTitleLeft }}
                    onClick={() => setLeo( state => ({
                        ...state,
                        infoOpen: true,
                        aboutOpen: state.aboutOpen ? false : false,
                        timerPaused: true
                    }))}
                >{project.title.rendered}</h1>
            )}
            <div className={leo.infoOpen ? 'project-info-container' : 'project-info-container project-info-container-hide'}>
                    {acf.project_summary.length !== 0 && (
                        <h1 dangerouslySetInnerHTML={{ __html: summary }}/>
                    )}

                    {infos.map(info => {
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
        </section>
    )
}

export default ProjectInfo