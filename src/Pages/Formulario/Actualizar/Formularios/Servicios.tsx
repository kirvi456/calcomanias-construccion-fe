import React, { useContext, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyServicios, Formulario, Servicios } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { APISelect } from '../../../../components/APISelect'
import { StringList } from '../../../../components/StringList'

type ServiciosFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const ServiciosForm : React.FC<ServiciosFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ servicios, setServicios ] = useState<Servicios>( () => form.servicios ? form.servicios : {...EmptyServicios });
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        servicios[ e.target.name as 'aguaPotable' ] = e.target.value;
        setServicios( { ...servicios } );
    }

    const handleArrayChange = (name : string, stringList : string[]) => {
        servicios[name as 'otros'] = [...stringList];
        setServicios( { ...servicios } );
    }

    const registrarServicios = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Servicios>( `${URLS.formulario}/actualizarservicios/${form.no}`, servicios )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        handleFormChange2( {...form, servicios} )

        openSuccessNotification('Se actualizó el servicios')   
        setLoading( false )
    }

    return (
        <Stack 
            spacing={2}
            sx={{
                p: 1
            }}
        >
            

            <APISelect 
                label="Agua Potable" 
                name='aguaPotable'
                value={ servicios.aguaPotable }
                onChange={ handleFormChange }
                url={URLS.aguapotable}
            />

            <APISelect 
                label="Drenaje Sanitario" 
                name='drenajeSanitario'
                value={ servicios.drenajeSanitario }
                onChange={ handleFormChange }
                url={URLS.drenajesanitario}
            />

            <APISelect 
                label="Drenaje Pluvial" 
                name='drenajePluvial'
                value={ servicios.drenajePluvial }
                onChange={ handleFormChange }
                url={URLS.drenajepluvial}
            />

            <StringList 
                stringList={ servicios.otros }
                handleArrayChange={ handleArrayChange }
                name='otros'
                label='Otros Servicios'
            />

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarServicios }
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
