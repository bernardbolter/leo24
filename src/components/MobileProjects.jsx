import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

const MobileProjects = () => {
    const [leo, setLeo] = useContext(LeoContext)
    console.log("mobile p: ",leo)
    
    return (
        <div className="projects-container">
            <h1>Mobile Projects</h1>
        </div>
    )
}

export default MobileProjects