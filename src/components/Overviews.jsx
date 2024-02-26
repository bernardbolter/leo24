import { useContext, useEffect, useState, useMemo } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

import About from "./About"
import Overview from './Overview'

const Overviews = () => {
    const [leo] = useContext(LeoContext)
    const { desktopProjects, mobileProjects} = leo
    const size = useWindowSize()
    const [theOverviews, setTheOverviews] = useState([])
    const [viewProjects, setViewProjects] = useState(false)

    // console.log(leo)

    // const theOverviews = useMemo(() => {
    //     console.log(size)
    //     if (size.width > 850) {
    //         return desktopProjects.map((post, i) => {
    //             return <Overview post={post} key={`${post.acf.desktop_order}-desktop-${i}`} />
    //         })
    //     } else {
    //         return mobileProjects.map((post, i) => {
    //             return <Overview post={post} key={`${post.acf.mobile_order}-mobile-${i}`} />
    //         })
    //      } 
    // }, [size.width, mobileProjects, desktopProjects])

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
            {viewProjects ? (
                <Projects />
            ) : (
                <div className="posts-container">
                    {theOverviews.map((overview, i) => <Overview post={overview} key={`${overview.screen}-${i}`} />)}
                </div>
            )}
        </section>
    )
}

export default Overviews