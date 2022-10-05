import React, { useReducer } from 'react'
import { Formulario, Propietario } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { PropietarioReducer } from '../Reducers/Propietario'
import { PropietarioActions, PropietatioState } from '../Types/Propietario'
import { PropietarioForm } from '../Formularios/Propietario'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';


type PropietarioCardProps = {
    formNo: number,
    propietario : Propietario | undefined,
    icon: JSX.Element,
    label: string,
    form: Formulario,
    setForm: React.Dispatch<React.SetStateAction<Formulario | undefined>>,
    handleFormChange : ( nuevo : Formulario ) => void
}


export const PropietarioCard : React.FC<PropietarioCardProps> = ({ formNo, propietario, form, setForm, handleFormChange, icon, label }) => {

    

    const initFunc = () => {
        console.log('propietario', propietario)
        console.log('form.propietario', form.propietario)
        return !propietario 
            ? {state: PropietatioState.unregistered, propietario: undefined}
            : {state: PropietatioState.normal, propietario}
    }

    const initialState = {state: PropietatioState.unregistered, propietario: undefined}

    const [state, dispatch] = useReducer(PropietarioReducer, initialState, initFunc)


    const getBody = () => {
        switch( state.state ){
            case PropietatioState.unregistered:
                return (
                    <Stack
                        spacing={2}
                        alignItems='center'
                    >
                        <Stack alignItems='center'>
                            <WarningIcon sx={{fontSize: 60}} />
                            <Typography>
                                Aún no se ha registrado un propietario
                            </Typography>
                        </Stack>
                        <Button
                            variant='contained'
                            onClick={ () => dispatch({type: PropietarioActions.goregistering, payload: {state: PropietatioState.registering, propietario: state.propietario}}) }
                        >
                            Registrar
                        </Button>
                    </Stack> 
                )

            case PropietatioState.registering:
                return (<PropietarioForm 
                    formNo={formNo}
                    state={state}
                    dispatch={dispatch}
                    form={form}
                    setForm={setForm}
                    handleFormChange2 ={handleFormChange}
                />)

            case PropietatioState.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Nombres: </strong>{state.propietario!.nombres} {state.propietario!.apellidos} 
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Dirección: </strong>{state.propietario!.direccion} 
                        </Typography>
                        <Typography> 
                            <strong>- DPI: </strong>{state.propietario!.dpi} ({state.propietario!.extendido}) 
                        </Typography>
                        <Typography> 
                            <strong>- Email: </strong>{state.propietario!.email}
                        </Typography>
                        <Typography> 
                            <strong>- Teléfonos: </strong>{state.propietario!.telefonos.join(', ')}
                        </Typography >
                        <Tooltip title="Editar" sx={{position: 'absolute', bottom: 0, right: 0}}>
                            <IconButton 
                                aria-label="editar"
                                onClick={ () => dispatch({type: PropietarioActions.goregistering, payload: {state: PropietatioState.registering, propietario: state.propietario}}) }
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
                maxWidth: '90%'
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
