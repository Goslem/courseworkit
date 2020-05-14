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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useStyles from './style'

import translate from '../../i18n/translate'

const Header = ({ setLocale, locales }) => {
    const classes = useStyles()

    const [englishLanguage, setEnglishLanguage] = React.useState(true)
    const handleLanguage = (event) => {
        setEnglishLanguage(!englishLanguage)
        if (englishLanguage) {
            setLocale(locales.RUSSIAN)
        } else {
            setLocale(locales.ENGLISH)
        }
    }

    const [lightTheme, setLightTheme] = React.useState(true)
    const handleTheme = (event) => {
        setLightTheme(!lightTheme)
    }

    const [profile, setProfile] = React.useState(false)
    const handleProfile = (event) => {
        setProfile(!profile)
    }

    const [mobileMenu, setMobileMenu] = React.useState(false)
    const handleMobileMenu = (event) => {
        setMobileMenu(!mobileMenu)
    }

    const renderMobileMenu = (
        <Menu id='mobile-menu' keepMounted open={mobileMenu} onClose={handleMobileMenu}>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
            <MenuItem>Hello</MenuItem>
        </Menu>
    )

    return (
        <AppBar>
            <Toolbar>
                <Typography className={classes.title} variant='h6' noWrap>
                    <NavLink to='/' className={classes.logoLink}>
                        {translate('companyName')}
                    </NavLink>
                </Typography>

                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        // placeholder={translate('search')}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>

                <div className={classes.grow}></div>

                <div className={classes.sectionDesktop}>
                    <Button
                        color='inherit'
                        size='large'
                        startIcon={<TranslateIcon />}
                        onClick={handleLanguage}
                    >
                        {translate('lang')}
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
                            {translate('login')}
                        </Button>
                    )}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton color='inherit' onClick={handleMobileMenu}>
                        <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>
            {renderMobileMenu}
        </AppBar>
    )
}

export default Header
