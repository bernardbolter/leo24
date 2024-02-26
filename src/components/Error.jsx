import Image from "next/image"
import logoGif from '../../public/images/leo_logo.gif'

const Error = () => {
    return (
        <div className="error-container">
            <div className="error-logo">
                <Image
                    src={logoGif}
                    width={100}
                    height={100}
                    alt="logo"
                />
            </div>
            <h1 className="error-name">Leonhard Laupichler</h1>

            <div className="error-text">
                <p>There was an error loading the website, please try again later.</p>
            </div>
        </div>
    )
}

export default Error