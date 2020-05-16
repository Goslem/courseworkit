import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../../i18n/translate'

const ProfileButton = (props) => {
    return (
        <>
            {props.login ? (
                <IconButton color='inherit' component={RouterLink} to='/profile'>
                    <AccountCircle />
                </IconButton>
            ) : (
                <Button color='inherit' size='large' component={RouterLink} to='/login'>
                    {translate('signIn')}
                </Button>
            )}
        </>
    )
}

export default ProfileButton
