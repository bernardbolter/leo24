import { useState, useContext } from 'react'
import { LeoContext } from '@/providers/LeoProvider' 
import Image from 'next/image'
import useSound from 'use-sound'
import Audios from './Audio'

const Title = ({ aboutOpen, setAboutOpen }) => {
   const [leo, setLeo] = useContext(LeoContext)
   const [audio, setAudio] = useState(Audios[Math.floor(Math.random()*Audios.length)])
   const [play] = useSound(audio)

   const randomAudio = () => {
      setAudio(Audios[Math.floor(Math.random()*Audios.length)])
      play()
   }

   return (
      <>
         {leo.aboutOpen ? (
            <div 
               className="name-close"
               onClick={() => setLeo(state => ({
                  ...state,
                  aboutOpen: false,
               }))}   
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
                  setLeo(state => ({
                     ...state,
                     aboutOpen: true,
                     infoOpen: state.infoOpen ? false : false
                  }))
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