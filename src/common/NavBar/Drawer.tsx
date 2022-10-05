import React from 'react'
import { 
    SwipeableDrawer, 
    Box, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { listaPaginas } from './LinksList';





type DrawerProps = {
    open: boolean, 
    rol: string,
    handleOpenChange : () => void
}

export const Drawer : React.FC<DrawerProps> = ({ open, rol, handleOpenChange }) => {
    
    
    let navigate = useNavigate();

    return (
        <SwipeableDrawer
                open={open}
                onClose={handleOpenChange}
                onOpen={handleOpenChange}
        >            
            <Box sx={{minWidth: '250px'}} onClick={handleOpenChange}>
                
                {
                    ( rol === 'ADMIN' ? listaPaginas.admin : listaPaginas.digitador)
                        .map( ({ titulo, icono, url }, index ) => (
                        <List 
                            key={'navItem' + index} 
                            onClick = { () => navigate( url, { replace: true } ) }>
                            <ListItem key={ titulo } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        { icono }
                                    </ListItemIcon>
                                    <ListItemText primary={ titulo } />
                                </ListItemButton>
                            </ListItem>
                        </List> 
                    ))
                }     
                
            </Box>
        </SwipeableDrawer>
    )
}