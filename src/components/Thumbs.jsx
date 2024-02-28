import { useContext, useState, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"

import Thumb from "./Thumb"

const Thumbs = ({ thumbs }) => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const [thumbsLeft, setThumbsLeft] = useState(0)
    const size = useWindowSize()

    useEffect(() => {
        if (size.width < 850) {
            setThumbsLeft(13)
        } else {
            if (leo.infoOpen) {
                setThumbsLeft(230)
            } else {
                if (leo.infoOpen) {
                    setThumbsLeft(70 + leo.currentTitleWidth)
                } else (
                    setThumbsLeft(192 + leo.currentTitleWidth)
                )
            }
        }
    }, [leo.currentTitleWidth, leo.aboutOpen, leo.infoOpen])

    return (
        <div 
            className="thumbs-container"
            style={{
                left: thumbsLeft,
                display: leo.infoOpen || leo.aboutOpen ? 'none' : 'flex'
            }}    
        >
            {thumbs.map((thumb, i) => (
                <Thumb thumb={thumb} index={i} key={i} />
            ))}
        </div>
    )
}

export default Thumbs