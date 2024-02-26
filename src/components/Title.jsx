import { useState } from 'react'
import Image from 'next/image'
import useSound from 'use-sound'
import Audios from './Audio'

const Title = ({ aboutOpen, setAboutOpen }) => {
   const [audio, setAudio] = useState(Audios[Math.floor(Math.random()*Audios.length)])
   const [play] = useSound(audio)

   const randomAudio = () => {
      setAudio(Audios[Math.floor(Math.random()*Audios.length)])
      play()
   }

   return (
      <>
         {aboutOpen ? (
            <div 
               className="name-close"
               onClick={() => setAboutOpen(false)}   
            >
               <Image
                  src={'/images/close.png'}
                  alt="close icon"
                  width={39}
                  height={39}
               />
            </div>
         ) : (
            <h1 
               className="name-top"
               onClick={() => {
                  setAboutOpen(true)
                  randomAudio()
               }}
            >
               Leonhard Laupichler
            </h1>
         )}
      </>
   )
 }

 export default Title