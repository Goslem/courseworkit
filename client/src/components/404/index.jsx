import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        minHeight: 300,
        marginTop: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 128px)',
            marginTop: 113,
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '11em',
        lineHeight: 1.2,
    },
    text: {
        fontSize: '2em'
    }
}))

const ErrorPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.title}>404</div>
                <div className={classes.text}>
                    {translate('errorPage.text')}
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
