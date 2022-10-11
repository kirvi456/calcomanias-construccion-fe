import React, { useState, useEffect  } from 'react'
import { Formulario, } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { State } from '../Types/ReducerTypes'
import { ReciboForm } from '../Formularios/Recibo'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type ReciboCardProps = {
    icon: JSX.Element,
    label: string,
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}

export const ReciboCard : React.FC<ReciboCardProps> = ({ form, handleFormChange, icon, label }) => {

    const [ state, setState ] = useState<State>(() => { return form.recibo ? State.normal : State.unregistered; });

    const goToNormal = () => {
        setState(State.normal);
    }

    const goToCancel = () => {
        setState(form.recibo ? State.normal : State.unregistered)
    }

    useEffect(() => {
        setState(form.recibo ? State.normal : State.unregistered)
    }, [form])

    const getBody = () => {

        if( !form.recibo && state === State.normal ){
            return (
                <Stack
                    spacing={2}
                    alignItems='center'
                >
                    <Stack alignItems='center'>
                        <WarningIcon sx={{fontSize: 60}} />
                        <Typography>
                            Aún no se ha registrado un recibo
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
                                Aún no se ha registrado un recibo
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
                return (<ReciboForm 
                    form={form}
                    handleFormChange2 ={handleFormChange}
                    goToNormal={goToNormal}
                    goToCancel={goToCancel}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Recibo 7B No: </strong>{form.recibo!.no7b }
                        </Typography> 
                        <Typography textAlign='justify'> 
                            <strong>- Fecha Recibo: </strong>{ (new Date(form.recibo!.fecha)).toLocaleDateString() }
                        </Typography> 
                        <Typography textAlign='justify'> 
                            <strong>- Total: </strong> Q { form.recibo!.total }
                        </Typography> 
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
