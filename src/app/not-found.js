"use client"

import Image from 'next/image'
import Link from 'next/link'

import logoGif from '../../public/images/leo_logo.gif'

const NotFound = () => {
  return (
    <section className="construction-container">
      <div 
        style={{
          margin: 10
        }}
      >
        <Image
          src={logoGif}
          width={39}
          height={39}
        />
      </div>
      <h2
        style={{
          marginLeft: 20,
          marginBottom: 15,
          fontSize: 12,
          color: '#ccc'}}
      >Page Not Found</h2>
      <Link 
        style={{
          marginLeft: 20,
          fontSize: 12,
          color: '#ccc'
        }}
        href="/">Return Home</Link>
    </section>
  )
}

export default NotFound