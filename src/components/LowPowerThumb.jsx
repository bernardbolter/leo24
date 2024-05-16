import Image from "next/image"

const LowPowerThumb = ({ 
    thumb, 
    imageIndex,
    setImageIndex,
    index,
}) => {
    return (
        <section 
            className="project-thumb project-thumb-low"
            onClick={() => {
                console.log("click thumb")
                setImageIndex(index)
            }}
        >
            <div
                style={{ maskPosition: index <= imageIndex ? '0% 0%' : '100% 100%'}}
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

export default LowPowerThumb