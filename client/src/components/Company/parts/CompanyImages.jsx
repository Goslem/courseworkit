import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getCompanyImages } from '../../../redux/companyReducer'
import translate from '../../../i18n/translate'
import Paper from '@material-ui/core/Paper'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '20px',
        marginBottom: 24,
    },
    img: {
        width: '100%',
    },
}))

const CompanyImages = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.getCompanyImages(props.companyId)
    }, [])

    const [activeStep, setActiveStep] = React.useState(0)
    const maxSteps = props.images.length || 1

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    return (
        <Paper className={classes.root}>
            {props.images.length !== 0 && (
                <img className={classes.img} src={props.images[activeStep].src} alt='' />
            )}

            <MobileStepper
                variant='dots'
                steps={maxSteps}
                position='static'
                activeStep={activeStep}
                nextButton={
                    <Button
                        size='small'
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        {translate('company.next')}
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />

                        {translate('company.back')}
                    </Button>
                }
            />
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    images: state.company.companyImages,
})

export default connect(mapStateToProps, { getCompanyImages })(CompanyImages)
