import { useContext, useState, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"

import Thumb from "./Thumb"

const Thumbs = ({ thumbs }) => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [thumbsLeft, setThumbsLeft] = useState(0)
    const size = useWindowSize()
    const [showDisplay, setShowDisplay] = useState('flex')
    console.log("tp: ",leo.timerPaused)

    useEffect(() => {
        if (size.width < 850) {
            setThumbsLeft(13)
        } else {
            if (leo.infoOpen) {
                setThumbsLeft(230)
            } else if (leo.aboutOpen) {
                setThumbsLeft(70 + leo.currentTitleWidth)
            } else {
                setThumbsLeft(192 + leo.currentTitleWidth)
            }
        }
    }, [leo.currentTitleWidth, leo.aboutOpen, leo.infoOpen])

    useEffect(() => {
        if (size.width < 850) {
            if (leo.infoOpen || leo.aboutOpen) {
                setShowDisplay('none')
            } else {
                setShowDisplay('flex')
            }
        } else {
            setShowDisplay('flex')
        }
    }, [leo.infoOpen, leo.aboutOpen])

    return (
        <div 
            className="thumbs-container"
            style={{
                left: thumbsLeft,
                display: showDisplay
            }}    
        >
            {thumbs.map((thumb, i) => (
                <Thumb thumb={thumb} index={i} key={i} />
            ))}
        </div>
    )
}

export default Thumbs