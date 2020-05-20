import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import translate from '../../../i18n/translate'

const useStyles = makeStyles((theme) => ({
    googleLogin: {
        flexGrow: 1,
        // marginRight: 20,
        textTransform: 'none',
    },
}))

const GoogleButton = (props) => {
    const classes = useStyles()

    return (
        <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={props.onClick}
            disabled={props.disabled}
            className={classes.googleLogin}
        >
            {translate('login.googleSignIn')}
        </Button>
    )
}

export default GoogleButton
