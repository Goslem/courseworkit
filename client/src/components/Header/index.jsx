import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CompanyName from './parts/CompanyName'
import Search from './parts/Search'
import LanguageButton from './parts/LanguageButton'
import ThemeButton from './parts/ThemeButton'
import ProfileButton from './parts/ProfileButton'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        minHeight: 64,
        flexWrap: 'wrap',
        color: theme.palette.default.contrastText,
        backgroundColor: theme.palette.default.main,
        [theme.breakpoints.down('sm')]: {
            minHeight: 128,
        },
    },
    sectionDesktop: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}))

const Header = ({ toggleTheme, toggleLocale }) => {
    const classes = useStyles()

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <CompanyName />
                <Search />

                <div className={classes.sectionDesktop}>
                    <LanguageButton toggleLocale={toggleLocale} />
                    <ThemeButton toggleTheme={toggleTheme} />
                    <ProfileButton login={false} />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
