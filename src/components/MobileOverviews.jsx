import { useContext, useMemo, useCallback } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"

import About from './About'
import Overview from "./Overview"

const MobileOverviews = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()
    console.log("mobile o: ",leo)

    var overviewsMobile = useMemo(() => {
        return leo.mobileProjects.map((overview, i) => (
            <Overview overview={overview} key={i} isDesktop={false} />
        ))
    }, [size, leo.mobileProjects])
    
    return (
        <div className="overview-container">
            <About />
            <div className="overviews-container">
                {overviewsMobile}
            </div>
        </div>
    )
}

export default MobileOverviews