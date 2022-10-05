import React, { useReducer } from 'react'
import { Inmueble } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { InmuebleForm } from '../Formularios/Inmueble'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type InmuebleCardProps = {
    formNo: number,
    inmueble : Inmueble | undefined,
    icon: JSX.Element,
    label: string
}

export const InmuebleCard : React.FC<InmuebleCardProps> = ({ formNo, inmueble, icon, label }) => {

    const initFunc = () : statePayload<Inmueble> => {
        return !inmueble 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: inmueble}
    }

    const initialState : statePayload<Inmueble> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Inmueble>, initialState, initFunc)


    const getBody = () => {
        switch( state.state ){
            case State.unregistered:
                return (
                    <Stack
                        spacing={2}
                        alignItems='center'
                    >
                        <Stack alignItems='center'>
                            <WarningIcon sx={{fontSize: 60}} />
                            <Typography>
                                Aún no se ha registrado un inmueble
                            </Typography>
                        </Stack>
                        <Button
                            variant='contained'
                            onClick={ () => dispatch({type: Actions.goregistering, payload: {state: State.registering, object: state.object}}) }
                        >
                            Registrar
                        </Button>
                    </Stack> 
                )

            case State.registering:
                return (<InmuebleForm 
                    formNo={formNo}
                    state={state}
                    dispatch={dispatch}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Dirección: </strong>{state.object!.direccion}
                        </Typography>
                        <Typography> 
                            <strong>- Finca: </strong>{state.object!.noFinca}
                            <strong> Folio: </strong>{state.object!.folio} 
                            <strong> Libro: </strong>{state.object!.libro} 
                        </Typography>
                        <Typography> 
                            <strong>- Frente: </strong>{state.object!.frente}mts
                            <strong> Fondo: </strong>{state.object!.fondo}mts
                            <strong> Área: </strong>{state.object!.area}mts²
                        </Typography>
                        <Typography> 
                            <strong>- Terreno Irregular: </strong>{state.object!.irregular ? 'SI' : 'NO'}
                            
                        </Typography>

                        <Tooltip title="Editar" sx={{position: 'absolute', bottom: 0, right: 0}}>
                            <IconButton 
                                aria-label="editar"
                                onClick={ () => dispatch({type: Actions.goregistering, payload: {state: State.registering, object: state.object}}) }
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )

            default: return (<></>)
        }
    }

    return (
        <Paper
            sx={{
                p: 2,
                width: '800px',
                maxWidth: '90%',
            }}
        >
        
            <Stack
                spacing={2}
            >
                <Stack>
                    <Stack direction='row' spacing={1} sx={{mt: 1, mb: 1 }}>
                        { icon }
                        <Typography
                            variant='h5'
                        >
                            { label }
                        </Typography>
                    </Stack>
                    <Divider />
                </Stack>                
                    {
                        getBody()                    
                    }
            </Stack>
        </Paper>
    )
}
