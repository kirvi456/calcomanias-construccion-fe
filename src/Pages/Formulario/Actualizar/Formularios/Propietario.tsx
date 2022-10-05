import React, { useContext, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { PropietarioAction, PropietarioActions, PropietatioState, statePayload } from '../Types/Propietario'
import { EmptyPropietario, Formulario, Propietario } from '../../../../models/Formulario'
import { StringList } from '../../../../components/StringList'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'

type PropietarioFromProps = {
    formNo: number,
    state: statePayload,
    dispatch: React.Dispatch<PropietarioAction>,
    form: Formulario,
    setForm: React.Dispatch<React.SetStateAction<Formulario | undefined>>,
    handleFormChange2 : ( nuevo : Formulario ) => void
}

export const PropietarioForm : React.FC<PropietarioFromProps> = ({ formNo, state, form, handleFormChange2, setForm, dispatch }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ propietario, setPropietario ] = useState<Propietario>( state.propietario === undefined ? {...EmptyPropietario} : {...state.propietario!} )
    const [ loading, setLoading ] = useState<boolean>(false)
    
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
        const { result, message, payload } = await actualizarFormulario<Propietario>( `${URLS.formulario}/actualizarpropietario/${formNo}`, propietario )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        dispatch(            
            {
                type:PropietarioActions.save,
                payload: {
                    state: PropietatioState.normal,
                    propietario
                } 
            }
        )

        console.log('el supuesto spred', propietario)

        handleFormChange2({...form, propietario : {...propietario}})

        openSuccessNotification('Se actualizó el propietario')   
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
                    onClick={ () => dispatch({type: PropietarioActions.cancel, payload: { 
                        state: PropietatioState.unregistered,
                        propietario: state.propietario
                    }}) }
                >
                    Cancelar
                </Button>
            </Stack>
            
        </Stack>
    )
}
