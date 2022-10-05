import React, { useContext } from 'react'
import { Grid } from '@mui/material';
import { CrudCard } from './CrudCard';
import { URLSContext } from '../../context/URLs.context';


export const CrudList = () => {

    const URLS = useContext( URLSContext );
    
    


    const items = [
        {
            path: `${ URLS.tipoobra }`,
            title: 'Administración de Tipos de Obra'
        },
        {
            path: `${ URLS.movtierra }`,
            title: 'Administración Tipos Movimiento Tierra'
        },
        {
            path: `${ URLS.aguapotable }`,
            title: 'Administración Tipos Agua Potable'
        },
        {
            path: `${ URLS.drenajepluvial }`,
            title: 'Administración Tipos Drenaje Pluvial'
        },
        {
            path: `${ URLS.drenajesanitario }`,
            title: 'Administración Tipos Drenaje Sanitario'
        },
        {
            path: `${ URLS.tipotala }`,
            title: 'Administración Tipos Tala'
        },
    ]

    return (
        <Grid 
            container
            justifyContent='center'
            direction='column'
        >
            {
                items.map( ({ path, title}, index) => {
                
                    return (

                        <Grid item key={ 'menuitem' + index }>
                            <CrudCard 
                                path  = { path } 
                                title = { title }
                            />
                        </Grid>
                    
                    )
                
                } )
            }
                
        </Grid>
    )
}
