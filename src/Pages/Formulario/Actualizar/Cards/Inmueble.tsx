import React, { useEffect, useState } from 'react'
import { Formulario } from '../../../../models/Formulario'
import { Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { State } from '../Types/ReducerTypes'
import { InmuebleForm } from '../Formularios/Inmueble'

import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';

type InmuebleCardProps = {
    icon: JSX.Element,
    label: string,
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}

export const InmuebleCard : React.FC<InmuebleCardProps> = ({ form, handleFormChange, icon, label }) => {

    const [ state, setState ] = useState<State>(() => { return form.inmueble ? State.normal : State.unregistered; });

    const goToNormal = () => {
        setState(State.normal);
    }

    const goToCancel = () => {
        setState(form.inmueble ? State.normal : State.unregistered)
    }

    useEffect(() => {
        setState(form.inmueble ? State.normal : State.unregistered)
    }, [form])


    const getBody = () => {
        
        if( !form.inmueble && state === State.normal ){
            return (
                <Stack
                    spacing={2}
                    alignItems='center'
                >
                    <Stack alignItems='center'>
                        <WarningIcon sx={{fontSize: 60}} />
                        <Typography>
                            Aún no se ha registrado un inmueble
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
                                Aún no se ha registrado un inmueble
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
                return (<InmuebleForm 
                    form={form}
                    handleFormChange2 ={handleFormChange}
                    goToNormal={goToNormal}
                    goToCancel={goToCancel}
                />)

            case State.normal:
                return (
                    <Stack sx={{position: 'relative'}} spacing={1}>
                        <Typography textAlign='justify'> 
                            <strong>- Dirección: </strong>{form.inmueble!.direccion}
                        </Typography>
                        <Typography> 
                            <strong>- Finca: </strong>{form.inmueble!.noFinca}
                            <strong> Folio: </strong>{form.inmueble!.folio} 
                            <strong> Libro: </strong>{form.inmueble!.libro} 
                        </Typography>
                        <Typography> 
                            <strong>- Frente: </strong>{form.inmueble!.frente}mts
                            <strong> Fondo: </strong>{form.inmueble!.fondo}mts
                            <strong> Área: </strong>{form.inmueble!.area}mts²
                        </Typography>
                        <Typography> 
                            <strong>- Terreno Irregular: </strong>{form.inmueble!.irregular ? 'SI' : 'NO'}
                            
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
