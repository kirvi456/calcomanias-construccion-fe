import React, { useState } from 'react'
import { Typography, Divider, Grid, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { crearTipoObra } from '../../services/cruds'
import { useNotification } from '../../hooks/useNotification'
import { ItemSchema } from './types'
import AddIcon from '@mui/icons-material/Add';


type CrudCardHeaderProps = {
    title : string,
    path  : string,
    handleCreatedSuccess: (result: ItemSchema) => void
}

export const CrudCardHeader : React.FC<CrudCardHeaderProps> = ({ title, path, handleCreatedSuccess }) => {

    const [ nuevo, setNuevo ]       = useState<string>('');
    const [ loading, setLoading ]   = useState<boolean>(false);

    const { openErrorNotification } = useNotification();


    

    const addOption = async () => {
        setLoading(true)
        const { result, message, payload } = await crearTipoObra( path, { nombre : nuevo } );
        if( !result ) openErrorNotification( message );
        else handleCreatedSuccess( payload! )
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
                    <TextField 
                        size='small'
                        type='text'
                        value={ nuevo }
                        onChange={(e) => { setNuevo(e.target.value)} }
                        label="Agregar" 
                        variant="outlined" 
                        fullWidth
                    /> 
                </Grid>
                
                <Grid item xs={12} sm={4} md={2} >
                    <LoadingButton
                        variant='contained'
                        loading={loading}
                        fullWidth
                        onClick={ addOption }
                        startIcon={ <AddIcon /> }
                    >
                        Agregar
                    </LoadingButton>
                </Grid>
                
            </Grid>
        </>
    )
}
