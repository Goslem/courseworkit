import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { getUserCompanyId, getCompany } from '../../redux/companyReducer'

import CompanyTitle from './CompanyTitle'
import BonusList from './BonusList'
import ShortDescription from './ShortDescription'
import CompanyVideo from './CompanyVideo'
import CompanyTarget from './CompanyTarget'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 63,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
}))

const Admin = (props) => {
    const classes = useStyles()
    const { company } = props

    const companyId = Math.abs(parseInt(props.match.params.companyId, 10))
    const isOwner =
        props.isAdmin || props.userCompanyId.includes((company) => company.id === companyId)

    useEffect(() => {
        if (props.isAuth) props.getUserCompanyId(props.userId)
        props.getCompany(companyId)
    }, [])

    return (
        <Container maxWidth='md' className={classes.root}>
            <CompanyTitle companyName={company.title} expirationDate={company.expirationDate} />
            <BonusList companyId={companyId} isAuth={props.isAuth} userId={props.userId} />
            <ShortDescription description={company.description} />
            <CompanyVideo videoSrc={company.videoLink} />
            <CompanyTarget
                currentAmount={company.currentAmount}
                targetAmount={company.targetAmount}
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isAdmin: state.auth.isAdmin,
    userCompanyId: state.company.userCompanyId,
    company: state.company.company,
})

export default connect(mapStateToProps, { getUserCompanyId, getCompany })(Admin)
