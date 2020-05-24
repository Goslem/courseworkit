import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
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
    const urlId = Math.abs(parseInt(props.match.params.userId, 10))
    const userId = urlId || (props.isAuth ? props.userId : 1)
    const isOwner = userId === props.userId || props.isAdmin

    return (
        <Container maxWidth='md' className={classes.root}>
            <BonusList userId={userId} />
            <CompanyList userId={userId} isOwner={isOwner} />
            <InformationBlock userId={userId} isOwner={isOwner} />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(Profile)
// export default compose(connect(mapStateToProps), withLogoutRedirect)(Profile)
