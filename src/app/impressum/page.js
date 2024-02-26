"use client"

import Image from 'next/image'

import logoGif from '../../../public/images/leo_logo.gif'

const Impressum = () => {
  return (
    <section className="construction-container">
      <div className="nav-logo">
        <Image
          src={logoGif}
          width={100}
          height={100}
        />
      </div>
      <h1 className="nav-name">Leonhard Laupichler Impressum</h1>
    </section>
  )
}

export default Impressum