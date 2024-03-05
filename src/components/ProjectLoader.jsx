import Image from "next/image"

const ProjectLoader = ({ image, title }) => {
    return (
        <div className="project-loader-container">
            <Image
                src={image}
                alt={`loading ${title} project`}
                fill
                priority={true}
                style={{ objectFit: 'cover'}}
            />
        </div>
    )
}

export default ProjectLoader