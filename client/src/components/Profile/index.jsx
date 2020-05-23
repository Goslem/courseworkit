import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'

import BonusList from './BonusList'
import CompanyList from './CompanyList'
import InformationBlock from './InformationBlock'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
}))

const Profile = (props) => {
    const classes = useStyles()

    return (
        <Container maxWidth='md' className={classes.root}>
            <BonusList />
            <CompanyList />
            <InformationBlock />
        </Container>
    )
}

// export default withLogoutRedirect(Profile)
export default Profile
