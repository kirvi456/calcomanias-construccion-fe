import React, { useReducer } from 'react'
import { Planificador } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { PlanificadorForm } from '../Formularios/Planificador'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type PlanificadorCardProps = {
    formNo: number,
    planificador : Planificador | undefined,
    icon: JSX.Element,
    label: string
}

export const PlanificadorCard : React.FC<PlanificadorCardProps> = ({ formNo, planificador, icon, label }) => {

    const initFunc = () : statePayload<Planificador> => {
        return !planificador 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: planificador}
    }

    const initialState : statePayload<Planificador> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Planificador>, initialState, initFunc)


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
                                Aún no se ha registrado una planificador
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
                return (<PlanificadorForm 
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
