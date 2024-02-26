import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

const DesktopOverviews = () => {
    const [leo, setLeo] = useContext(LeoContext)
    console.log("desktop o: ",leo)
    
    return (
        <div className="overview-container">
            <h1>Desktop Overviews</h1>
        </div>
    )
}

export default DesktopOverviews