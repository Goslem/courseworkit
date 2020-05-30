import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'
import { Container } from '@material-ui/core'
import EditMode from './parts/EditMode'
import BonusList from './parts/BonusList'
import CompanyList from './parts/CompanyList'
import InformationBlock from './parts/InformationBlock'

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

    return (
        <Container maxWidth='md' className={classes.root}>
            {isOwner && <EditMode />}
            <BonusList userId={userId} />
            <CompanyList userId={userId} isOwner={isOwner} />
            <InformationBlock userId={userId} isOwner={isOwner} />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin,
})

export default compose(connect(mapStateToProps), withLogoutRedirect)(Profile)
