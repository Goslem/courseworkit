import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getCompaniesId, createBonus } from '../../redux/createBonusReducer'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import translate from '../../i18n/translate'
import CreateBonusForm from './CreateBonusForm'
import Typography from '@material-ui/core/Typography'

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
                <CreateBonusForm onSubmit={props.createBonus} />
            </Paper>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
})

export default compose(
    connect(mapStateToProps, { createBonus, getCompaniesId }),
    withLogoutRedirect
)(CreateBonus)
