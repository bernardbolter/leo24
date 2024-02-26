import { useContext } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import Image from "next/image"

import { useWindowSize } from "@/helpers/useWindowSize"

const Thumb = ({ thumb, index }) => {
    const [leo, setLeo] = useContext(LeoContext)

    return (
        <section 
            className="project-thumb"
            onClick={() => console.log(index)}
        >
            <div className="thumb-overlay" />
            <Image
                src={thumb.image ? thumb.image.sizes.thumbnail : thumb.thubmnail ? thumb.thumbnail.sizes.thumbnail : 'https://www.tlbx.app/200-300.svg'}
                width={39}
                height={39}
                alt="thumbnail"
            />
        </section>
    )
}

export default Thumb