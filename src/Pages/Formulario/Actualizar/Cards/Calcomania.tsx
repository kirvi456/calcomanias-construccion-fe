import React, { useState, useEffect } from 'react'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { State } from '../Types/ReducerTypes'
import { CalcomaniaForm } from '../Formularios/Calcomania/Calcomania'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import { Formulario } from '../../../../models/Formulario'
import { CalcomaniaPDF } from '../Formularios/Calcomania/CalcomaniaPDF'

type CalcomaniaCardProps = {
    icon: JSX.Element,
    label: string,
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}

export const CalcomaniaCard : React.FC<CalcomaniaCardProps> = ({ form, handleFormChange, icon, label }) => {
    
    
    const [ state, setState ] = useState<State>(() => { return form.calcomania ? State.normal : State.unregistered; });

    const goToNormal = () => {
        setState(State.normal);
    }

    const goToCancel = () => {
        setState(form.calcomania ? State.normal : State.unregistered)
    }

    useEffect(() => {
        setState(form.calcomania ? State.normal : State.unregistered)
    }, [form])


    const getBody = () => {

        if( !form.calcomania && state === State.normal ){
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
                                Aún no se ha registrado una calcomania
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
                return (<CalcomaniaForm 
                    form={form}
                    handleFormChange2 ={handleFormChange}
                    goToNormal={goToNormal}
                    goToCancel={goToCancel}
                />)

            case State.normal:
                return (
                    <CalcomaniaPDF form={ form } />
                )

            default: return (<></>)
        }
    }

    if( !form.propietario ) return(
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

    if( !form.inmueble ) return(
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
    
    if( !form.obra ) return(
        <Stack
            spacing={2}
            alignItems='center'
        >
            <Stack alignItems='center'>
                <WarningIcon sx={{fontSize: 60}} />
                <Typography>
                    Es necesario registrar la obra
                </Typography>
            </Stack>
        </Stack> 
    )

    if( !form.recibo ) return(
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
