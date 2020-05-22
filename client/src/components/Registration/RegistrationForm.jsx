import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import translate from '../../i18n/translate'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../common/Fields'
import { required, maxLengthCreator } from '../../validators/index'
import { ErrorAlert } from '../common/ErrorAlert'
import { compose } from 'redux'
import { connect } from 'react-redux'

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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
}))

const errorsCode = [500, 204]
const maxLength20 = maxLengthCreator(20)

const RegistrationForm = (props) => {
    const classes = useStyles()
    const errorCode = errorsCode.find((error) => error === props.error)

    return (
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <Field
                name='login'
                autoComplete='off'
                component={renderField}
                label={translate('registration.login')}
                validate={[required, maxLength20]}
                className={classes.textField}
                autoFocus
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
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    disabled={props.isFetching}
                >
                    {translate('registration.signUp')}
                </Button>
                <Button
                    color='inherit'
                    size='large'
                    component={RouterLink}
                    to='/login'
                    disabled={props.isFetching}
                >
                    {translate('registration.signIn')}
                </Button>
            </div>

            {errorCode && <ErrorAlert error={'registration.error' + errorCode} />}
        </form>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.auth.isFetching,
})

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'registration' })
)(RegistrationForm)
