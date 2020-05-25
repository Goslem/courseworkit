import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 14,
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
    },
    companyName: {
        marginRight: 13,
    },
}))

const CompanyVideo = (props) => {
    const classes = useStyles()
    const [rating, setRating] = useState(3.5)

    useEffect(() => {}, [])

    return (
        <Paper className={classes.root}>
            <Typography variant='h5' component='div' className={classes.companyName}>
                Video
            </Typography>
        </Paper>
    )
}

export default CompanyVideo
