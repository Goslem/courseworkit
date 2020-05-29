import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import { withLoginRedirect } from '../../hoc/withAuthRedirect'
import translate from '../../i18n/translate'
import Typography from '@material-ui/core/Typography'
import GoogleAuth from './GoogleAuth'
import FacebookAuth from './FacebookAuth'
import LoginForm from './LoginForm'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        minHeight: 390,
        marginTop: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 128px)',
            marginTop: 113,
        },
    },
    loginContainer: {
        width: 362,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: '0 30px',
        },
    },
    logo: {
        marginTop: 0,
        marginBottom: 17,
        fontSize: '1.81em',
        fontWeight: '500',
        textAlign: 'center',
    },
    socialGroup: {
        marginBottom: 31,
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

const Login = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.loginContainer}>
                <Typography className={classes.logo}>{translate('login.logo')}</Typography>

                <div className={classes.socialGroup}>
                    <GoogleAuth />
                    <FacebookAuth />
                </div>

                <LoginForm onSubmit={props.login} />
            </div>
        </div>
    )
}

export default compose(connect(null, { login }), withLoginRedirect)(Login)
