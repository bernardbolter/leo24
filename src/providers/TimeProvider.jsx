import React, { useState, createContext, useEffect } from 'react'

export const TimeContext = createContext()

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState({})
    
}