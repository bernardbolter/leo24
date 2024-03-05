import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimationControls } from 'framer-motion'

const Thumb = ({ 
    thumb, 
    imageIndex,
    setImageIndex,
    clearTimer,
    resetTimer,
    timerPaused,
    setTimerPaused,
    index,
}) => {
    const controls = useAnimationControls()
    const [resetSameIndex, setResetSameIndex] = useState(false)

    useEffect(() => {
        // console.log("reset thumb")
        if (timerPaused) {
            // console.log("reset thumb timer paused")
            controls.stop()
        } else {
            // console.log("reset thumb timer not paused")
            if (index < imageIndex) {
                controls.start({
                    maskPosition: '0% 0%',
                    webkitMaskPosition: '0% 0%',
                    transition: { duration: 0 }
                })
            }
            if (index > imageIndex) {
                controls.start({
                    maskPosition: '100% 100%',
                    webkitMaskPosition: '100% 100%',
                    transition: { duration: 0 }
                })
            }
            if (index === imageIndex || resetSameIndex) {
                // console.log('thumb start overlay')
                controls.set({
                    maskPosition: '100% 100%',
                    webkitMaskPosition: '100% 100%'
                })
                controls.start({
                    maskPosition: '0% 0%',
                    webkitMaskPosition: '0% 0%',
                    transition: { duration: parseInt(thumb.video_length) }
                })
            }
        }
    }, [index, imageIndex, timerPaused, resetSameIndex])

    return (
        <section 
            className={timerPaused ? "project-thumb project-thumb-no-hover" : "project-thumb"}
            onClick={() => {
                // console.log("click thumb")
                // console.log(timerPaused)
                // console.log(imageIndex)
                if (!timerPaused) {
                    // console.log("in current thumb: ", imageIndex)
                    if (index === imageIndex) {
                        // console.log("same same")
                        setResetSameIndex(true)
                        clearTimer()
                        setTimerPaused(true)
                        setTimeout(() => {
                            setResetSameIndex(false)
                            setTimerPaused(false)
                            resetTimer()
                        }, 1)
                    }
                    clearTimer()
                    setImageIndex(index)
                    setTimerPaused(true)
                    setTimeout(() => {
                        setTimerPaused(false)
                        resetTimer()
                    }, 1)
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