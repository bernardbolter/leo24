import { motion } from "framer-motion"
import Image from "next/image"

const Transition = ({ transitionOn, lastPlaceholder, nextPlaceholder }) => {
    return (
        <>
            <div
                className="transition-last"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: transitionOn ? 1 : 0 }}
                // transition={{ duration: 1 }}
            >
                <Image
                    src={lastPlaceholder}
                    alt="last placeholder"
                    fill
                    priority
                    loading="eager"
                    style={{ objectFit: 'cover'}}
                />
            </div>
            {/* <motion.div
                className="transition-next"
                initial={{ opacity: 1 }}
                animate={{ opacity: transitionOn ? 0 : 1 }}
                transition={{ duration: 1 }}
            >
                <Image
                    src={nextPlaceholder}
                    alt="next placeholder"
                    fill
                    priority
                    loading="eager"
                    style={{ objectFit: 'cover'}}
                />
            </motion.div> */}
        </>
    )
}

export default Transition