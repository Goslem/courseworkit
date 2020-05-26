import React from 'react'
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '20px',
        marginBottom: 24,
    },
}))

const CompanyTarget = (props) => {
    const classes = useStyles()
    const progress = (props.currentAmount / props.targetAmount) * 100

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' component='h2'>
                        {translate('company.companyProgress')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <LinearProgress variant='determinate' value={progress} color='secondary' />
                </Grid>
                <Grid item xs>
                    <Typography color='textSecondary' gutterBottom>
                        {props.currentAmount} y.e.
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography color='textSecondary' gutterBottom align='right'>
                        {props.targetAmount} y.e.
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CompanyTarget
