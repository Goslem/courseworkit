import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const InfoAlert = (props) => {
    return (
        <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity={props.severity}>{props.error}</Alert>
        </Snackbar>
    )
}
