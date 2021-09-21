import { withStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import React, { useCallback, useState } from 'react'
import Typography from '@mui/material/Typography'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../authentication'
import styles from './styles'


const Login = withStyles(styles)(({ onSuccess, classes }) => {

    const auth = useAuth()
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [err, setError] = useState('')

    const handleChange = useCallback(e => {
        const { id, value } = e.currentTarget
        if (id === 'password') {
            setPassword(value)
        }
        if (id === 'username') {
            setUsername(value)
        }
    }, [setUsername, setPassword])

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword, setShowPassword])

    const onLogin = useCallback(() => {
        auth.login(username, password).subscribe({
            error: ({ response }) => {
                setPassword('')
                setError('UserName or Password is incorrect')
                console.log(response)
            },
            complete: () => history.push('/users')
        })
    }, [auth, history, username, password, setPassword, setError, onSuccess])

    return (
        <div className={classes.wrapper}>
            <Paper elevation={4} className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                    </Grid>
                    {err && <Grid item xs={12}>
                        <Typography color="red" component="span" variant="caption">{err}</Typography>
                    </Grid>}

                    <Grid item xs={12}>
                        <FormControl fullWidth required variant="standard">
                            <InputLabel htmlFor="UserName">UserName</InputLabel>
                            <Input
                                id="username"
                                type='text'
                                value={username}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required variant="standard">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} alignItems="flex-end">
                        <Button
                            disabled={!username || !password}
                            type='button'
                            color='primary'
                            className='form__custom-button'
                            onClick={onLogin}>
                            Log in
                        </Button>
                    </Grid>
                </Grid>
            </Paper >
        </div>
    )
})

Login.displayName = 'App-login'

Login.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string.isRequired,
        wrapper: PropTypes.string.isRequired
    }).isRequired,
    onSuccess: PropTypes.func.isRequired,
    history: PropTypes.any
}
export default Login