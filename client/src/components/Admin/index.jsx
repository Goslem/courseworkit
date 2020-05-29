import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUsersCount, getUsers, toggleStatus } from '../../redux/adminReducer'
import { withAdminRedirect } from '../../hoc/withAdminRedirect'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import TableToolbarUsers from './parts/TableToolbar'
import Table from '@material-ui/core/Table'
import TableHeadUsers from './parts/TableHead'
import TableBodyUsers from './parts/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import { InfoAlert } from '../common/InfoAlert'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
    paper: {
        width: '100%',
    },
    table: {
        minWidth: 650,
    },
}))

const Admin = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.getUsersCount()
        props.getUsers(0, 10)
    }, [])

    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)

    const handleChangePage = (event, newPage) => {
        if (props.users.length <= newPage * 10) {
            props.getUsers(newPage * 10, 10)
        }
        setPage(newPage)
    }

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <TableToolbarUsers
                        selected={selected}
                        users={props.users}
                        usersCount={props.usersCount}
                        setSelected={setSelected}
                        setPage={setPage}
                    />

                    <Table className={classes.table}>
                        <TableHeadUsers
                            numSelected={selected.length}
                            users={props.users}
                            rowCount={props.users.length}
                            setSelected={setSelected}
                        />

                        <TableBodyUsers
                            selected={selected}
                            users={props.users}
                            page={page}
                            setSelected={setSelected}
                        />
                    </Table>
                </TableContainer>

                <TablePagination
                    component='div'
                    count={props.usersCount}
                    rowsPerPage={10}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPageOptions={[10]}
                />
            </Paper>

            <InfoAlert
                open={!!props.statusCode}
                message={translate('admin.error204')}
                message={translate(`admin.message${props.statusCode}`)}
                severity={props.statusCode === 200 ? 'success' : 'error'}
                onClose={props.toggleStatus}
            />
        </Container>
    )
}

const mapStateToProps = (state) => ({
    users: state.admin.users,
    usersCount: state.admin.usersCount,
    statusCode: state.admin.statusCode,
})

export default compose(
    connect(mapStateToProps, { getUsersCount, getUsers, toggleStatus }),
    withAdminRedirect
)(Admin)
