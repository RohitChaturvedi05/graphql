import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../authentication'


const ProtectedRoute = ({ component, ...rest }) => {
    const { isAuthenticated, user } = useAuth()

    if (isAuthenticated && user) {
        return <Route {...rest} component={component} />
    }
    return (
        <Route {...rest} render={() => <Redirect to={{ pathname: '/login' }} />} />
    )
}

ProtectedRoute.displayName = 'Protected-Route'

ProtectedRoute.propTypes = {
    component: PropTypes.any
}

export default ProtectedRoute