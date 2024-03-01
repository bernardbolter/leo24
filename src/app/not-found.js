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
          width={39}
          height={39}
        />
      </div>
      <h1 className="nav-name">Leonhard Laupichler</h1>
      <h2
        style={{
          marginLeft: 20,
          color: 'white'}}
      >Not Found</h2>
      <p
        style={{ marginLeft: 20, color: 'white' }}
      >Could not find requested resource</p>
      <Link 
        style={{
          marginLeft: 20,
          color: 'white',
          textDecoration: 'none'
        }}
        href="/">Return Home</Link>
    </section>
  )
}

export default NotFound