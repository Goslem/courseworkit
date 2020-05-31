import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCompany } from '../../redux/createCompanyReducer'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'
import translate from '../../i18n/translate'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CreateCompanyForm from './CreateCompanyForm'

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
                <CreateCompanyForm onSubmit={props.createCompany} />
            </Paper>
        </Container>
    )
}

export default compose(connect(null, { createCompany }), withLogoutRedirect)(CreateCompany)
