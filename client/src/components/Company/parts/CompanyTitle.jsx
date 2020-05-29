import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../../i18n/translate'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
        marginBottom: 24,
    },
    companyName: {
        marginBottom: 8,
    },
}))

const CompanyTitle = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Typography variant='h4' component='h1' className={classes.companyName}>
                {props.companyName || 'unknown'}
            </Typography>

            <Typography color='textSecondary' gutterBottom>
                {translate('company.companyTerm')}
                {new Date(props.expirationDate).toLocaleDateString()}
            </Typography>
        </Paper>
    )
}

export default CompanyTitle
