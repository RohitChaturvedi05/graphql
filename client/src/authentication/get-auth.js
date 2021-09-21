import { useState } from 'react'
import { Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'
import loginApi from '../services/login'


export default () => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const login = (username, password) => loginApi(username, password).pipe(
        take(1),
        tap(token => {
            setUser(username)
            setToken(token)
        })
    )

    const logout = () => new Observable(observer => {
        setToken(null)
        setUser(null)
        observer.complete()
    })

    return {
        isAuthenticated: user && token,
        login,
        logout,
        token,
        user
    }
}
