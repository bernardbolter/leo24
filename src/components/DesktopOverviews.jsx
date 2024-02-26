import About from "./About"
import Overview from "./Overview"

const DesktopOverviews = ({ projects }) => {

    return (
        <div className="overview-container">
            <About />
            <div className="overviews-container">
                {projects.map(project => (
                    <Overview 
                        overview={project.overview} 
                        id={project.id}
                        title={project.title.rendered}
                        key={project.id}
                        isDesktop={true}
                    />
                ))}
            </div>
        </div>
    )
}

export default DesktopOverviews 