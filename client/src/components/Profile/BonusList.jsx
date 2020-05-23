import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: 40,
    },
    table: {
        minWidth: 650,
    },
}))

const BonusList = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align='right'>Сумма</TableCell>
                            <TableCell align='right'>Описание</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Футболка</TableCell>
                            <TableCell align='right'>5у.е</TableCell>
                            <TableCell align='right'>Футболка с логотипом</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Футболка</TableCell>
                            <TableCell align='right'>5у.е</TableCell>
                            <TableCell align='right'>Футболка с логотипом</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Футболка</TableCell>
                            <TableCell align='right'>5у.е</TableCell>
                            <TableCell align='right'>Футболка с логотипом</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Футболка</TableCell>
                            <TableCell align='right'>5у.е</TableCell>
                            <TableCell align='right'>Футболка с логотипом</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Футболка</TableCell>
                            <TableCell align='right'>5у.е</TableCell>
                            <TableCell align='right'>Футболка с логотипом</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default BonusList
