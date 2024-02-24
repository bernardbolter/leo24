"use client"

import Image from 'next/image'

// import logoVid from '../../public/images/leo_logo.mp4'
import logoGif from '../../public/images/leo_logo.gif'


const Home = () => {
  return (
    <section className="construction-container">
      <div className="nav-logo">
        <Image
          src={logoGif}
          width={100}
          height={100}
        />
      </div>
      <h1 className="nav-name">Leonhard Laupichler</h1>
    </section>
  )
}

export default Home