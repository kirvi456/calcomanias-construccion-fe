import React, { useContext, useState } from 'react'
import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Action, Actions, State, statePayload } from '../Types/ReducerTypes'
import { EmptyEjecutor, Ejecutor } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { APISelect } from '../../../../components/APISelect'
import { StringList } from '../../../../components/StringList'

type EjecutorFromProps = {
    formNo: number,
    state: statePayload<Ejecutor>,
    dispatch: React.Dispatch<Action<Ejecutor>>
}

export const EjecutorForm : React.FC<EjecutorFromProps> = ({ formNo, state, dispatch }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ ejecutor, setEjecutor ] = useState<Ejecutor>( state.object === undefined ? {...EmptyEjecutor} : {...state.object!} )
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        ejecutor[ e.target.name as 'nombres' ] = e.target.value;
        setEjecutor( { ...ejecutor } );
    }

    const handleArrayChange = (name : string, stringList : string[]) => {
        ejecutor[name as 'telefonos'] = [...stringList];
        setEjecutor( { ...ejecutor } );
    }

    const handleSelectChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        ejecutor.colegiado = e.target.value == '1' ? true : false;
        setEjecutor( { ...ejecutor } )
    }

    const registrarEjecutor = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Ejecutor>( `${URLS.formulario}/actualizarejecutor/${formNo}`, ejecutor )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        dispatch(            
            {
                type: Actions.save,
                payload: {
                    state: State.normal,
                    object: ejecutor
                } 
            }
        )

        openSuccessNotification('Se actualizó el ejecutor')   
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
                value={ ejecutor.nombres }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='text'
                
                label="Apellidos" 
                name='apellidos'
                variant="outlined" 
                fullWidth
                value={ ejecutor.apellidos }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Dirección" 
                name="direccion" 
                variant="outlined" 
                fullWidth
                value={ ejecutor.direccion }
                onChange={ handleFormChange }
            />

            <StringList 
                stringList={ ejecutor.telefonos }
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
                value={ ejecutor.email }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='number'
                
                label="DPI" 
                name="dpi" 
                variant="outlined" 
                fullWidth
                value={ ejecutor.dpi }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Extendido en" 
                name="extendido" 
                variant="outlined" 
                fullWidth
                value={ ejecutor.extendido }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Profesión" 
                name="profesion" 
                variant="outlined" 
                fullWidth
                value={ ejecutor.profesion }
                onChange={ handleFormChange }
            />

            <TextField
                select
                value={ ejecutor.colegiado ? '1' : '0' }
                label="Colegiado"
                onChange={ handleSelectChange }
            >
                <MenuItem value={'1'}>Si</MenuItem>
                <MenuItem value={'0'}>No</MenuItem>
            </TextField>

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarEjecutor }
                >
                    Guardar
                </LoadingButton> 

                <Button
                    onClick={ () => dispatch({type: Actions.cancel, payload: { 
                        state: State.unregistered,
                        object: state.object
                    }}) }
                >
                    Cancelar
                </Button>
            </Stack>
            
        </Stack>
    )
}
