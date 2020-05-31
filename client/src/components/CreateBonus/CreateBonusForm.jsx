import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { toggleStatus } from '../../redux/createBonusReducer'
import { Field, reduxForm } from 'redux-form'
import translate from '../../i18n/translate'
import MenuItem from '@material-ui/core/MenuItem'
import { renderField } from '../common/Fields'
import { renderSelectField } from '../common/Fields'
import { required, maxLengthCreator } from '../../validators/index'
import Button from '@material-ui/core/Button'
import { InfoAlert } from '../common/InfoAlert'

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
const maxLength40 = maxLengthCreator(40)

const CreateBonusForm = (props) => {
    const classes = useStyles()

    return (
        <form onSubmit={props.handleSubmit} className={classes.createForm}>
            <Field
                name='companyId'
                component={renderSelectField}
                label={translate('bonusCreate.selectCompany')}
                validate={[required]}
            >
                {props.companiesId.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                ))}
            </Field>

            <Field
                name='title'
                autoComplete='off'
                component={renderField}
                label={translate('bonusCreate.inputTitle')}
                validate={[required, maxLength20]}
            />

            <Field
                name='amount'
                type='number'
                autoComplete='off'
                component={renderField}
                label={translate('bonusCreate.inputAmount')}
                validate={[required, maxLength20]}
            />

            <Field
                name='description'
                autoComplete='off'
                component={renderField}
                label={translate('bonusCreate.inputDescription')}
                validate={[required, maxLength40]}
            />

            <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                disabled={props.isFetching}
            >
                {translate('bonusCreate.create')}
            </Button>

            <InfoAlert
                open={!!props.statusCode}
                message={translate(`bonusCreate.message${props.statusCode}`)}
                severity={props.statusCode === 200 ? 'success' : 'error'}
                onClose={props.toggleStatus}
            />
        </form>
    )
}

const mapStateToProps = (state) => ({
    companiesId: state.createBonus.companiesId,
    isFetching: state.createBonus.isFetching,
    statusCode: state.createBonus.statusCode,
})

export default compose(
    connect(mapStateToProps, { toggleStatus }),
    reduxForm({ form: 'createBonus' })
)(CreateBonusForm)
