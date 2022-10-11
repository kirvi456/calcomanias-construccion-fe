import React from 'react'
import { CardForm } from './CardForm'
import { Grid, Typography, Stack } from '@mui/material'

import EmptyPCS from '../../../assets/svg/empty.svg'

import { Formulario } from '../../../models/Formulario'
type ListadoPcsProps = {
    forms : Formulario[]
}

export const ListaForms : React.FC<ListadoPcsProps> = ({ forms }) => {



    if( forms.length === 0 ){
        return(
            <Stack alignItems='center' spacing={2} sx={{mt: 4}} >
                <img src={ EmptyPCS } alt='No se encontro' style={{ width: '128px', maxWidth: '95%'}} />
                <Typography>
                    No se encontraron formularios
                </Typography>
            </Stack>
        )
    }

    return (
        <Grid container sx={{justifyContent: 'center'}}>
            {                
                forms.map(form  => 
                    (
                        <Grid item sx={{p: 1}} key={ form._id }>
                            <CardForm  form={ form }  />
                        </Grid>
                    )
                )
            }
        </Grid>
    )
}