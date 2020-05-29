import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import translate from '../../i18n/translate'
import { required, maxLengthCreator } from '../../validators/index'
import { renderField } from '../common/Fields'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import { InfoAlert } from '../common/InfoAlert'
import { toggleRegistrationStatus } from '../../redux/authReducer'

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

const maxLength20 = maxLengthCreator(20)

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

            <InfoAlert
                open={!!props.statusCode}
                message={translate(`registration.message${props.statusCode}`)}
                severity={props.statusCode === 200 ? 'success' : 'error'}
                onClose={props.toggleRegistrationStatus}
            />
        </form>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.auth.isFetching,
    statusCode: state.auth.registrationStatusCode,
})

export default compose(
    connect(mapStateToProps, { toggleRegistrationStatus }),
    reduxForm({ form: 'registration' })
)(RegistrationForm)
