import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: 'normal',
    },
}))

const CompanyName = () => {
    const classes = useStyles()

    return (
        <Typography className={classes.title} variant='h6'>
            <NavLink to='/' className={classes.link}>
                <FormattedMessage id='header.companyName' />
            </NavLink>
        </Typography>
    )
}
export default CompanyName
