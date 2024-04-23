import { useState, useEffect } from 'react'
import useTimeout from '@/helpers/useSetTimeout'
import { motion } from 'framer-motion'

import About from "./About"
import Overview from "./Overview"
import Loader from './Loader'

const DesktopOverviews = ({ projects }) => {
    const [showAbout, setShowAbout] = useState(false)

    const [desktopOverviewsCount, setDesktopOverviewsCount] = useState([])
    const [desktopOverviewsLoaded, setDesktopOverviewsLoaded] = useState(false)

    const [random] = useState(Math.random * 1)

    // reset overviews on navigation or reload
    useEffect(() => {
        // console.log("reset desktop overviews")
        setShowAbout(false)
        setDesktopOverviewsCount([])
        setDesktopOverviewsLoaded(false)
    }, [random])

    // check if all videos and images are loaded before revealing
    useEffect(() => {
        if (!desktopOverviewsLoaded) {
            // console.log(desktopOverviewsCount)
            if (desktopOverviewsCount.length === projects.length) {
                setDesktopOverviewsLoaded(true)
                setDesktopOverviewsCount([])
                clearDesktopOverviewsLoading()
                setTimeout(() => {
                    setShowAbout(true)
                }, 500)
            } 
        }
    }, [projects, desktopOverviewsCount, desktopOverviewsLoaded])

    // set a timer if images or videos don't load, cancel if loaded
    const { clear: clearDesktopOverviewsLoading } = useTimeout(() => {
        setDesktopOverviewsLoaded(true)
        setDesktopOverviewsCount([])
        console.log("revealed by timer")
        setTimeout(() => {
            setShowAbout(true)
        }, 500)
    }, 3000)

    return (
        <div className={"overview-container"}>
            {!desktopOverviewsLoaded && <Loader />} 
            {showAbout && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: .5 }}
                >
                    <About />
                </motion.div>
            )}
            <div className={desktopOverviewsLoaded 
                ? "overviews-container overviews-container-desktop overviews-container-visible"
                : "overviews-container overviews-container-desktop"
            }>
                {projects.map((project, i) => {
                        return (<Overview 
                            overview={project.overview} 
                            index={i}
                            id={project.id}
                            title={project.title.rendered}
                            isDesktop={true}
                            setOverviewsCount={setDesktopOverviewsCount}
                            key={project.id}
                        />)
                    })}
            </div>
        </div>
    )
}

export default DesktopOverviews 