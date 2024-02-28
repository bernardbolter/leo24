import { useState, useContext, useEffect } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import About from "./About"
import Overview from "./Overview"
import Loader from './Loader'

const DesktopOverviews = ({ projects }) => {
    // console.log(projects)
    const [leo, setLeo] = useContext(LeoContext)
    const [overviewsLoaded, setOverviewsLoaded] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const size = useWindowSize()

    useEffect(() => {
        console.log(leo.loadedOverviews)
        // console.log(projects.length)
        if (projects.length === leo.loadedOverviews) {
            setOverviewsLoaded(true)
            setLeo(state => ({ ...state, loadedOverviews: 0 }))
            setTimeout(() => {
                setShowAbout(true)
            }, 1000)
        }
    }, [leo.loadedOverviews, projects])

    useEffect(() => {

    })

    return (
        <div className="overview-container">
            {!overviewsLoaded && <Loader />} 
            {showAbout && <About />}
            <div className={overviewsLoaded ? "overviews-container overviews-container-visible" : "overviews-container"}>
                {projects.map((project, i) => {
                    // console.log(i, project.overview)
                        return (<Overview 
                            overview={project.overview} 
                            index={i}
                            id={project.id}
                            title={project.title.rendered}
                            key={project.id}
                            isDesktop={true}
                        />)
                    })}
            </div>
        </div>
    )
}

export default DesktopOverviews 