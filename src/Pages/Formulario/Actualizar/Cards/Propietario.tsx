import React, { useEffect, useState } from 'react'
import { Formulario } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { PropietarioForm } from '../Formularios/Propietario'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import { State } from '../Types/ReducerTypes'


type PropietarioCardProps = {
    icon: JSX.Element,
    label: string,
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}


export const PropietarioCard : React.FC<PropietarioCardProps> = ({ form, handleFormChange, icon, label }) => {

    const [ state, setState ] = useState<State>(form.propietario ? State.normal : State.unregistered );

    const goToNormal = () => {
        setState(State.normal);
    }
    
    const goToCancel = () => {
        setState(form.propietario ? State.normal : State.unregistered);
    }

    useEffect(() => {
        setState(form.propietario ? State.normal : State.unregistered)
    }, [form])

    const getBody = () => {

        if(!form.propietario && state === State.normal ){
            return <Stack
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
                    onClick={ () => setState(State.registering) }
                >
                    Registrar
                </Button>
            </Stack> 
        }

        switch( state ){
            case State.unregistered:
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
                            onClick={ () => setState(State.registering) }
                        >
                            Registrar
                        </Button>
                    </Stack> 
                )

            case State.registering:
                return (
                    <PropietarioForm 
                        form={form}
                        handleFormChange2 ={handleFormChange}
                        goToNormal={goToNormal}
                        goToCancel={goToCancel}
                    />
                )

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Nombres: </strong>{form.propietario!.nombres} {form.propietario!.apellidos} 
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Dirección: </strong>{form.propietario!.direccion} 
                        </Typography>
                        <Typography> 
                            <strong>- DPI: </strong>{form.propietario!.dpi} ({form.propietario!.extendido}) 
                        </Typography>
                        <Typography> 
                            <strong>- Email: </strong>{form.propietario!.email}
                        </Typography>
                        <Typography> 
                            <strong>- Teléfonos: </strong>{form.propietario!.telefonos.join(', ')}
                        </Typography >
                        <Tooltip title="Editar" sx={{position: 'absolute', bottom: 0, right: 0}}>
                            <IconButton 
                                aria-label="editar"
                                onClick={ () => setState(State.registering) }
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
