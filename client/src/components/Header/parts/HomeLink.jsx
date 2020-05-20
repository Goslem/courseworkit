import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
        },
    },
}))

const HomeLink = () => {
    const classes = useStyles()

    return (
        <IconButton color='inherit' component={RouterLink} to='/' className={classes.link}>
            <HomeIcon />
        </IconButton>
    )
}

export default HomeLink
