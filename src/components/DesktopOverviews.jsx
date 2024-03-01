import { useState, useContext, useEffect } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { usePathname } from 'next/navigation'

import About from "./About"
import Overview from "./Overview"
import Loader from './Loader'

const DesktopOverviews = ({ projects }) => {
    const [leo, setLeo] = useContext(LeoContext)
    const [showAbout, setShowAbout] = useState(false)
    const [loadCheck, setLoadCheck] = useState(false)
    const [overviewsCount, setOverviewsCount] = useState([])

    useEffect(() => {
        setLeo(state => ({ ...state, overviewsLoaded: false }))
        setLoadCheck(false)
    }, [])

    useEffect(() => {
        if (!leo.overviewsLoaded) {
            if (overviewsCount.length === projects.length) {
                setLeo(state => ({ ...state, overviewsLoaded: true }))
                setOverviewsCount([])
                setTimeout(() => {
                    setShowAbout(true)
                }, 750)
            } else {
                if (!loadCheck) {
                    setTimeout(() => {
                        if (!leo.overviewsLoaded) {
                            setLeo(state => ({ ...state, overviewsLoaded: true }))
                            setOverviewsCount([])
                            setTimeout(() => {
                                setShowAbout(true)
                            }, 750)
                        }
                    }, 3000)
                }
                setLoadCheck(true)
            }
        }
    }, [projects, overviewsCount, leo.overviewsLoaded])

    return (
        <div className="overview-container">
            {!leo.overviewsLoaded && <Loader />} 
            {showAbout && <About />}
            <div className={leo.overviewsLoaded ? "overviews-container overviews-container-visible" : "overviews-container"}>
                {projects.map((project, i) => {
                        return (<Overview 
                            overview={project.overview} 
                            index={i}
                            id={project.id}
                            title={project.title.rendered}
                            isDesktop={true}
                            setOverviewsCount={setOverviewsCount}
                            key={project.id}
                        />)
                    })}
            </div>
        </div>
    )
}

export default DesktopOverviews 