import React from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate'
import IconButton from '@material-ui/core/IconButton'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import useStyles from './style'

import { FormattedMessage } from 'react-intl'

const Header = ({ locales, setLocale }) => {
    const classes = useStyles()

    const [englishLanguage, setEnglishLanguage] = React.useState(true)
    const handleLanguage = () => {
        setEnglishLanguage(!englishLanguage)

        if (englishLanguage) {
            setLocale(locales.RU)
        } else {
            setLocale(locales.EN)
        }
    }

    const [lightTheme, setLightTheme] = React.useState(true)
    const handleTheme = () => {
        setLightTheme(!lightTheme)
    }

    const [profile, setProfile] = React.useState(false)
    const handleProfile = () => {
        setProfile(!profile)
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography className={classes.title} variant='h6' noWrap>
                    <NavLink to='/' className={classes.logoLink}>
                        <FormattedMessage id='header.companyName' />
                    </NavLink>
                </Typography>

                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <FormattedMessage id='header.search'>
                        {(msg) => (
                            <InputBase
                                placeholder={msg}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <div className={classes.grow}></div>

                <div className={classes.sectionDesktop}>
                    <Button
                        color='inherit'
                        size='large'
                        startIcon={<TranslateIcon />}
                        onClick={handleLanguage}
                    >
                        <FormattedMessage id='header.language' />
                    </Button>
                    <IconButton color='inherit' onClick={handleTheme}>
                        {lightTheme ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                    {profile ? (
                        <IconButton color='inherit' onClick={handleProfile}>
                            <AccountCircle />
                        </IconButton>
                    ) : (
                        <Button color='inherit' onClick={handleProfile}>
                            <FormattedMessage id='header.login' />
                        </Button>
                    )}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton color='inherit'>
                        <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
