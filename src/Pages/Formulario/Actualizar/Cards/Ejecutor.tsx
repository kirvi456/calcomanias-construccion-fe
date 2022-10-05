import React, { useReducer } from 'react'
import { Ejecutor } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { EjecutorForm } from '../Formularios/Ejecutor'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type EjecutorCardProps = {
    formNo: number,
    ejecutor : Ejecutor | undefined,
    icon: JSX.Element,
    label: string
}

export const EjecutorCard : React.FC<EjecutorCardProps> = ({ formNo, ejecutor, icon, label }) => {

    const initFunc = () : statePayload<Ejecutor> => {
        return !ejecutor 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: ejecutor}
    }

    const initialState : statePayload<Ejecutor> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Ejecutor>, initialState, initFunc)


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
                                Aún no se ha registrado una ejecutor
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
                return (<EjecutorForm 
                    formNo={formNo}
                    state={state}
                    dispatch={dispatch}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Nombres: </strong>{state.object!.nombres} {state.object!.apellidos} 
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Profesión: </strong>{state.object!.profesion} ({state.object!.colegiado ? 'Colegiado' : 'No Colegiado'}) 
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Dirección: </strong>{state.object!.direccion} 
                        </Typography>
                        <Typography> 
                            <strong>- DPI: </strong>{state.object!.dpi} ({state.object!.extendido}) 
                        </Typography>
                        <Typography> 
                            <strong>- Email: </strong>{state.object!.email}
                        </Typography>
                        <Typography> 
                            <strong>- Teléfonos: </strong>{state.object!.telefonos.join(', ')}
                        </Typography >
                        
                        
                        
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
