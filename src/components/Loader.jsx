import Image from "next/image"
import logoGif from '../../public/images/leo_logo.gif'

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-logo">
                <Image
                    src={logoGif}
                    width={39}
                    height={39}
                    alt="logo"
                    priority
                />
            </div>
            {/* <h1 className="loader-name">Leonhard Laupichler</h1> */}
        </div>
    )
}

export default Loader