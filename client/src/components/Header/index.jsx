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
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        color: theme.palette.default.contrastText,
        backgroundColor: theme.palette.default.main,
    },
    sectionMain: {
        flexGrow: 1,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
        },
    },
    sectionToolbar: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
        },
    },
}))

const Header = () => {
    const classes = useStyles()

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <div className={classes.sectionMain}>
                    <CompanyName />
                    <Search />
                </div>

                <div className={classes.sectionToolbar}>
                    <LanguageButton />
                    <ThemeButton />
                    <ProfileButton />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
