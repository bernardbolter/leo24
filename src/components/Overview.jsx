import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"

import { useWindowSize } from "@/helpers/useWindowSize"

const Overview = () => {
    const [leo, setLeo] = useContext(LeoContext)
    const size = useWindowSize()

    return (
        <section className="overview-container">
            <h1>Overview</h1>
        </section>
    )
}

export default Overview