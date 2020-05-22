import React from 'react'
import translate from '../../i18n/translate'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const ErrorAlert = (props) => {
    return(
        <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity='error'>
                {translate(props.error)}
            </Alert>
        </Snackbar>
    )
}
