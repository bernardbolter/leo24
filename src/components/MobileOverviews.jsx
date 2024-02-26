import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

const MobileOverviews = () => {
    const [leo, setLeo] = useContext(LeoContext)
    console.log("mobile o: ",leo)
    
    return (
        <div className="overview-container">
            <h1>Mobile Overviews</h1>
        </div>
    )
}

export default MobileOverviews