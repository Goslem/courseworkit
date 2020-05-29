import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../common/Fields'
import Button from '@material-ui/core/Button'
import { required, maxLengthCreator } from '../../validators/index'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { InfoAlert } from '../common/InfoAlert'
import { toggleStatus } from '../../redux/companyReducer'

const useStyles = makeStyles((theme) => ({
    createForm: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: 20,
        },
        '& > *:last-child': {
            marginTop: 5,
            marginBottom: 0,
        },
    },
}))

const maxLength20 = maxLengthCreator(20)
const maxLength60 = maxLengthCreator(60)
const maxLength3000 = maxLengthCreator(3000)

const CreateCompanyForm = (props) => {
    const classes = useStyles()
    const date = new Date().toISOString()

    useEffect(() => {
        props.initialize({
            userId: props.userId,
            expirationDate: date.slice(0, 10),
        })
    }, [])

    return (
        <form onSubmit={props.handleSubmit} className={classes.createForm}>
            <Field name='userId' component='input' type='hidden' />

            <Field
                name='title'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputTitle')}
                validate={[required, maxLength60]}
            />

            <Field
                name='description'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputDescription')}
                multiline
                validate={[required, maxLength3000]}
            />

            <Field
                name='videoLink'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputVideoId')}
                validate={[required, maxLength20]}
            />

            <Field
                name='targetAmount'
                type='number'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputTargetAmount')}
                validate={[required, maxLength20]}
            />

            <Field
                name='expirationDate'
                type='date'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputDate')}
                validate={[required]}
            />

            <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                disabled={props.isFetching}
            >
                {translate('companyCreate.create')}
            </Button>

            <InfoAlert
                open={!!props.statusCode}
                message={translate(`companyCreate.message${props.statusCode}`)}
                severity={props.statusCode === 200 ? 'success' : 'error'}
                onClose={props.toggleStatus}
            />
        </form>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    isFetching: state.company.isFetching,
    statusCode: state.company.statusCode,
})

export default compose(
    connect(mapStateToProps, { toggleStatus }),
    reduxForm({ form: 'company' })
)(CreateCompanyForm)
