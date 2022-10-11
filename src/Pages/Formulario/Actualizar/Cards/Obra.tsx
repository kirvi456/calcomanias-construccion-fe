import React, { useState, useEffect } from 'react'
import { Formulario, Obra } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { State } from '../Types/ReducerTypes'
import { ObraForm } from '../Formularios/Obra/Obra'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type ObraCardProps = {
    icon: JSX.Element,
    label: string,
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}

export const ObraCard : React.FC<ObraCardProps> = ({ form, handleFormChange, icon, label }) => {

    const [ state, setState ] = useState<State>(() => { return form.obra ? State.normal : State.unregistered; });

    const goToNormal = () => {
        setState(State.normal);
    }

    const goToCancel = () => {
        setState(form.obra ? State.normal : State.unregistered)
    }

    useEffect(() => {
        setState(form.obra ? State.normal : State.unregistered)
    }, [form])


    const getBody = () => {

        if( !form.obra && state === State.normal ){
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
                                Aún no se ha registrado una obra
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
                return (<ObraForm 
                    form={form}
                    handleFormChange2 ={handleFormChange}
                    goToNormal={goToNormal}
                    goToCancel={goToCancel}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Tipo de Obra: </strong>{form.obra!.tipo}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Área a construir: </strong>{form.obra!.area}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Movimiento de tierra: </strong>{form.obra!.movimientoTierra ? 'SI ' : 'NO '}
                            ( {form.obra!.metrosCubicos } mts³ )
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Demolición: </strong>{form.obra!.demolicion ? 'SI ' : 'NO '} 
                            ( {form.obra!.metrosCuadrados } mts² )
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Tipo de uso: </strong>{form.obra!.tipoUso}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Área a construir: </strong>{form.obra!.costoEstimado} meses
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Niveles y/o Pisos: </strong>{form.obra!.niveles.join(', ')}
                        </Typography>
                        <Typography textAlign='justify'> 
                            <strong>- Costo Estimado: </strong>Q {form.obra!.costoEstimado}
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
