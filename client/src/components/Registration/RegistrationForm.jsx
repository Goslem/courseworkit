import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../i18n/translate'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../common/Fields'
import { required, maxLengthCreator } from '../../validators/index'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    form: {
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

const maxLength20 = maxLengthCreator(20)

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

const RegistrationForm = (props) => {
    const classes = useStyles()

    return (
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <Field
                name='login'
                autoComplete='off'
                component={renderField}
                label={translate('registration.login')}
                validate={[required, maxLength20]}
                className={classes.textField}
            />
            <Field
                name='password'
                type='password'
                component={renderField}
                label={translate('registration.password')}
                validate={[required, maxLength20]}
                className={classes.textField}
            />
            <div className={classes.buttonGroup}>
                <Button color='inherit' size='large' component={RouterLink} to='/login'>
                    {translate('registration.signIn')}
                </Button>
                <Button type='submit' variant='contained' color='primary' size='large'>
                    {translate('registration.signUp')}
                </Button>
            </div>

            {props.error && (
                <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity='error'>{translate('registration.error')}</Alert>
                </Snackbar>
            )}
        </form>
    )
}

export default reduxForm({ form: 'registration' })(RegistrationForm)
