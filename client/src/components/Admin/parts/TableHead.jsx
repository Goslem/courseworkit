import React from 'react'
import translate from '../../../i18n/translate'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'

const TableHeadComponent = (props) => {
    const { numSelected, rowCount, onSelectAllClick } = props

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                <TableCell align='left' padding='none'>
                    {translate('admin.headId')}
                </TableCell>
                <TableCell align='right' padding='default'>
                    {translate('admin.headName')}
                </TableCell>
                <TableCell align='right' padding='default'>
                    {translate('admin.headBlocked')}
                </TableCell>
                <TableCell align='right' padding='default'>
                    {translate('admin.headAdmin')}
                </TableCell>
                <TableCell align='right' padding='default'>
                    {translate('admin.headUpdated')}
                </TableCell>
                <TableCell align='right' padding='default'>
                    {translate('admin.headCreated')}
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeadComponent
