import React, { useState } from 'react'
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
import { FormattedMessage } from 'react-intl'
import { locales } from '../../i18n'
import useStyles from './style'

const Header = ({ locale, setLocale }) => {
    const classes = useStyles()

    const handleLanguage = () => {
        locale === locales.EN ? setLocale(locales.RU) : setLocale(locales.EN)
    }

    const [lightTheme, setLightTheme] = useState(true)
    const handleTheme = () => {
        setLightTheme(!lightTheme)
    }

    const [profile, setProfile] = useState(false)
    const handleProfile = () => {
        setProfile(!profile)
    }

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
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
                            />
                        )}
                    </FormattedMessage>
                </div>

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
            </Toolbar>
        </AppBar>
    )
}

export default Header
