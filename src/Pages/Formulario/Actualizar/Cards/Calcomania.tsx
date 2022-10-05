import React, { useReducer } from 'react'
import { Calcomania } from '../../../../models/Calcomania'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { CalcomaniaForm } from '../Formularios/Calcomania'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import { Inmueble, Propietario, Recibo } from '../../../../models/Formulario'

type CalcomaniaCardProps = {
    formNo: number,
    calcomania : Calcomania | undefined,
    inmueble : Inmueble | undefined,
    recibo : Recibo | undefined,
    propietario : Propietario | undefined,
    icon: JSX.Element,
    label: string
}

export const CalcomaniaCard : React.FC<CalcomaniaCardProps> = ({ 
    formNo, 
    calcomania,
    inmueble,
    recibo,
    propietario,
    icon, 
    label }) => {

    const initFunc = () : statePayload<Calcomania> => {
        return !calcomania 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: calcomania}
    }

    const initialState : statePayload<Calcomania> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Calcomania>, initialState, initFunc)


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
                                Aún no se ha registrado una calcomania
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
                return (<CalcomaniaForm 
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

    if( !propietario ) return(
        <Stack
            spacing={2}
            alignItems='center'
        >
            <Stack alignItems='center'>
                <WarningIcon sx={{fontSize: 60}} />
                <Typography>
                    Es necesario registrar el Propietario
                </Typography>
            </Stack>
        </Stack> 
    )

    if( !inmueble ) return(
        <Stack
            spacing={2}
            alignItems='center'
        >
            <Stack alignItems='center'>
                <WarningIcon sx={{fontSize: 60}} />
                <Typography>
                    Es necesario registrar el Inmueble
                </Typography>
            </Stack>
        </Stack> 
    )

    if( !recibo ) return(
        <Stack
            spacing={2}
            alignItems='center'
        >
            <Stack alignItems='center'>
                <WarningIcon sx={{fontSize: 60}} />
                <Typography>
                    Es necesario registrar el Recibo 7B
                </Typography>
            </Stack>
        </Stack> 
    )

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
