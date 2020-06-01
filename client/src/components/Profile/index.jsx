import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'
import { getUserInfo } from '../../redux/profileReducer'
import { Container } from '@material-ui/core'
import EditMode from './parts/EditMode'
import BonusList from './parts/BonusList'
import CompanyList from './parts/CompanyList'
import InformationBlock from './parts/InformationBlock'
import ProfileNotFound from './parts/ProfileNotFound'

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

    const urlId = Number(props.match.params.userId, 10)
    const userId = isNaN(urlId) ? props.userId : urlId
    const isOwner = userId === props.userId || props.isAdmin

    useEffect(() => {
        props.getUserInfo(userId)
    }, [])

    return (
        <>
            {props.name ? (
                <Container maxWidth='md' className={classes.root}>
                    {isOwner && <EditMode />}
                    <BonusList userId={userId} />
                    <CompanyList userId={userId} isOwner={isOwner} />
                    <InformationBlock userId={userId} isOwner={isOwner} />
                </Container>
            ) : (
                <ProfileNotFound />
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin,
    name: state.profile.userInfo.name,
})

export default compose(connect(mapStateToProps, { getUserInfo }), withLogoutRedirect)(Profile)
