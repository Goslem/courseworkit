import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { withLogoutRedirect } from '../../hoc/withAuthRedirect'

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        paddingTop: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: 113,
        },
    },
    companyList: {
        marginTop: 40,
    },
    about: {
        marginTop: 40,
    }
}))

const Profile = (props) => {
    const classes = useStyles()

    return (
        <Container maxWidth='md' className={classes.root}>
            <TableContainer>
                <Table>
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
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer className={classes.companyList}>
                <Table>
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
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.about}>
                Описание человека
            </div>
        </Container>
    )
}

// export default withLogoutRedirect(Profile)
export default Profile
