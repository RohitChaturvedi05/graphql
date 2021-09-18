import * as React from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { take } from 'rxjs/operators'
import getAllUsers from '../../services/get-all-users'
import Row from './row'
import Headers from './tab-header'

export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState([])
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        getAllUsers(page + 1, rowsPerPage)
            .pipe(take(1))
            .subscribe(({ users, rowsCount }) => {
                console.log(users, rowsCount)
                setCount(rowsCount)
                setRows(users)
            })
    }, [page, rowsPerPage, setRows])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const onDelete = React.useCallback(
        id => {
            console.log(id, rows)
            // onDelete(id)
        },
        [rows]
    )
    const onEdit = React.useCallback(
        id => {
            // onEdit(id)
            console.log(id, rows)
        },
        [rows]
    )
    console.log(rows)
    return (
        <Paper>
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <Headers />
                    <TableBody>
                        {rows.map(row => (
                            <Row key={row.id} row={row} onDelete={onDelete} onEdit={onEdit} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
