import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../../i18n/translate'
import ReactMarkdown from 'react-markdown'
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
        marginLeft: 2,
        marginBottom: 12,
    },
}))

const ShortDescription = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Typography className={classes.companyTitle} color='textSecondary' gutterBottom>
                {translate('company.companyDescription')}
            </Typography>
            <Card variant='outlined'>
                <CardContent>
                    <ReactMarkdown source={props.description} />
                </CardContent>
            </Card>
        </Paper>
    )
}

export default ShortDescription
