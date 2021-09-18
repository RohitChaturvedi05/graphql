import * as React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'

const Rows = ({ row, onDelete, onEdit }) => {
    const { id } = row
    const handleDelete = React.useCallback(() => {
        onDelete(id)
    }, [onDelete, id])

    const handleEdit = React.useCallback(() => {
        onEdit(id)
    }, [onEdit, id])
    return (
        <TableRow key={id}>
            <TableCell component="th" scope="row">
                {row.firstname}
            </TableCell>
            <TableCell align="left">{row.lastname}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="right">
                <ButtonGroup size="small" aria-label="small button group">
                    <IconButton aria-label="edit" color="default" onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    )
}

Rows.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
}

export default Rows
