import React from 'react'

import { Grid } from '@mui/material';
import { MenuLink } from './MenuLink';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListIcon from '@mui/icons-material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';

const items = [
    {
        path: '/adminopciones',
        icon: <ListIcon sx={{ fontSize: 60 }} />,
        title: 'Administración Opciones'
    },
    {
        path: '/registro',
        icon: <PersonAddAltIcon sx={{ fontSize: 60 }} />,
        title: 'Agregar Usuario'
    },
    {
        path: '/adminusuarios',
        icon: <ManageAccountsIcon sx={{ fontSize: 60 }} />,
        title: 'Administración Usuarios'
    },
    {
        path: '/adminrubros',
        icon: <SummarizeIcon sx={{ fontSize: 60 }} />,
        title: 'Administración Rubros'
    },
]

export const Menu = () => {
    return (
        <Grid 
            container
            justifyContent='center'
            spacing={2}
        >
            {
                items.map( ({icon, path, title}, index) => {
                
                    return (

                        <Grid item key={ 'menuitem' + index }>
                            <MenuLink 
                                path  = { path } 
                                icon  = { icon }
                                title = { title }
                            />
                        </Grid>
                    
                    )
                
                } )
            }
            
        </Grid>
    )
}
