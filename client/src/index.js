import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import App from './components/app'
import getClient from './services/get-client'

const theme = createTheme()
const client = getClient()

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
