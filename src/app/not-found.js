"use client"

import Image from 'next/image'
import Link from 'next/link'

import logoGif from '../../public/images/leo_logo.gif'

const NotFound = () => {
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
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </section>
  )
}

export default NotFound