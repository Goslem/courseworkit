import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../i18n/translate'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 128px)',
        minHeight: 400,
        marginTop: 128,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.type === 'dark' ? '#202124' : '#F5F5F5',
        [theme.breakpoints.up('md')]: {
            height: 'calc(100vh - 64px)',
            marginTop: 64,
        },
    },
    loginForm: {
        width: '100%',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        borderRadius: 8,
        [theme.breakpoints.up('sm')]: {
            width: 450,
            padding: '42px 44px 38px',
            border: '1px solid',
            borderColor:
                theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        },
    },
    logo: {
        textAlign: 'center',
        fontSize: '23px',
        marginTop: 0,
        marginBottom: '37px',
        textTransform: 'uppercase',
        fontWeight: '500',
        color: theme.palette.type === 'dark' ? '#EAEBEC' : '#404247',
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

    return (
        <div className={classes.root}>
            <form noValidate autoComplete='off' className={classes.loginForm}>
                <p className={classes.logo}>{translate('login.companyName')}</p>

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
                    <Button color='inherit' size='large' component={RouterLink} to='/'>
                        {translate('login.signUp')}
                    </Button>
                    <Button variant='contained' color='primary' size='large'>
                        {translate('login.signIn')}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
