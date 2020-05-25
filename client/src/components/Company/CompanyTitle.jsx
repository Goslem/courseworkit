import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 14,
        marginBottom: 24,
    },
    companyTitle: {
        marginBottom: 12,
    },
}))

const CompanyTitle = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography className={classes.companyTitle} color='textSecondary' gutterBottom>
                        {translate('company.companyName')}
                    </Typography>
                    <Typography variant='h5' component='h2'>
                        {props.companyName || 'unknown'}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default CompanyTitle
