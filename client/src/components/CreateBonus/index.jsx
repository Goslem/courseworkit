import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import translate from '../../i18n/translate'
import CreateBonusForm from './CreateBonusForm'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getCompaniesId, createBonus } from '../../redux/bonusReducer'

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

const CreateBonus = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.getCompaniesId(props.userId)
    }, [])

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.container}>
                <Typography variant='h5' component='h1' className={classes.createTitle}>
                    {translate('bonusCreate.title')}
                </Typography>
                <CreateBonusForm onSubmit={props.createBonus} companiesId={props.companiesId} />
            </Paper>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    companiesId: state.bonus.companiesId,
})

export default compose(
    connect(mapStateToProps, { createBonus, getCompaniesId }),
    withLogoutRedirect
)(CreateBonus)
