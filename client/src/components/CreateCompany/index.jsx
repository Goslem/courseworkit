import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import translate from '../../i18n/translate'
import CreateCompanyForm from './CreateCompanyForm'
import { connect } from 'react-redux'
import { createCompany } from '../../redux/companyReducer'
import Typography from '@material-ui/core/Typography'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 63,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
    container: {
        padding: 23,
    },
    createTitle: {
        marginBottom: 23,
    },
}))

const CreateCompany = (props) => {
    const classes = useStyles()

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.container}>
                <Typography variant='h5' component='h1' className={classes.createTitle}>
                    {translate('companyCreate.title')}
                </Typography>
                <CreateCompanyForm onSubmit={props.createCompany} userId={props.userId} />
            </Paper>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
})

export default compose(connect(mapStateToProps, { createCompany }), withLogoutRedirect)(CreateCompany)
