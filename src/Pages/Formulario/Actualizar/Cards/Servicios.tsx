import React, { useReducer } from 'react'
import { Servicios } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { ServiciosForm } from '../Formularios/Servicios'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';


type ServiciosCardProps = {
    formNo: number,
    servicios : Servicios | undefined,
    icon: JSX.Element,
    label: string
}

export const ServiciosCard : React.FC<ServiciosCardProps> = ({ formNo, servicios, icon, label }) => {

    const initFunc = () : statePayload<Servicios> => {
        return !servicios 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: servicios}
    }

    const initialState : statePayload<Servicios> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Servicios>, initialState, initFunc)


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
                                Aún no se ha registrado una servicios
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
                return (<ServiciosForm 
                    formNo={formNo}
                    state={state}
                    dispatch={dispatch}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Agua Potable: </strong>{state.object!.aguaPotable}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Red de Drenaje Sanitario: </strong>{state.object!.drenajeSanitario}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Red de Drenaje Pluvial: </strong>{state.object!.drenajePluvial}
                        </Typography>
                        
                        {
                            state.object!.otros.length > 0 &&
                            <Typography textAlign='justify'> 
                                <strong>- Otros: </strong>
                            </Typography>
                        }
                        <Stack sx={{pl:1}}>
                            {state.object!.otros.map(
                                (el, index) => (
                                    <Typography 
                                        variant='caption' 
                                        key={index} 
                                        textAlign='justify'
                                    > 
                                        {index + 1}. { el } 
                                    </Typography> 
                                )
                            )}
                        </Stack>
                            
                        

                        
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
