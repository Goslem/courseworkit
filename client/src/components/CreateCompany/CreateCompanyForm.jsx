import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../common/Fields'
import Button from '@material-ui/core/Button'
import { required, maxLengthCreator } from '../../validators/index'

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
                validate={[required, maxLength20]}
            />
            <Field
                name='description'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputDescription')}
                multiline
                validate={[required, maxLength20]}
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

            <Button type='submit' variant='contained' color='primary' size='large'>
                {translate('companyCreate.create')}
            </Button>
        </form>
    )
}

export default reduxForm({ form: 'company' })(CreateCompanyForm)
