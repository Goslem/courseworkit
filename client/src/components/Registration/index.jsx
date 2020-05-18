import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import Box from '@material-ui/core/Box'
import RegistrationForm from './RegistrationForm'
import { connect } from 'react-redux'
import { registration } from '../../redux/authReducer'
import { withLoginRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 64px)',
        minHeight: 400,
        marginTop: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 128px)',
            marginTop: 128,
        },
    },
    registrationContainer: {
        width: 450,
        padding: '42px 44px 38px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 30,
        },
    },
    logo: {
        marginTop: 0,
        marginBottom: '37px',
        fontSize: '23px',
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
}))

const Registration = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.registrationContainer}>
                <Box className={classes.logo}>{translate('registration.registration')}</Box>
                <RegistrationForm onSubmit={props.registration} />
            </div>
        </div>
    )
}

export default compose(connect(null, { registration }), withLoginRedirect)(Registration)
