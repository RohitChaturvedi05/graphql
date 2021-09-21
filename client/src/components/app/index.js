import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { withStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { AuthProvider } from '../../authentication'
import ProtectedRoute from '../protected-route'
import Header from '../header'
import Login from '../login'
import Users from '../users'
import styles from './styles'


const App = ({ classes }) => (
    <AuthProvider>
        <Paper className={classes.root}>
            <Header />
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <ProtectedRoute path='/users' component={Users} />
                    <Route path='/' component={Login} />
                </Switch>
            </BrowserRouter>
        </Paper>
    </AuthProvider>
)

App.displayName = 'App'

App.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired
    })
}

export default withStyles(styles)(App)