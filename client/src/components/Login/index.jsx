import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import Box from '@material-ui/core/Box'
import LoginForm from './LoginForm'
import { login } from '../../api/api'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        minHeight: 400,
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
        width: 450,
        padding: '42px 44px 38px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 30,
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

const Login = () => {
    const classes = useStyles()

    const submit = (formData) => {
        const data = {
            login: formData.login,
            password: formData.password,
        }

        login(data)
            .then((response) => {
                if (response.data.length === 0) {
                    console.log('User not found')
                } else {
                    console.log('Hello: ' + response.data[0].login)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={classes.root}>
            <div className={classes.loginContainer}>
                <Box className={classes.logo}>{translate('companyName')}</Box>
                <LoginForm onSubmit={submit} />
            </div>
        </div>
    )
}

export default Login
