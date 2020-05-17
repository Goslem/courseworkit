import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../i18n/translate'
import { Field, reduxForm } from 'redux-form'

const useStyles = makeStyles((theme) => ({
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
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

// const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
//     <TextField
//         label={label}
//         error={touched && invalid}
//         helperText={touched && error}
//         {...input}
//         {...custom}
//         variant='outlined'
//     />
// )

const renderLoginField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        variant='outlined'
        {...input}
        {...custom}
    />
)

const renderPasswordField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField label={label} type='password' variant='outlined' {...input} {...custom} />
)

const LoginForm = (props) => {
    const classes = useStyles()

    return (
        <form onSubmit={props.handleSubmit} className={classes.loginForm}>
            <Field
                name='login'
                component={renderLoginField}
                className={classes.textField}
                label={translate('login.login')}
            />
            <Field
                name='password'
                component={renderPasswordField}
                className={classes.textField}
                label={translate('login.password')}
            />

            <div className={classes.buttonGroup}>
                <Button color='inherit' size='large' component={RouterLink} to='/registration'>
                    {translate('signUp')}
                </Button>
                <Button type='submit' variant='contained' color='primary' size='large'>
                    {translate('signIn')}
                </Button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'loginForm' })(LoginForm)
