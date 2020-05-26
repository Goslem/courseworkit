import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import UpdatedCompany from './UpdatedCompany'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 63,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
    homeTitle: {
        flexGrow: 1,
        padding: 20,
        marginBottom: 24,
    },
}))

const Home = () => {
    const classes = useStyles()

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.homeTitle}>
                <Typography variant='h5' component='h1'>
                    {translate('home.homeTitle')}
                </Typography>
            </Paper>
            <UpdatedCompany />
        </Container>
    )
}

export default Home
