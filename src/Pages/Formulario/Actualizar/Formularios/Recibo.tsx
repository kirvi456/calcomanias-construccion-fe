import React, { useContext, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Action, Actions, State, statePayload } from '../Types/ReducerTypes'
import { EmptyRecibo, Recibo } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { useDatePicker } from '../../../../hooks/useDatePicker'

type ReciboFromProps = {
    formNo: number,
    state: statePayload<Recibo>,
    dispatch: React.Dispatch<Action<Recibo>>
}

export const ReciboForm : React.FC<ReciboFromProps> = ({ formNo, state, dispatch }) => {

    const { component, value } = useDatePicker({ label: 'Fecha Recibo' });

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ recibo, setRecibo ] = useState<Recibo>( state.object === undefined ? {...EmptyRecibo} : {...state.object!} )
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        recibo[ e.target.name as 'no7b' ] = Number(e.target.value);
        setRecibo( { ...recibo } );
    }



    const registrarRecibo = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Recibo>( `${URLS.formulario}/actualizarrecibo/${formNo}`, recibo )
        
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
                    object: recibo
                } 
            }
        )

        openSuccessNotification('Se actualizó el recibo')   
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
                type='number'
                
                label="Recibo 7B No." 
                name="no7b" 
                variant="outlined" 
                fullWidth
                value={ recibo.no7b }
                onChange={ handleFormChange }
            />
            
            {component}

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarRecibo }
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
