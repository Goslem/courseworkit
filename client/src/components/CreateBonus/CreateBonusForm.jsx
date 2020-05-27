import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../common/Fields'
import Button from '@material-ui/core/Button'
import { required, maxLengthCreator } from '../../validators/index'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

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

const CreateBonusForm = (props) => {
    const classes = useStyles()
    const [currency, setCurrency] = React.useState()

    const handleChange = (event) => {
        setCurrency(event.target.value)
    }

    return (
        <form onSubmit={props.handleSubmit} className={classes.createForm}>
            {/* <TextField
                id='outlined-select-currency'
                select
                label='Select company'
                value={currency}
                onChange={handleChange}
                variant='outlined'
            >
                {props.companiesId.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                ))}
            </TextField> */}

            <Field name='companyId' component='select'>
                {props.companiesId.map((option) => (
                    <option value={option.id} key={option.id}>{option.title}</option>
                ))}
            </Field>

            <Field
                name='title'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputTitle')}
                validate={[required, maxLength20]}
            />
            <Field
                name='amount'
                type='number'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputTargetAmount')}
                validate={[required, maxLength20]}
            />
            <Field
                name='description'
                autoComplete='off'
                component={renderField}
                label={translate('companyCreate.inputVideoId')}
                validate={[required, maxLength20]}
            />

            <Button type='submit' variant='contained' color='primary' size='large'>
                {translate('companyCreate.create')}
            </Button>
        </form>
    )
}

export default reduxForm({ form: 'bonus' })(CreateBonusForm)
