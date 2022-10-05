import React, { useReducer } from 'react'
import { Tala } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { TalaForm } from '../Formularios/Tala'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type TalaCardProps = {
    formNo: number,
    tala : Tala | undefined,
    icon: JSX.Element,
    label: string
}

export const TalaCard : React.FC<TalaCardProps> = ({ formNo, tala, icon, label }) => {

    const initFunc = () : statePayload<Tala> => {
        return !tala 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: tala}
    }

    const initialState : statePayload<Tala> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Tala>, initialState, initFunc)


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
                                Aún no se ha registrado una tala
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
                return (<TalaForm 
                    formNo={formNo}
                    state={state}
                    dispatch={dispatch}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Se Realizará Tala de Árboles: </strong>{state.object!.necesario ? 'SI ' : 'NO '}
                            ( { state.object!.necesario ?  state.object!.tipo : '----' } )
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
