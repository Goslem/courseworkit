import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const InfoAlert = (props) => {
    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={props.onClose}
        >
            <Alert severity={props.severity} onClose={props.onClose}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}
