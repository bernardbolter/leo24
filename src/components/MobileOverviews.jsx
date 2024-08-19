import { useState, useEffect } from 'react'
import useTimeout from '@/helpers/useSetTimeout'
import { motion } from 'framer-motion'

import About from './About'
import Overview from "./Overview"
import Loader from './Loader'

const MobileOverviews = ({ projects }) => {
    const [showAbout, setShowAbout] = useState(false)

    const [mobileOverviewsCount, setMobileOverviewsCount] = useState([])
    const [mobileOverviewsLoaded, setMobileOverviewsLoaded] = useState(false)

    const [random] = useState(Math.random * 1)

    // reset overviews on navigation or reload
    useEffect(() => {
        console.log("reset mobile overviews")
        setShowAbout(false)
        setMobileOverviewsCount([])
        setMobileOverviewsLoaded(false)
    }, [random])

    // check if all videos and images are loaded before revealing
    useEffect(() => {
        if (!mobileOverviewsLoaded) {
            if (mobileOverviewsCount.length === projects.length) {
                setMobileOverviewsLoaded(true)
                setMobileOverviewsCount([])
                clearMobileOverviewsLoading()
                setTimeout(() => {
                    setShowAbout(true)
                }, 500)
            }
        }
    }, [projects, mobileOverviewsCount, mobileOverviewsLoaded])

    // set a timer if images or videos don't load, cancel if loaded
    const { clear: clearMobileOverviewsLoading } = useTimeout(() => {
        setMobileOverviewsLoaded(true)
        setMobileOverviewsCount([])
        console.log("revealed by timer")
        setTimeout(() => {
            setShowAbout(true)
        }, 500)
    }, 1000)

    return (
        <div 
            className="overview-container"
            style={{ position: mobileOverviewsLoaded ? 'relative' : 'fixed' }}
        >
            {!mobileOverviewsLoaded && <Loader />}
            {showAbout && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: .5 }}
                >
                    <About />
                </motion.div>
            )}
            <div className={mobileOverviewsLoaded ? "overviews-container overviews-container-mobile overviews-container-visible" : "overviews-container overviews-container-mobile"}>
                    {projects.map((project,i) => (
                        <Overview
                            overview={project.overview}
                            index={i}
                            id={project.id}
                            title={project.title.rendered}
                            isDesktop={false}
                            setOverviewsCount={setMobileOverviewsCount}
                            key={project.id}
                        />
                    ))}
                </div>
        </div>
    )
}

export default MobileOverviews