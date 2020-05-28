import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../../i18n/translate'
import { connect } from 'react-redux'
import { getBonusesCount, getInitialBonuses, getBonuses } from '../../../redux/profileReducer'

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

const BonusList = (props) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)

    useEffect(() => {
        props.getBonusesCount(props.userId)
        props.getInitialBonuses(props.userId)
    }, [])

    const handleChangePage = (event, newPage) => {
        if (props.bonuses.length <= newPage * 5) {
            props.getBonuses(props.userId, newPage * 5, 5)
        }
        setPage(newPage)
    }

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Toolbar className={classes.toolbar}>
                    <Typography variant='h6' component='div'>
                        {translate('profile.bonusList.tableTitle')}
                    </Typography>
                </Toolbar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{translate('profile.bonusList.bonusTitle')}</TableCell>
                            <TableCell align='right'>
                                {translate('profile.bonusList.bonusAmount')}
                            </TableCell>
                            <TableCell align='right'>
                                {translate('profile.bonusList.bonusDescription')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.bonuses.slice(page * 5, page * 5 + 5).map((bonus) => (
                            <TableRow key={bonus.id}>
                                <TableCell>{bonus.title}</TableCell>
                                <TableCell align='right'>{bonus.amount} y.e.</TableCell>
                                <TableCell align='right'>{bonus.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component='div'
                count={props.bonusesCount}
                rowsPerPage={5}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPageOptions={[5]}
            />
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    bonusesCount: state.profile.bonusesCount,
    bonuses: state.profile.bonuses,
})

export default connect(mapStateToProps, { getBonusesCount, getInitialBonuses, getBonuses })(
    BonusList
)
