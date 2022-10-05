import React from 'react'
import { Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/system';


type MenuLinkProps = {
    title: string;
    icon: JSX.Element;
    path: string;
}


export const MenuLink : React.FC<MenuLinkProps> = ({title, icon, path}) => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(path);
    }
    

    return (
        <Paper
            elevation={8}
            sx={{ 
                p: 2, 
                cursor: 'pointer', 
                ':hover': {
                    color: 'primary.main', 
                    p: 3,                  
                }
            }}  
            onClick={handleNavigation}>
            <Stack
                sx={{ alignItems: 'center' }}
            >
                { icon }
                <Typography textAlign='center'>
                    { title }
                </Typography>
            </Stack>
        </Paper>
    )

}
