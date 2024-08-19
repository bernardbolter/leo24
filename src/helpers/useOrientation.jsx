"use client"

import { useState, useEffect } from 'react'

export function useOrientation() {
    console.log("useO: ",window.matchMedia('(orientation:landscape)').matches)
    const isLandscape = () => window.matchMedia('(orientation:landscape)').matches,
          [orientation, setOrientation] = useState(isLandscape() ? 'landscape' : 'portrait'),
          onWindowResize = () => {              
            clearTimeout(window.resizeLag)
            window.resizeLag = setTimeout(() => {
              delete window.resizeLag                       
              setOrientation(isLandscape() ? 'landscape' : 'portrait')
            }, 200)
          }

    useEffect(() => (
      onWindowResize(),
      window.addEventListener('resize', onWindowResize),
      () => window.removeEventListener('resize', onWindowResize)
    ),[])

    return orientation
}