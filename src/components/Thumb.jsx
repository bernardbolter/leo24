import { useContext, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import Image from "next/image"
import { motion, useAnimationControls } from 'framer-motion'

import { useWindowSize } from "@/helpers/useWindowSize"

const Thumb = ({ thumb, index }) => {
    const [leo, setLeo] = useContext(LeoContext)
    const controls = useAnimationControls()

    useEffect(() => {
        if (index === leo.currentImageIndex) {
            controls.start({
                maskPosition: '0% 0%',
                transition: { duration: parseInt(thumb.video_length) }
            })
        }
        if (leo.aboutOpen || leo.infoOpen) {
            controls.stop()
        }

    }, [leo.currentImageIndex, leo.aboutOpen, leo.infoOpen])

    return (
        <section 
            className="project-thumb"
            onClick={() => {
                setLeo(state => ({ ...state, currentImageIndex: index }))
            }}
        >
            <motion.div
                animate={controls}
                className="thumb-overlay" 
            />
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