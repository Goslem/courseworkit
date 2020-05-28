import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getUserInfo } from '../../../redux/profileReducer'
import translate from '../../../i18n/translate'

import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 30,
    },
    userInfo: {
        padding: '0 20px 10px',
        [theme.breakpoints.down('xs')]: {
            padding: '0 14px 2px',
        },
    },
    card: {
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 14,
    },
    userName: {
        marginBottom: 12,
    },
}))

const InformationBlock = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.getUserInfo(props.userId)
    }, [])

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography variant='h6' component='div'>
                    {translate('profile.informationBlock.userInfo')}
                </Typography>
            </Toolbar>

            <Grid container spacing={3} className={classes.userInfo}>
                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.name')}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {props.name || 'unknown'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.surname')}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {props.surname || 'unknown'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.country')}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {props.country || 'unknown'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.city')}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {props.city || 'unknown'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    name: state.profile.userInfo.name,
    surname: state.profile.userInfo.surname,
    country: state.profile.userInfo.country,
    city: state.profile.userInfo.city,
})

export default connect(mapStateToProps, { getUserInfo })(InformationBlock)
