import React, { useContext, useState } from 'react'
import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyPlanificador, Formulario, Planificador } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { APISelect } from '../../../../components/APISelect'
import { StringList } from '../../../../components/StringList'

type PlanificadorFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const PlanificadorForm : React.FC<PlanificadorFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ planificador, setPlanificador ] = useState<Planificador>( () => form.planificador ? form.planificador : {...EmptyPlanificador });
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        planificador[ e.target.name as 'nombres' ] = e.target.value;
        setPlanificador( { ...planificador } );
    }

    const handleArrayChange = (name : string, stringList : string[]) => {
        planificador[name as 'telefonos'] = [...stringList];
        setPlanificador( { ...planificador } );
    }

    const handleSelectChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        planificador.colegiado = e.target.value == '1' ? true : false;
        setPlanificador( { ...planificador } )
    }

    const registrarPlanificador = async() => {

        setLoading( true )
        const { result, message } = await actualizarFormulario<Planificador>( `${URLS.formulario}/actualizarplanificador/${form.no}`, planificador )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        handleFormChange2( {...form, planificador} )

        openSuccessNotification('Se actualizó el planificador')   
        setLoading( false )
    }

    return (
        <Stack 
            spacing={2}
            sx={{
                p: 1
            }}
        >
            

            <TextField 
                size='small'
                type='text'
            
                label="Nombres" 
                name='nombres'
                variant="outlined" 
                fullWidth
                value={ planificador.nombres }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='text'
                
                label="Apellidos" 
                name='apellidos'
                variant="outlined" 
                fullWidth
                value={ planificador.apellidos }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Dirección" 
                name="direccion" 
                variant="outlined" 
                fullWidth
                value={ planificador.direccion }
                onChange={ handleFormChange }
            />

            <StringList 
                stringList={ planificador.telefonos }
                handleArrayChange={ handleArrayChange }
                name='telefonos'
                label='Telefonos'
            />
            
            <TextField 
                size='small'
                type='text'
                
                label="Correo Electrónico" 
                name="email" 
                variant="outlined" 
                fullWidth
                value={ planificador.email }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='number'
                
                label="DPI" 
                name="dpi" 
                variant="outlined" 
                fullWidth
                value={ planificador.dpi }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Extendido en" 
                name="extendido" 
                variant="outlined" 
                fullWidth
                value={ planificador.extendido }
                onChange={ handleFormChange }
            />

            <TextField 
                size='small'
                type='text'
                
                label="Profesión" 
                name="profesion" 
                variant="outlined" 
                fullWidth
                value={ planificador.profesion }
                onChange={ handleFormChange }
            />

            <TextField
                select
                value={ planificador.colegiado ? '1' : '0' }
                label="Colegiado"
                onChange={ handleSelectChange }
            >
                <MenuItem value={'1'}>Si</MenuItem>
                <MenuItem value={'0'}>No</MenuItem>
            </TextField>

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarPlanificador }
                >
                    Guardar
                </LoadingButton> 

                <Button
                    onClick={ goToCancel }
                >
                    Cancelar
                </Button>
            </Stack>
            
        </Stack>
    )
}
