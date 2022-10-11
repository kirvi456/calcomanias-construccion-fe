import React, { useContext, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyRecibo, Formulario, Recibo } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { useDatePicker } from '../../../../hooks/useDatePicker'

type ReciboFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const ReciboForm : React.FC<ReciboFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const [ recibo, setRecibo ] = useState<Recibo>( () => form.recibo ? form.recibo : {...EmptyRecibo });
    const { component, value } = useDatePicker({ label: 'Fecha Recibo', initialValue: recibo?.fecha || 0 });

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        recibo[ e.target.name as 'no7b' ] = Number(e.target.value);
        setRecibo( { ...recibo } );
    }



    const registrarRecibo = async() => {

        setLoading( true )
        const fecha = value?.toDate().getTime() || 0 ;
        alert(fecha)
        const { result, message, payload } = await actualizarFormulario<Recibo>( `${URLS.formulario}/actualizarrecibo/${form.no}`, { ...recibo, fecha } )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        handleFormChange2( {...form, recibo: {...recibo, fecha } } )

        openSuccessNotification('Se actualizó el recibo')   
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
                type='number'
                
                label="Recibo 7B No." 
                name="no7b" 
                variant="outlined" 
                fullWidth
                value={ recibo.no7b }
                onChange={ handleFormChange }
            />
            
            {component}

            <TextField 
                size='small'
                type='number'
                
                label="Total Recibo 7B" 
                name="total" 
                variant="outlined" 
                fullWidth
                value={ recibo.total }
                onChange={ handleFormChange }
            />

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarRecibo }
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
