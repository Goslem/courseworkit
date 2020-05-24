import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { connect } from 'react-redux'
import { getCompanyCount, getInitialCompany, getCompany } from '../../redux/profileReducer'

import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: 40,
    },
    toolbar: {
        minWidth: 650,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}))

const CompanyList = (props) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)

    useEffect(() => {
        props.getCompanyCount(props.userId)
        props.getInitialCompany(props.userId)
    }, [])

    const handleChangePage = (event, newPage) => {
        if (props.company.length <= newPage * 5) {
            props.getCompany(props.userId, newPage * 5, 5)
        }

        setPage(newPage)
    }

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Toolbar className={classes.toolbar}>
                    <Typography variant='h6' component='div'>
                        {translate('profile.companyList.tableTitle')}
                    </Typography>
                </Toolbar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{translate('profile.companyList.companyId')}</TableCell>
                            <TableCell align='right'>
                                {translate('profile.companyList.companyTitle')}
                            </TableCell>
                            <TableCell align='right'>
                                {translate('profile.companyList.currentAmount')}
                            </TableCell>
                            <TableCell align='right'>
                                {translate('profile.companyList.targetAmount')}
                            </TableCell>
                            <TableCell align='right'>
                                {translate('profile.companyList.expirationDate')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.company.slice(page * 5, page * 5 + 5).map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.id}</TableCell>
                                <TableCell align='right'>{company.title}</TableCell>
                                <TableCell align='right'>{company.currentAmount} y.e.</TableCell>
                                <TableCell align='right'>{company.targetAmount} y.e.</TableCell>
                                <TableCell align='right'>
                                    {new Date(company.expirationDate).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component='div'
                count={props.companyCount}
                rowsPerPage={5}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPageOptions={[5]}
            />
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    companyCount: state.profile.companyCount,
    company: state.profile.company,
})

export default connect(mapStateToProps, { getCompanyCount, getInitialCompany, getCompany })(
    CompanyList
)
