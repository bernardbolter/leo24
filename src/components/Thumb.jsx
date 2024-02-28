import { useContext, useEffect } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import Image from "next/image"
import { motion, useAnimationControls } from 'framer-motion'

import { useWindowSize } from "@/helpers/useWindowSize"

const Thumb = ({ thumb, index }) => {
    const [leo, setLeo, handleTimer] = useContext(LeoContext)
    const controls = useAnimationControls()

    useEffect(() => {
        if (index < leo.currentImageIndex) {
            controls.start({
                maskPosition: '0% 0%',
                transition: { duration: 0 }
            })
        }
        if (index > leo.currentImageIndex) {
            controls.start({
                maskPosition: '100% 100%',
                transition: { duration: 0}
            })
        }
        if (index === leo.currentImageIndex) {
            // console.log('thumb same')
            controls.set({
                maskPosition: '100% 100%'
            })
            controls.start({
                maskPosition: '0% 0%',
                transition: { duration: parseInt(thumb.video_length) }
            })
            setLeo(state => ({ ...state, currentImageLength: parseInt(thumb.video_length.concat("000"))}))
        }
        if (leo.timerPaused) {
            controls.stop()
        }

    }, [index, leo.currentImageIndex, leo.timerPaused])

    return (
        <section 
            className={leo.timerPaused ? "project-thumb project-thumb-no-hover" : "project-thumb"}
            onClick={() => {
                // console.log("click thumb")
                // console.log(leo.timerPaused)
                if (!leo.timerPaused) {
                    console.log("in current thumb: ", thumb.video_length)
                    handleTimer(null, false)
                    handleTimer(index, true)
                    setLeo(state => ({ ...state, currentImageIndex: index, restartVideo: true }))
                    setTimeout(() => {
                        setLeo(state => ({ ...state, restartVideo: false }))
                    }, 100)
                }
            }}
        >
            <motion.div
                initial={{ maskPosition: '100% 100%'}}
                animate={controls}
                className="thumb-overlay"
            />
            <Image
                src={thumb.image ? thumb.image.sizes.thumbnail : thumb.thumbnail ? thumb.thumbnail.sizes.thumbnail : 'https://www.tlbx.app/200-300.svg'}
                width={39}
                height={39}
                alt="thumbnail"
            />
        </section>
    )
}

export default Thumb