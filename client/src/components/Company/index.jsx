import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getUserCompanies, getCompany } from '../../redux/companyReducer'
import { Container } from '@material-ui/core'
import EditMode from './parts/EditMode'
import CompanyTitle from './parts/CompanyTitle'
import BonusList from './parts/BonusList'
import ShortDescription from './parts/ShortDescription'
import CompanyVideo from './parts/CompanyVideo'
import CompanyImages from './parts/CompanyImages'
import CompanyTarget from './parts/CompanyTarget'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 63,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
}))

const Company = (props) => {
    const classes = useStyles()
    const { userCompanies, company } = props

    const companyId = Number(props.match.params.companyId)
    const isOwner = props.isAdmin || !!userCompanies.find((company) => company.id === companyId)

    useEffect(() => {
        props.getCompany(companyId)

        if (props.isAuth) {
            props.getUserCompanies(props.userId)
        }
    }, [])

    return (
        <Container maxWidth='md' className={classes.root}>
            {isOwner && <EditMode />}
            <CompanyTitle companyName={company.title} expirationDate={company.expirationDate} />
            <BonusList companyId={companyId} isAuth={props.isAuth} userId={props.userId} />
            <ShortDescription description={company.description} />
            <CompanyVideo videoSrc={company.videoLink} />
            <CompanyImages companyId={companyId} />
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
    userCompanies: state.company.userCompanies,
    company: state.company.company,
})

export default connect(mapStateToProps, { getUserCompanies, getCompany })(Company)
