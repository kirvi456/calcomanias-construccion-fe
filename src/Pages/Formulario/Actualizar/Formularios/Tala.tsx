import React, { useContext, useState } from 'react'
import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Action, Actions, State, statePayload } from '../Types/ReducerTypes'
import { EmptyTala, Tala } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { APISelect } from '../../../../components/APISelect'

type TalaFromProps = {
    formNo: number,
    state: statePayload<Tala>,
    dispatch: React.Dispatch<Action<Tala>>
}

export const TalaForm : React.FC<TalaFromProps> = ({ formNo, state, dispatch }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ tala, setTala ] = useState<Tala>( state.object === undefined ? {...EmptyTala} : {...state.object!} )
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        tala[ e.target.name as 'tipo' ] = e.target.value;
        setTala( { ...tala } );
    }


    const handleSelectChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        tala.necesario = e.target.value == '1' ? true : false;
        if( !tala.necesario ) tala.tipo = 'No necesario';
        setTala( { ...tala } )
    }

    const registrarTala = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Tala>( `${URLS.formulario}/actualizartala/${formNo}`, tala )
        
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
                    object: tala
                } 
            }
        )

        openSuccessNotification('Se actualizó el tala')   
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
                select
                value={ tala.necesario ? '1' : '0' }
                label="Se Realizará Tala"
                onChange={ handleSelectChange }
            >
                <MenuItem value={'1'}>Si</MenuItem>
                <MenuItem value={'0'}>No</MenuItem>
            </TextField>
            
            <APISelect 
                label="Quien Realizará" 
                name='tipo'
                value={ tala.necesario ? tala.tipo : '' }
                onChange={ handleFormChange }
                url={ URLS.tipotala }
                disabled={ !tala.necesario }
            />
            

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarTala }
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
