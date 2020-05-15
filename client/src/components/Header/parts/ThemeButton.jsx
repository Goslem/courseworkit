import React from 'react'
import { useTheme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const ThemeButton = ({ toggleTheme }) => {
    const theme = useTheme()

    return (
        <IconButton color='inherit' onClick={toggleTheme}>
            {theme.palette.type === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
}
export default ThemeButton
