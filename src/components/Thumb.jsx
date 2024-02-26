import { useContext, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import Image from "next/image"
import { motion, useAnimationControls } from 'framer-motion'

import { useWindowSize } from "@/helpers/useWindowSize"

const Thumb = ({ thumb, index }) => {
    const [leo, setLeo] = useContext(LeoContext)
    const controls = useAnimationControls()

    useEffect(() => {
        if (index < leo.currentImageIndex) {
            console.log('less: ', index)
            controls.start({
                maskPosition: '0% 0%',
                transition: { duration: 0 }
            })
            // controls.set({
            //     maskPosition: '0% 0% !important'
            // })
        }
        if (index > leo.currentImageIndex) {
            console.log("more: ", index)
            controls.start({
                maskPosition: '100% 100%',
                transition: { duration: 0}
            })
        }
        if (index === leo.currentImageIndex) {
            controls.set({
                maskPosition: '100% 100%'
            })
            controls.start({
                maskPosition: '0% 0%',
                transition: { duration: parseInt(thumb.video_length) }
            })
        }
        if (leo.aboutOpen || leo.infoOpen) {
            controls.stop()
        }

    }, [index, leo.currentImageIndex, leo.aboutOpen, leo.infoOpen])

    return (
        <section 
            className="project-thumb"
            onClick={() => {
                console.log(index)
                setLeo(state => ({ ...state, currentImageIndex: index }))
            }}
        >
            <motion.div
                initial={{ maskPosition: '100% 100%'}}
                animate={controls}
                // onAnimationComplete={() => {
                //     console.log("ani complete: ", index)
                //     setLeo(state => ({ ...state, currentImageIndex: index + 1}))
                // }}
                className="thumb-overlay"
                // className={index < leo.currentImageIndex ? 'thumb-overlay thumb-overlay-on' : 'thumb-overlay'} 
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