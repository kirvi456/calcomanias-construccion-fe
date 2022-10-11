import React, { useContext, useState } from 'react'
import { Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyInmueble, Formulario, Inmueble } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'

type InmuebleFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const InmuebleForm : React.FC<InmuebleFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ inmueble, setInmueble ] = useState<Inmueble>( () => form.inmueble ? form.inmueble : {...EmptyInmueble });
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        inmueble[ e.target.name as 'direccion' ] = e.target.value;
        setInmueble( { ...inmueble } )
    }

    const handleSelectChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        inmueble.irregular = e.target.value == '1' ? true : false;
        setInmueble( { ...inmueble } )
    }

    const registrarInmueble = async() => {

        setLoading( true )
        const { result, message } = await actualizarFormulario<Inmueble>( `${URLS.formulario}/actualizarimnueble/${form.no}`, inmueble )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        handleFormChange2( {...form, inmueble} )

        openSuccessNotification('Se actualizó el inmueble')   
        setLoading( false )
    }

    return (
        <Stack 
            spacing={2}
            sx={{
                p: 1
            }}
        >
            <TextField 
                size='small'
                type='text'
            
                label="Direccion" 
                name='direccion'
                variant="outlined" 
                fullWidth
                value={ inmueble.direccion }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='text'
            
                label="Finca" 
                name='noFinca'
                variant="outlined" 
                fullWidth
                value={ inmueble.noFinca }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='text'
            
                label="Folio" 
                name='folio'
                variant="outlined" 
                fullWidth
                value={ inmueble.folio }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
            
                label="Libro" 
                name='libro'
                variant="outlined" 
                fullWidth
                value={ inmueble.libro }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='number'
            
                label="Area" 
                name='area'
                variant="outlined" 
                fullWidth
                value={ inmueble.area }
                onChange={ handleFormChange }
                InputProps={{
                    endAdornment: <InputAdornment position="start">mts²</InputAdornment>,
                }}
            /> 

            <TextField 
                size='small'
                type='number'
            
                label="Frente" 
                name='frente'
                variant="outlined" 
                fullWidth
                value={ inmueble.frente }
                onChange={ handleFormChange }
                InputProps={{
                    endAdornment: <InputAdornment position="start">mts</InputAdornment>,
                }}
            /> 

            <TextField 
                size='small'
                type='number'
            
                label="Fondo" 
                name='fondo'
                variant="outlined" 
                fullWidth
                value={ inmueble.fondo }
                onChange={ handleFormChange }
                InputProps={{
                    endAdornment: <InputAdornment position="start">mts</InputAdornment>,
                }}
            /> 

            <TextField
                select
                value={ inmueble.irregular ? '1' : '0' }
                label="Terreno Irregular"
                onChange={ handleSelectChange }
            >
                <MenuItem value={'1'}>Si</MenuItem>
                <MenuItem value={'0'}>No</MenuItem>
            </TextField>

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarInmueble }
                >
                    Guardar
                </LoadingButton> 

                <Button
                    onClick={ goToCancel }
                >
                    Cancelar
                </Button>
            </Stack>
            
        </Stack>
    )
}
