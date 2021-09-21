import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { of } from 'rxjs'
import getAuth from './get-auth'


const emptyFn = () => of()
const AuthContext = React.createContext({
    isAuthenticated: false,
    login: emptyFn,
    logout: emptyFn,
    token: null,
    user: null
})

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const auth = getAuth()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.element
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}