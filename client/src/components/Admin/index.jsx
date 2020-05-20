import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withAdminRedirect } from '../../hoc/withAdminRedirect'
import { Container } from '@material-ui/core'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUsers } from '../../redux/usersReducer'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
    table: {
        minWidth: 650,
    },
}))

const Admin = (props) => {
    const classes = useStyles()
    
    const rows = props.users

    useEffect(() => {
        props.getUsers()
    }, [])

    return (
        <Container maxWidth='md' className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align='right'>Name</TableCell>
                            <TableCell align='right'>Admin</TableCell>
                            <TableCell align='right'>updatedAt</TableCell>
                            <TableCell align='right'>createdAt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component='th' scope='row'>{row.id}</TableCell>
                                <TableCell align='right'>{row.name}</TableCell>
                                <TableCell align='right'>{row.isAdmin ? 'true' : 'false'}</TableCell>
                                <TableCell align='right'>{row.updatedAt}</TableCell>
                                <TableCell align='right'>{row.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    users: state.users.users,
})

// export default compose(connect(mapStateToProps, { getUsers }), withAdminRedirect)(Admin)
export default connect(mapStateToProps, { getUsers })(Admin)
