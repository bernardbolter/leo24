import { useContext, useState, useMemo } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import DOMPurify from 'dompurify'
import Clock from 'react-live-clock'

import { useWindowSize } from "@/helpers/useWindowSize"

import Title from "./Title"

const About = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()
    const [aboutOpen, setAboutOpen] = useState(false)

    const description = useMemo(() => {
        return DOMPurify.sanitize(leo.about.description)
    }, [leo.about])

    const services = useMemo(() => {
        return DOMPurify.sanitize(leo.about.services)
    }, [leo.about])

    const clients = useMemo(() => {
        return DOMPurify.sanitize(leo.about.clients)
    })


    return (
        <section className="about-outter">
            <Title aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
            <div className={aboutOpen ? "about-container" : "about-container about-no-show"}>
                <h2 dangerouslySetInnerHTML={{__html: description}}/>
                <p>About</p>
                <div className="services-container">
                    <p dangerouslySetInnerHTML={{ __html: services }} />
                </div>
                <p>Services</p>
                <h2 className="clock-container"><Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Berlin'} /> CET</h2>
                <p>Current Time</p>
                <a className="about-email" href="mailto:contact@leonhardlaupichler.com">Contact[at]leonhardlaupichler.com</a>
                <p>Email</p>
                <div className="clients-container">
                    <p dangerouslySetInnerHTML={{ __html: clients }} />
                </div>
                <p>Selected Clients</p>
                <a className="imprint" href="/imprint">Imprint</a>
            </div>
        </section>
    )
}

export default About