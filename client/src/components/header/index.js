import React from 'react'
import { withStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import PropTypes from 'prop-types'
import styles from './styles'
import { useCallback } from 'react'
import { useAuth } from '../../authentication'


const MenuAppBar = withStyles(styles)(({ classes }) => {
    const auth = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const onLogout = useCallback(() => {
        auth.logout().subscribe()
    }, [auth])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Awesome App
                    </Typography>
                    {
                        auth.isAuthenticated && <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                disabled={!auth.isAuthenticated}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={onLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
})

MenuAppBar.displayName = 'MenuAppBar'

MenuAppBar.propTypes = {
    classes: PropTypes.shape({
        menuButton: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default MenuAppBar