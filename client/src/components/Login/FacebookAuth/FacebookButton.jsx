import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    facebookLogin: {
        textTransform: 'none',
        marginLeft: 17,
        padding: 0,
        minWidth: 50,
    },
    facebookLogo: {
        fill: theme.palette.primary.contrastText,
    }
}))

const GoogleButton = (props) => {
    const classes = useStyles()

    return (
        <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={props.onClick}
            className={classes.facebookLogin}
        >
            <svg
                fill='#fff'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24px'
                height='24px'
                className={classes.facebookLogo}
            >
                <path d='M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z' />
            </svg>
        </Button>
    )
}

export default GoogleButton
