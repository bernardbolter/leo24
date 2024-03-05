import { useContext, useState, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { AnimatePresence, motion } from "framer-motion"

import Thumb from "./Thumb"

const Thumbs = ({ 
    thumbs, 
    imageIndex,
    setImageIndex,
    clearTimer,
    resetTimer,
    timerPaused,
    setTimerPaused,
    projectLoaded
}) => {
    const [leo] = useContext(LeoContext)
    const [showDisplay, setShowDisplay] = useState('flex')


    useEffect(() => {
        if (leo.infoOpen || leo.aboutOpen) {
            setShowDisplay('none')
        } else {
            setShowDisplay('flex')
        }
    }, [leo.infoOpen, leo.aboutOpen])

    return (
        <div 
            className="thumbs-container"
            style={{
                display: showDisplay
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
                        >
                            <Thumb 
                                thumb={thumb} 
                                imageIndex={imageIndex}
                                setImageIndex={setImageIndex}
                                clearTimer={clearTimer}
                                resetTimer={resetTimer}
                                timerPaused={timerPaused}
                                setTimerPaused={setTimerPaused}
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

export default Thumbs