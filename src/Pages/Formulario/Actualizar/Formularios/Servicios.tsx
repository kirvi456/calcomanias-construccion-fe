import React, { useContext, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Action, Actions, State, statePayload } from '../Types/ReducerTypes'
import { EmptyServicios, Servicios } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { APISelect } from '../../../../components/APISelect'
import { StringList } from '../../../../components/StringList'

type ServiciosFromProps = {
    formNo: number,
    state: statePayload<Servicios>,
    dispatch: React.Dispatch<Action<Servicios>>
}

export const ServiciosForm : React.FC<ServiciosFromProps> = ({ formNo, state, dispatch }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ servicios, setServicios ] = useState<Servicios>( state.object === undefined ? {...EmptyServicios} : {...state.object!} )
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        servicios[ e.target.name as 'aguaPotable' ] = e.target.value;
        setServicios( { ...servicios } );
    }

    const handleArrayChange = (name : string, stringList : string[]) => {
        servicios[name as 'otros'] = [...stringList];
        setServicios( { ...servicios } );
    }

    const registrarServicios = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Servicios>( `${URLS.formulario}/actualizarservicios/${formNo}`, servicios )
        
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
                    object: servicios
                } 
            }
        )

        openSuccessNotification('Se actualizó el servicios')   
        setLoading( false )
    }

    return (
        <Stack 
            spacing={2}
            sx={{
                p: 1
            }}
        >
            

            <APISelect 
                label="Agua Potable" 
                name='aguaPotable'
                value={ servicios.aguaPotable }
                onChange={ handleFormChange }
                url={URLS.aguapotable}
            />

            <APISelect 
                label="Drenaje Sanitario" 
                name='drenajeSanitario'
                value={ servicios.drenajeSanitario }
                onChange={ handleFormChange }
                url={URLS.drenajesanitario}
            />

            <APISelect 
                label="Drenaje Pluvial" 
                name='drenajePluvial'
                value={ servicios.drenajePluvial }
                onChange={ handleFormChange }
                url={URLS.drenajepluvial}
            />

            <StringList 
                stringList={ servicios.otros }
                handleArrayChange={ handleArrayChange }
                name='otros'
                label='Otros Servicios'
            />

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarServicios }
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
