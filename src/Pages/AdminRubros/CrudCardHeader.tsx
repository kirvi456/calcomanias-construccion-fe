import React, { useState } from 'react'
import { Typography, Divider, Grid, TextField, Stack, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNotification } from '../../hooks/useNotification'
import AddIcon from '@mui/icons-material/Add';
import { EmptyRubro, Rubro } from '../../models/Rubro'
import { crearRubro } from '../../services/rubros'


type CrudCardHeaderProps = {
    title : string,
    path  : string,
    handleCreatedSuccess: (result: Rubro) => void
}

export const CrudCardHeader : React.FC<CrudCardHeaderProps> = ({ title, path, handleCreatedSuccess }) => {

    const [ rubroNuevo, setNuevo ]       = useState<Rubro>(EmptyRubro);
    const [ loading, setLoading ]   = useState<boolean>(false);

    const { openErrorNotification } = useNotification();

    const handleChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        rubroNuevo[ e.target.name as 'no' ] = e.target.value;
        setNuevo( { ...rubroNuevo } );
    }
    

    const addOption = async () => {
        setLoading(true)
        const { result, message, payload } = await crearRubro( path, rubroNuevo );
        if( !result ) openErrorNotification( message );
        else { handleCreatedSuccess( payload! ); setNuevo(EmptyRubro); }
        setLoading(false)
    }

    return (
        <>
            <Typography variant='h6'>
                { title }
            </Typography>
            <Divider />
            <Grid
                container 
                spacing={1}
            >
                <Grid item xs={12} sm={8} md={10} >
                    <Stack spacing={1}>
                        <TextField 
                            size='small'
                            type='text'
                            value={ rubroNuevo.no }
                            onChange={ handleChange }
                            label="Número" 
                            name='no'
                            variant="outlined" 
                            fullWidth
                        /> 
                        <TextField 
                            size='small'
                            type='text'
                            value={ rubroNuevo.desc }
                            onChange={ handleChange }
                            label="Descripción"
                            name='desc' 
                            variant="outlined" 
                            fullWidth
                        />
                        <TextField 
                            select
                            size='small'
                            type='text'
                            value={ rubroNuevo.unidad }
                            onChange={ handleChange }
                            label="Unidad"
                            name='unidad' 
                            variant="outlined" 
                            fullWidth
                        >
                            <MenuItem value='mts'>Lineales</MenuItem>
                            <MenuItem value='mts²'>Cuadrados</MenuItem>
                            <MenuItem value='mts³'>Cúbicos</MenuItem>
                        </TextField>
                    </Stack>
                </Grid>
                
                <Grid item xs={12} sm={4} md={2} >
                    <LoadingButton
                        variant='contained'
                        loading={loading}
                        fullWidth
                        onClick={ addOption }
                        startIcon={ <AddIcon /> }
                        sx={{height: '100%'}}
                    >
                        Agregar
                    </LoadingButton>
                </Grid>
                
            </Grid>
        </>
    )
}
