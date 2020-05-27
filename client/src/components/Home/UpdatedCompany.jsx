import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getCompany } from '../../redux/homeReducer'
import translate from '../../i18n/translate'
import { Link as RouterLink } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import YouTube from 'react-youtube'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
        marginBottom: 30,
    },
    companyInfo: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        width: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    companyTitle: {
        marginBottom: 6,
    },
    viewButtonBlock: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
    },
    viewButton: {
        height: 40,
    },
    videoBlock: {
        marginTop: 20,
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

const UpdatedCompany = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.getCompany()
    }, [])

    const opts = {
        playerVars: {
            enablejsapi: 1,
            origin: 'https://courseworkit.herokuapp.com',
        },
    }

    return props.lastCompany.map((company) => (
        <Paper className={classes.root} key={company.id}>
            <Grid container>
                <Grid item className={classes.companyInfo}>
                    <Typography variant='h6' component='h1' className={classes.companyTitle}>
                        {company.title}
                    </Typography>
                    <Typography>
                        {translate('home.updatedAt')}
                        {new Date(company.updatedAt).toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item className={classes.viewButtonBlock}>
                    <Button
                        color='primary'
                        variant='contained'
                        size='large'
                        component={RouterLink}
                        to={'/company/' + company.id}
                        className={classes.viewButton}
                    >
                        {translate('home.view')}
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.videoBlock}>
                    <YouTube
                        videoId={company.videoLink}
                        opts={opts}
                        containerClassName={classes.youtubeContainer}
                    />
                </Grid>
            </Grid>
        </Paper>
    ))
}

const mapStateToProps = (state) => ({
    lastCompany: state.home.lastCompany,
})

export default connect(mapStateToProps, { getCompany })(UpdatedCompany)
