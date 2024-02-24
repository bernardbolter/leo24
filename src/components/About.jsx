import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

const About = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <section className="about-container">
            <h1>About</h1>
        </section>
    )
}

export default About