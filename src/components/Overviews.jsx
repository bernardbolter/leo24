import { useContext, useEffect, useState, useMemo } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

import About from "./About"
import Overview from './Overview'
import Project from './Project'

const Overviews = () => {
    const [leo] = useContext(LeoContext)
    const { desktopProjects, mobileProjects} = leo
    const size = useWindowSize()
    const [theOverviews, setTheOverviews] = useState([])

    useEffect(() => {
        console.log("using effect")
        var newOverviews = []
        if (size.width > 850) {
            newOverviews = leo.desktopProjects.slice()
            setTheOverviews(newOverviews)
        } else {
            newOverviews = leo.mobileProjects.slice()
            setTheOverviews(newOverviews)
        }
    }, [size.width, leo.mobileProjects, leo.desktopProjects])

    return (
        <section className="overview-container">
            <About />
            {leo.viewProjects ? (
                <Project />
            ) : (
                <div className="posts-container">
                    {theOverviews.map((overview, i) => <Overview post={overview} key={`${overview.screen}-${i}`} />)}
                </div>
            )}
        </section>
    )
}

export default Overviews