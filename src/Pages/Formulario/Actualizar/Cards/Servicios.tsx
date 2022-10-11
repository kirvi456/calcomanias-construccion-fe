import React, { useEffect, useState } from 'react'
import { Formulario } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { State } from '../Types/ReducerTypes'
import { ServiciosForm } from '../Formularios/Servicios'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';


type ServiciosCardProps = {
    icon: JSX.Element,
    label: string,
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}

export const ServiciosCard : React.FC<ServiciosCardProps> = ({ form, handleFormChange, icon, label }) => {

    const [ state, setState ] = useState<State>(() => { return form.servicios ? State.normal : State.unregistered; });

    const goToNormal = () => {
        setState(State.normal);
    }

    const goToCancel = () => {
        setState(form.servicios ? State.normal : State.unregistered)
    }

    useEffect(() => {
        setState(form.servicios ? State.normal : State.unregistered)
    }, [form])


    const getBody = () => {

        if( !form.servicios && state === State.normal ){
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
                        onClick={ () => setState(State.registering) } 
                    >
                        Registrar
                    </Button>
                </Stack> 
            )
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
                                Aún no se ha registrado una servicios
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
                return (<ServiciosForm 
                    form={form}
                    handleFormChange2 ={handleFormChange}
                    goToNormal={goToNormal}
                    goToCancel={goToCancel}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Agua Potable: </strong>{form.servicios!.aguaPotable}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Red de Drenaje Sanitario: </strong>{form.servicios!.drenajeSanitario}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Red de Drenaje Pluvial: </strong>{form.servicios!.drenajePluvial}
                        </Typography>
                        
                        {
                            form.servicios!.otros.length > 0 &&
                            <Typography textAlign='justify'> 
                                <strong>- Otros: </strong>
                            </Typography>
                        }
                        <Stack sx={{pl:1}}>
                            {form.servicios!.otros.map(
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
