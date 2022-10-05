import React, { useContext, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Action, Actions, State, statePayload } from '../Types/ReducerTypes'
import { EmptyCalcomania, Calcomania } from '../../../../models/Calcomania'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'
import { useDatePicker } from '../../../../hooks/useDatePicker'


type CalcomaniaFromProps = {
    formNo: number,
    state: statePayload<Calcomania>,
    dispatch: React.Dispatch<Action<Calcomania>>
}

export const CalcomaniaForm : React.FC<CalcomaniaFromProps> = ({ formNo, state, dispatch }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ calcomania, setCalcomania ] = useState<Calcomania>( state.object === undefined ? {...EmptyCalcomania} : {...state.object!} )
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        calcomania[ e.target.name as 'direccion' ] = e.target.value;
        setCalcomania( { ...calcomania } );
    }

    const { component, value } = useDatePicker({label: 'Fecha Vencimiento'});

    const registrarCalcomania = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Calcomania>( `${URLS.formulario}/actualizarcalcomania/${formNo}`, calcomania )
        
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
                    object: calcomania
                } 
            }
        )

        openSuccessNotification('Se actualizó el calcomania')   
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
                
                label="Dirección" 
                name='direccion'
                variant="outlined" 
                fullWidth
                value={ calcomania.direccion }
                onChange={ handleFormChange }
            /> 

            { component }
            

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarCalcomania }
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
