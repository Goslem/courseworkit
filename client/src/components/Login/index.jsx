import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../i18n/translate'
import Box from '@material-ui/core/Box'

import axios from 'axios'

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
    loginForm: {
        width: 450,
        padding: '42px 44px 38px',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
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
    textField: {
        marginBottom: 20,
    },
    buttonGroup: {
        marginTop: 18,
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

const Login = () => {
    const classes = useStyles()

    const handleForm = (event) => {
        // axios
        //     .post('/api/users', {
        //         login: login,
        //         password: '123',
        //     })
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    return (
        <div className={classes.root}>
            <form noValidate autoComplete='off' className={classes.loginForm}>
                <Box className={classes.logo}>{translate('companyName')}</Box>

                <TextField
                    required
                    id='login'
                    label={translate('login.login')}
                    variant='outlined'
                    className={classes.textField}
                />

                <TextField
                    required
                    id='password'
                    label={translate('login.password')}
                    type='password'
                    variant='outlined'
                    className={classes.textField}
                />

                <div className={classes.buttonGroup}>
                    <Button color='inherit' size='large' component={RouterLink} to='/registration'>
                        {translate('signUp')}
                    </Button>
                    <Button variant='contained' color='primary' size='large' onClick={handleForm}>
                        {translate('signIn')}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
