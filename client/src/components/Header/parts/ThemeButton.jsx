import React from 'react'
import { connect } from 'react-redux'
import { toggleTheme } from '../../../redux/themeReducer'
import IconButton from '@material-ui/core/IconButton'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const ThemeButton = (props) => {
    const onThemeChanged = () => {
        props.toggleTheme(props.theme.title)
    }

    return (
        <IconButton color='inherit' onClick={onThemeChanged}>
            {props.theme.title === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
    )
}

let mapStateToProps = (state) => ({
    theme: state.theme,
})

export default connect(mapStateToProps, { toggleTheme })(ThemeButton)
