import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
    getUsersCount,
    getUsers,
    setAdmins,
    deleteAdmins,
    blockUsers,
    unblockUsers,
    deleteUsers,
    toggleStatus,
} from '../../redux/adminReducer'
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
    const users = props.users

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((user) => user.id)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected = [...selected]

        if (selectedIndex === -1) {
            newSelected.push(id)
        } else {
            newSelected.splice(selectedIndex, 1)
        }

        setSelected(newSelected)
    }

    const isSelected = (id) => {
        return selected.indexOf(id) !== -1
    }

    const handleChangePage = (event, newPage) => {
        if (users.length <= newPage * 10) {
            props.getUsers(newPage * 10, 10)
        }

        setPage(newPage)
    }

    const onFollowing = () => {
        if (selected.length === 0) return
        window.open('profile/' + selected[0], '_blank')
    }

    const onAdminsAdd = () => {
        if (selected.length === 0) return
        props.setAdmins(selected)
    }

    const onAdminsDelete = () => {
        if (selected.length === 0) return
        props.deleteAdmins(selected)
    }

    const onUsersBlock = () => {
        if (selected.length === 0) return
        props.blockUsers(selected)
    }

    const onUsersUnblock = () => {
        if (selected.length === 0) return
        props.unblockUsers(selected)
    }

    const onUsersDelete = () => {
        if (selected.length === 0) return
        if (selected.length > 10) setPage(0)
        props.deleteUsers(selected, users.length, props.usersCount)
        setSelected([])
    }

    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <TableToolbarUsers
                        numSelected={selected.length}
                        selected={selected}
                        onFollowing={onFollowing}
                        onAdminsAdd={onAdminsAdd}
                        onAdminsDelete={onAdminsDelete}
                        onUsersBlock={onUsersBlock}
                        onUsersUnblock={onUsersUnblock}
                        onUsersDelete={onUsersDelete}
                    />
                    <Table className={classes.table}>
                        <TableHeadUsers
                            numSelected={selected.length}
                            rowCount={users.length}
                            onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBodyUsers
                            users={users}
                            page={page}
                            isSelected={isSelected}
                            handleClick={handleClick}
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
    connect(mapStateToProps, {
        getUsersCount,
        getUsers,
        setAdmins,
        deleteAdmins,
        blockUsers,
        unblockUsers,
        deleteUsers,
        toggleStatus,
    }),
    withAdminRedirect
)(Admin)
