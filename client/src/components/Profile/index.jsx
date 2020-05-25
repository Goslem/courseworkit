import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
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
    let userId = urlId
    
    if (isNaN(urlId)) {
        if (props.isAuth) {
            userId = props.userId
        } else {
            return <Redirect to='/login' />
        }
    }

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
    isAuth: state.auth.isAuth,
    isAdmin: state.auth.isAdmin,
})

export default connect(mapStateToProps)(Profile)
// export default compose(connect(mapStateToProps), withLogoutRedirect)(Profile)
