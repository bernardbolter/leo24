"use client"

import Image from 'next/image'

import logoGif from '../../../public/images/leo_logo.gif'

const Impressum = () => {
  return (
    <section className="construction-container">
      <div className="nav-logo">
        <Image
          src={logoGif}
          width={39}
          height={39}
        />
      </div>
      <div class="imp-content">
        
      </div>
    </section>
  )
}

export default Impressum