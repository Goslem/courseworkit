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
    AppBar: {
        backgroundColor: theme.palette.type === 'dark' ? '#2E2F32' : '#1976D2',
    },
    toolbar: {
        flexWrap: 'wrap',
        minHeight: 128,
        [theme.breakpoints.up('md')]: {
            minHeight: 64,
        },
    },
    sectionDesktop: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        [theme.breakpoints.up('md')]: {
            width: 'auto',
        },
    },
}))

const Header = ({ toggleTheme, toggleLocale }) => {
    const classes = useStyles()

    return (
        <AppBar className={classes.AppBar}>
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
