import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider" 

import Thumb from "./Thumb"

const Thumbs = ({ thumbs }) => {
    const [leo, setLeo] = useContext(LeoContext)
    console.log(leo.currentTitleWidth)

    return (
        <div 
            className="thumbs-container"
            style={{
                left: leo.infoOpen ? 230 : leo.aboutOpen ? 70 + leo.currentTitleWidth : 192 + leo.currentTitleWidth
            }}    
        >
            {thumbs.map((thumb, i) => (
                <Thumb thumb={thumb} index={i} key={i} />
            ))}
        </div>
    )
}

export default Thumbs