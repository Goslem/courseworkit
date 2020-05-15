import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import translate from '../../../i18n/translate'

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}))

const CompanyName = () => {
    const classes = useStyles()

    return (
        <Link
            component={RouterLink}
            to='/'
            color='inherit'
            variant='h6'
            underline='none'
            className={classes.link}
        >
            {translate('header.companyName')}
        </Link>
    )
}
export default CompanyName
