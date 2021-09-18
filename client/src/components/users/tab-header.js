import * as React from 'react'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const columns = [
    { name: 'FirstName', id: 'FIRST_NAME' },
    { name: 'LastName', id: 'LAST_NAME' },
    { name: 'Email', id: 'EMAIL' },
    { name: '', id: 'ACTIONS' },
]

const Headers = () => {
    return (
        <TableHead>
            <TableRow>
                {columns.map(({ name }) => (
                    <TableCell id={name} key={name}>
                        {name}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
Headers.displayName = 'Table-header'
Headers.propTypes = {}

export default Headers
