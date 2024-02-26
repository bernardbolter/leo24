import { useContext, useMemo } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useWindowSize } from "@/helpers/useWindowSize"

import About from "./About"
import Overview from "./Overview"

const DesktopOverviews = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()
    console.log("desktop o: ",leo.desktopProjects)

    const overviewsDesktop = useMemo(() => {
        return leo.desktopProjects.map((overview, i) => (
            <Overview overview={overview} key={`desktop-${i}`} isDesktop={true} />
        ))
    }, [size, leo.desktopProjects])
    
    return (
        <div className="overview-container">
            <About />
            <div className="overviews-container">
                {overviewsDesktop}
            </div>
        </div>
    )
}

export default DesktopOverviews 