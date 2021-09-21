import Paper from '@mui/material/Paper'
import React, { useEffect, useState } from 'react'
import { take } from 'rxjs/operators'
import AuthContext from '../../context/auth'
import login$ from '../../services/login'
import Header from '../header'
import Users from '../users'


export default function App() {
    const [token, setToken] = useState(null)
    useEffect(() => {
        login$.pipe(take(1)).subscribe(token => setToken(token))

    }, [setToken])

    if (!token) {
        return <Paper>
            fetching login token....
        </Paper>
    }
    return (
        <AuthContext.Provider value={{ token, isAuth: true }}>
            <Paper>
                <Header />
                <Users />
            </Paper>
        </AuthContext.Provider>
    )
}
