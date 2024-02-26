import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

const DesktopProjects = () => {
    const [leo, setLeo] = useContext(LeoContext)
    console.log("desktop p: ",leo)
    
    return (
        <div className="projects-container">
            <h1>Desktop Projects</h1>
        </div>
    )
}

export default DesktopProjects