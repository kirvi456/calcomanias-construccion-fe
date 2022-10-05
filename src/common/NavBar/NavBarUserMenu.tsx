import React, { useContext } from 'react'
import { Avatar, Menu, MenuItem, Stack, Typography, Button, Divider, Tooltip, ListItemIcon } from '@mui/material'

import { Settings, Logout, Person } from '@mui/icons-material'
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom'

type NavBarUserMenuProp = {
    userName    : string,
    userImg     : string
}

export const NavBarUserMenu : React.FC<NavBarUserMenuProp> = ({userName, userImg}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { logout } = useContext( AuthContext );
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout()
        handleClose()
        navigate('/login', {replace: true})
    }

    return (
        <>
            <Tooltip title='Opciones de cuenta'>
                <Button
                    id="user-nav-button"
                    aria-controls={open ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}   
                >
                    <Stack 
                        direction='row'
                        spacing={2}
                        alignItems='center'
                    >
                        <Typography 
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block'
                                }
                            }}
                        >{ userName }</Typography>
                        <Avatar 
                            alt={ userName } 
                            src={ userImg } 
                        />
                    </Stack>
                </Button>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                    }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}                

            >
                <MenuItem onClick={handleClose}>
                <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    Mi Cuenta
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}
