import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withAdminRedirect } from '../../hoc/withAdminRedirect'
import { Container } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import translate from '../../i18n/translate'
import {
    getUsersCount,
    getUsers,
    setAdmins,
    deleteAdmins,
    blockUsers,
    unblockUsers,
    deleteUsers,
    toggleError,
} from '../../redux/adminReducer'

import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import TableHeadUsers from './TableHead'
import TableToolbarUsers from './TableToolbar'

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

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

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
                        <TableBody>
                            {users.slice(page * 10, page * 10 + 10).map((user) => {
                                const isItemSelected = isSelected(user.id)

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => {
                                            handleClick(event, user.id)
                                        }}
                                        role='checkbox'
                                        selected={isItemSelected}
                                        key={user.id}
                                    >
                                        <TableCell padding='checkbox'>
                                            <Checkbox checked={isItemSelected} />
                                        </TableCell>
                                        <TableCell
                                            component='th'
                                            scope='user'
                                            padding='none'
                                            id={user.id}
                                        >
                                            {user.id}
                                        </TableCell>
                                        <TableCell align='right'>{user.name}</TableCell>
                                        <TableCell align='right'>
                                            {user.isBlocked ? 'true' : 'false'}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {user.isAdmin ? 'true' : 'false'}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {new Date(user.updatedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
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
            <Snackbar
                open={props.isError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={props.toggleError}
            >
                <Alert severity='error' onClose={props.toggleError}>
                    {translate('admin.error204')}
                </Alert>
            </Snackbar>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    users: state.admin.users,
    usersCount: state.admin.usersCount,
    isError: state.admin.isError,
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
        toggleError,
    }),
    withAdminRedirect
)(Admin)
