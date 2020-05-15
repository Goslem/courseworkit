import React, { useState } from 'react'

export const [theme, setTheme] = useState({
    palette: {
        type: 'light',
    },
})

export const toggleTheme = () => {
    let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light'
    setTheme({
        palette: {
            type: newPaletteType,
        },
    })
}