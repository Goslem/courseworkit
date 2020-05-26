import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import YouTube from 'react-youtube'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 14,
        marginBottom: 24,
    },
}))

const CompanyVideo = (props) => {
    const classes = useStyles()

    const opts = {
        height: '500',
        width: '100%',
    }

    return (
        <Paper className={classes.root}>
            <YouTube videoId={props.videoSrc} opts={opts} />
        </Paper>
    )
}

export default CompanyVideo
