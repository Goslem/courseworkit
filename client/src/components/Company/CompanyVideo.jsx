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
    youtubeContainer: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        overflow: 'hidden',
        marginBottom: 50,
        '& iframe': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        },
    },
}))

const CompanyVideo = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <YouTube videoId={props.videoSrc} containerClassName={classes.youtubeContainer} />
        </Paper>
    )
}

export default CompanyVideo
