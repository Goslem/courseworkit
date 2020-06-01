import React, { useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { uploadImage, nullifyStatus } from '../../redux/createCompanyReducer'
import { arrayPush } from 'redux-form'
import translate from '../../i18n/translate'
import { renderField } from '../common/Fields'
import { useDropzone } from 'react-dropzone'
import Button from '@material-ui/core/Button'
import { required, maxLengthCreator } from '../../validators/index'
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
    dragZone: {
        height: 200,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 18,
        border: '1px dashed',
        borderColor: theme.palette.primary.main,
    },
    dropZone: {
        height: 200,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 18,
        border: '1px dashed',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.type === 'light' ? '#F0F2F5' : '#202124',
    },
    companyImages: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    companyImage: {
        width: '49.9%',
        marginTop: 1,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach(async (image) => {
            const url = await props.uploadImage(image)
            props.dispatch(arrayPush('createCompany', 'images', url))
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <form onSubmit={props.handleSubmit} className={classes.createForm}>
            <Field name='userId' component='input' type='hidden' />
            <FieldArray name='images' component='input' type='hidden' />

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

            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <div className={classes.dropZone}>{translate('companyCreate.dropzone')}</div>
                ) : (
                    <div className={classes.dragZone}>{translate('companyCreate.dragzone')}</div>
                )}
            </div>

            <div className={classes.companyImages}>
                {props.images.map((image, index) => (
                    <img src={image} alt='' key={index} className={classes.companyImage} />
                ))}
            </div>

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
                onClose={props.nullifyStatus}
            />
        </form>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    images: state.createCompany.images,
    isFetching: state.createCompany.isFetching,
    statusCode: state.createCompany.statusCode,
})

export default compose(
    connect(mapStateToProps, { uploadImage, nullifyStatus }),
    reduxForm({ form: 'createCompany' })
)(CreateCompanyForm)
