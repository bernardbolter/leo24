"use client"

import { useContext, useMemo } from "react"
import { LeoContext } from "@/providers/LeoProvider"
import { useRouter } from 'next/navigation'

import DOMPurify from 'dompurify'

import ImprintClose from "@/svg/imprintClose"

const Imprint = () => {
  const [leo] = useContext(LeoContext)
  const router = useRouter()

  const imprint = useMemo(() => {
    console.log("sanitize imprint")
    if (Object.keys(leo.imprint).length !== 0) {
      return DOMPurify.sanitize(leo.imprint.content.rendered)
    }
  }, [leo.imprint])

  return (
    <section className="imprint-container">
      <div className="imprint-background" />
      <div 
        className="imprint-back"
        onClick={() => router.push('/')}
      >
        <ImprintClose />
      </div>
      <div 
        className="imprint-content"
        dangerouslySetInnerHTML={{ __html: imprint }} 
      />
    </section>
  )
}

export default Imprint