import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import Box from '@material-ui/core/Box'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import { withLoginRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        minHeight: 330,
        marginTop: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 128px)',
            marginTop: 128,
        },
    },
    loginContainer: {
        width: 362,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid red',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: '0 30px',
        },
    },
    logo: {
        marginTop: 0,
        marginBottom: '37px',
        fontSize: '23px',
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
}))

const Login = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.loginContainer}>
                <Box className={classes.logo}>{translate('login.authorization')}</Box>
                <LoginForm onSubmit={props.login} />
            </div>
        </div>
    )
}

export default compose(connect(null, { login }), withLoginRedirect)(Login)
