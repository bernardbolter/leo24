"use client"

import { useContext, useState, useEffect } from 'react'
import { LeoContext } from '@/providers/LeoProvider'
import { getAllData } from '@/wp/wpGraphql'

const Home = () => {
    const [leo, setLeo] = useContext(LeoContext)
    console.log(leo)

    useEffect(() => {
        getAllData()
    }, [])

    return (
        <div className="home-container">
            <h1>Leo Home</h1>
        </div>
    )
}

export default Home