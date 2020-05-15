import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'

const ProfileButton = () => {
    const [profile, setProfile] = useState(false)

    const handleProfile = () => {
        setProfile(!profile)
    }

    return (
        <>
            {profile ? (
                <IconButton color='inherit' onClick={handleProfile}>
                    <AccountCircle />
                </IconButton>
            ) : (
                <Button color='inherit' size='large' onClick={handleProfile}>
                    <FormattedMessage id='header.login' />
                </Button>
            )}
        </>
    )
}

export default ProfileButton
