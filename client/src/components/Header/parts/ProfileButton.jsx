import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../../i18n/translate'
import { connect } from 'react-redux'
import { logout } from '../../../redux/authReducer'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const ProfileButton = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        props.logout()
        handleClose()
    }

    return (
        <>
            {props.isAuth ? (
                <IconButton color='inherit' onClick={handleClick}>
                    <AccountCircle />
                </IconButton>
            ) : (
                <Button color='inherit' size='large' component={RouterLink} to='/login'>
                    {translate('header.signIn')}
                </Button>
            )}

            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={RouterLink} to='/profile' onClick={handleClose}>
                    {translate('header.profile')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>{translate('header.logout')}</MenuItem>
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { logout })(ProfileButton)
