// import React from 'react'
// import AppBar from '@material-ui/core/AppBar'
// import Container from '@material-ui/core/Container'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import IconButton from '@material-ui/core/IconButton'
// import AccountCircle from '@material-ui/icons/AccountCircle'
// import Button from '@material-ui/core/Button'
// import useStyles from './style'

// const Header = (props) => {
//     const classes = useStyles()

//     return (
//         <AppBar className={classes.header}>
//             <Container maxWidth='lg'>
//                 <Toolbar>
//                     <Typography variant='h6' className={classes.title}>
//                         Kickstarter
//                     </Typography>
//                     {props.auth ? (
//                         <IconButton className={classes.avatar}>
//                             <AccountCircle />
//                         </IconButton>
//                     ) : (
//                         <Button variant='contained' color='primary' href='/login'>
//                             Login
//                         </Button>
//                     )}
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     )
// }

// export default Header

import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import TranslateIcon from '@material-ui/icons/Translate'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Link from '@material-ui/core/Link'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}))

export default function Header() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const [lang, setLang] = React.useState(true)

    const handleClick = (event) => {
        setLang(!lang)
    }

    const [localTheme, setLocalTheme] = React.useState(true)

    const handleSetTheme = (event) => {
        setLocalTheme(!localTheme)
    }

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label='show 4 new mails' color='inherit'>
                    <Badge badgeContent={4} color='secondary'>
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label='show 11 new notifications' color='inherit'>
                    <Badge badgeContent={11} color='secondary'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.grow}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title} variant='h6' noWrap>
                        Kickstarter
                    </Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search…'
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button
                            variant='contained'
                            color='default'
                            className={classes.button}
                            startIcon={<TranslateIcon />}
                            aria-controls='simple-menu'
                            aria-haspopup='true'
                            onClick={handleClick}
                        >
                            {lang ? 'English' : 'Русский'}
                        </Button>

                        <IconButton color='inherit' onClick={handleSetTheme}>
                            {localTheme ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                        <IconButton
                            edge='end'
                            aria-label='account of current user'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label='show more'
                            aria-controls={mobileMenuId}
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}
                            color='inherit'
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            {renderMobileMenu}
        </div>
    )
}
