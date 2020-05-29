import React from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'

const TableBodyComponent = (props) => {
    const { selected, users, page, setSelected } = props

    const rowClick = (event, id) => {
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

    return (
        <TableBody>
            {users.slice(page * 10, page * 10 + 10).map((user) => {
                const isItemSelected = isSelected(user.id)

                return (
                    <TableRow
                        hover
                        onClick={(event) => {
                            rowClick(event, user.id)
                        }}
                        role='checkbox'
                        selected={isItemSelected}
                        key={user.id}
                    >
                        <TableCell padding='checkbox'>
                            <Checkbox checked={isItemSelected} />
                        </TableCell>

                        <TableCell component='th' scope='user' padding='none' id={user.id}>
                            {user.id}
                        </TableCell>

                        <TableCell align='right'>{user.name}</TableCell>
                        <TableCell align='right'>{user.isBlocked ? 'true' : 'false'}</TableCell>
                        <TableCell align='right'>{user.isAdmin ? 'true' : 'false'}</TableCell>

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
    )
}

export default TableBodyComponent
