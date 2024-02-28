import { useState, useContext, useEffect } from 'react'
import { LeoContext } from '@/providers/LeoProvider'

import { useWindowSize } from '@/helpers/useWindowSize'

import About from './About'
import Overview from "./Overview"
import Loader from './Loader'

const MobileOverviews = ({ projects }) => {
    const [leo, setLeo] = useContext(LeoContext)
    const [overviewsLoaded, setOverviewsLoaded] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const [loadCheck, setLoadCheck] = useState(false)
    const size = useWindowSize()

    // console.log(projects)

    useEffect(() => {
        console.log(leo.loadedOverviews)
        // console.log(projects.length)
        if (projects.length === leo.loadedOverviews) {
            console.log("in if")
            setOverviewsLoaded(true)
            setLeo(state => ({ ...state, loadedOverviews: 0 }))
            setTimeout(() => {
                console.log("show about")
                setShowAbout(true)
            }, 500)
        }
        if (!loadCheck) {
            setLoadCheck(true)
            setTimeout(() => {
                setOverviewsLoaded(true)
                setLeo(state => ({ ...state, loadedOverviews: 0 }))
                setTimeout(() => {
                    console.log("show about")
                    setShowAbout(true)
                }, 500)
            }, 2500)
        }
    }, [leo.loadedOverviews, projects])

    return (
        <div className="overview-container">
            {!overviewsLoaded && <Loader />}
            {showAbout && <About />}
            <div className={overviewsLoaded ? "overviews-container overviews-container-visible" : "overviews-container"}>
                    {projects.map((project,i) => (
                        <Overview
                            overview={project.overview}
                            index={i}
                            id={project.id}
                            title={project.title.rendered}
                            key={project.id}
                            isDesktop={false}
                        />
                    ))}
                </div>
        </div>
    )
}

export default MobileOverviews