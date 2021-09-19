import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import getClient from './services/get-client'

const theme = createTheme()
const client = getClient()
const Root = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    )
}
ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
)
