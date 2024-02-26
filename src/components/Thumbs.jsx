import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider" 

const Thumbs = () => {
    const [leo, setLeo] = useContext(LeoContext)

    return (
        <div className="thumbs-container">
            {/* {leo.currentProject.} */}
        </div>
    )
}

export default Thumbs