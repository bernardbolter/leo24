import { useContext, useState, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"
import { useWindowSize } from '@/helpers/useWindowSize'

import LowPowerThumb from "./LowPowerThumb"

const LowPowerThumbs = ({ 
    thumbs, 
    imageIndex,
    setImageIndex,
    projectLoaded
}) => {
    const [leo] = useContext(LeoContext)
    const [showDisplay, setShowDisplay] = useState('flex')
    const size = useWindowSize()

    useEffect(() => {
        if (leo.infoOpen || leo.aboutOpen) {
            setShowDisplay('none')
        } else {
            setShowDisplay('flex')
        }
    }, [leo.infoOpen, leo.aboutOpen])

    return (
        <div 
            className="thumbs-container low-thumb-container"
            style={{
                display: showDisplay,
                left: size.width < 850 ? 10 : 167 + leo.currentTitleWidth
            }}    
        >
            <AnimatePresence>
                {projectLoaded && (
                    thumbs.map((thumb, i) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.4 } }}
                            transition={{ duration: 1, delay: i * .07 }}
                            key={i}
                            style={{ position: 'relative' }}
                        >
                            <LowPowerThumb 
                                thumb={thumb} 
                                imageIndex={imageIndex}
                                setImageIndex={setImageIndex}
                                index={i} 
                                key={i}
                            />
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    )
}

export default LowPowerThumbs