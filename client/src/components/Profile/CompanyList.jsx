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

const CompanyList = (props) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <TableContainer className={classes.companyList}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align='right'>Целевая сумма</TableCell>
                            <TableCell align='right'>Дата окончания</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Аптека</TableCell>
                            <TableCell align='right'>75у.е</TableCell>
                            <TableCell align='right'>22.05.2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Футбольный клуб</TableCell>
                            <TableCell align='right'>45у.е</TableCell>
                            <TableCell align='right'>22.05.2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Шахта</TableCell>
                            <TableCell align='right'>35у.е</TableCell>
                            <TableCell align='right'>22.05.2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Майнкрафт</TableCell>
                            <TableCell align='right'>125у.е</TableCell>
                            <TableCell align='right'>22.05.2020</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Майнкрафт</TableCell>
                            <TableCell align='right'>125у.е</TableCell>
                            <TableCell align='right'>22.05.2020</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default CompanyList
