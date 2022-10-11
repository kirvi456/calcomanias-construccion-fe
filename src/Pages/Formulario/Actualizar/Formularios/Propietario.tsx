import React, { useContext, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyPropietario, Formulario, Propietario } from '../../../../models/Formulario'
import { StringList } from '../../../../components/StringList'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'

type PropietarioFromProps = {    
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void
    goToCancel: () => void
}

export const PropietarioForm : React.FC<PropietarioFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();

    const [ loading, setLoading ] = useState<boolean>(false)
    const [ propietario, setPropietario] = useState<Propietario>( () => form.propietario ? form.propietario : {...EmptyPropietario})


    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        propietario[ e.target.name as 'nombres' ] = e.target.value;
        setPropietario( { ...propietario } )
    }

    const handleArrayChange = (name :string, stringList : string[]) => {
        propietario[name as 'telefonos'] = [...stringList];
        setPropietario({...propietario});
    }

    const registrarPropietario = async() => {

        setLoading( true )
        const { result, message } = await actualizarFormulario<Propietario>( `${URLS.formulario}/actualizarpropietario/${form.no}`, propietario )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        

        handleFormChange2( {...form, propietario} )

        openSuccessNotification('Se actualizó el propietario')   
        setLoading( false )
        goToNormal();
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
            
                label="Nombres" 
                name='nombres'
                variant="outlined" 
                fullWidth
                value={ propietario.nombres }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='text'
                
                label="Apellidos" 
                name='apellidos'
                variant="outlined" 
                fullWidth
                value={ propietario.apellidos }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Dirección" 
                name="direccion" 
                variant="outlined" 
                fullWidth
                value={ propietario.direccion }
                onChange={ handleFormChange }
            />

            <StringList 
                stringList={ propietario.telefonos }
                handleArrayChange={ handleArrayChange }
                name='telefonos'
                label='Telefonos'
            />
            
            <TextField 
                size='small'
                type='text'
                
                label="Correo Electrónico" 
                name="email" 
                variant="outlined" 
                fullWidth
                value={ propietario.email }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='number'
                
                label="DPI" 
                name="dpi" 
                variant="outlined" 
                fullWidth
                value={ propietario.dpi }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Extendido en" 
                name="extendido" 
                variant="outlined" 
                fullWidth
                value={ propietario.extendido }
                onChange={ handleFormChange }
            />

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarPropietario }
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
