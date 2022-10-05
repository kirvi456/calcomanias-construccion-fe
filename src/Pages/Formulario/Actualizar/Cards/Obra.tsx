import React, { useReducer } from 'react'
import { Obra } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { InmuebleReducer } from '../Reducers/ActualizarFormReducer'
import { Actions, State, statePayload } from '../Types/ReducerTypes'
import { ObraForm } from '../Formularios/Obra'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type ObraCardProps = {
    formNo: number,
    obra : Obra | undefined,
    icon: JSX.Element,
    label: string
}

export const ObraCard : React.FC<ObraCardProps> = ({ formNo, obra, icon, label }) => {

    const initFunc = () : statePayload<Obra> => {
        return !obra 
            ? {state: State.unregistered, object: undefined}
            : {state: State.normal, object: obra}
    }

    const initialState : statePayload<Obra> = {state: State.unregistered, object: undefined}

    const [state, dispatch] = useReducer(InmuebleReducer<Obra>, initialState, initFunc)


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
                                Aún no se ha registrado una obra
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
                return (<ObraForm 
                    formNo={formNo}
                    state={state}
                    dispatch={dispatch}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Tipo de Obra: </strong>{state.object!.tipo}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Área a construir: </strong>{state.object!.area}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Movimiento de tierra: </strong>{state.object!.movimientoTierra ? 'SI ' : 'NO '}
                            ( {state.object!.metrosCubicos } mts³ )
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Demolición: </strong>{state.object!.demolicion ? 'SI ' : 'NO '} 
                            ( {state.object!.metrosCuadrados } mts² )
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Tipo de uso: </strong>{state.object!.tipoUso}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Área a construir: </strong>{state.object!.costoEstimado} meses
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Niveles y/o Pisos: </strong>{state.object!.niveles}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Costo Estimado: </strong>Q {state.object!.costoEstimado}
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
