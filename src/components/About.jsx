import { useContext, useMemo, useRef, useState } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"

import DOMPurify from 'dompurify'
import Clock from 'react-live-clock'

import { usePathname } from "next/navigation"

import Title from "./Title"

const About = () => {
    const [leo] = useContext(LeoContext)
    const pathname = usePathname()
    const aboutRef = useRef(null)
    const [aboutScrollDone, setAboutScrollDone] = useState(false)

    const description = useMemo(() => {
        return DOMPurify.sanitize(leo.about.description)
    }, [leo.about])

    const services = useMemo(() => {
        return DOMPurify.sanitize(leo.about.services)
    }, [leo.about])

    const clients = useMemo(() => {
        return DOMPurify.sanitize(leo.about.clients)
    })

    const handleAboutScroll = () => {
        if (aboutRef.current) {
            if ((aboutRef.current.scrollHeight - aboutRef.current.clientHeight) === aboutRef.current.scrollTop) {
                setAboutScrollDone(true)
            } else {
                setAboutScrollDone(false)
            }
        }
    }

    return (
        <section className={pathname === "/projects" ? "about-outter-projects" : "about-outter"}>
            <Title />
            <AnimatePresence>
                {leo.aboutOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{  opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .7 }}
                        className="about-container"
                        key="about-container"
                    >
                        <div
                            className={aboutScrollDone ? "about-info-fade" : "about-info-fade about-info-fade-mask"}
                            ref={aboutRef}
                            onScroll={handleAboutScroll}
                        >
                            <h2 dangerouslySetInnerHTML={{__html: description}}/>
                            <p>About</p>
                            <a className="about-email" href="mailto:contact@leonhardlaupichler.com">Contact[at]leonhardlaupichler.com</a>
                            <p className="about-email-title">Email</p>
                            <h2 className="clock-container"><Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Berlin'} /> CET</h2>
                            <p>Current Time</p>
                            <div className="services-container">
                                <p dangerouslySetInnerHTML={{ __html: services }} />
                            </div>
                            <p>Services</p>
                            <div className="clients-container">
                                <p dangerouslySetInnerHTML={{ __html: clients }} />
                            </div>
                            <p>Selected Clients and Collaborators</p>
                            <a className="imprint" href="/imprint">Imprint</a>
                        </div>
                </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default About