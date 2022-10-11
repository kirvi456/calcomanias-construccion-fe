import React, { useContext, useState } from 'react'
import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyTala, Formulario, Tala } from '../../../../models/Formulario'
import { URLSContext } from '../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../services/formularios'
import { useNotification } from '../../../../hooks/useNotification'


import { APISelect } from '../../../../components/APISelect'

type TalaFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const TalaForm : React.FC<TalaFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ tala, setTala ] = useState<Tala>( () => form.tala ? form.tala : {...EmptyTala });
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        tala[ e.target.name as 'tipo' ] = e.target.value;
        setTala( { ...tala } );
    }


    const handleSelectChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        tala.necesario = e.target.value == '1' ? true : false;
        if( !tala.necesario ) tala.tipo = 'No necesario';
        setTala( { ...tala } )
    }

    const registrarTala = async() => {

        setLoading( true )
        const { result, message } = await actualizarFormulario<Tala>( `${URLS.formulario}/actualizartala/${form.no}`, tala )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        handleFormChange2( {...form, tala} )

        openSuccessNotification('Se actualizó el tala')   
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
                select
                value={ tala.necesario ? '1' : '0' }
                label="Se Realizará Tala"
                onChange={ handleSelectChange }
            >
                <MenuItem value={'1'}>Si</MenuItem>
                <MenuItem value={'0'}>No</MenuItem>
            </TextField>
            
            <APISelect 
                label="Quien Realizará" 
                name='tipo'
                value={ tala.necesario ? tala.tipo : '' }
                onChange={ handleFormChange }
                url={ URLS.tipotala }
                disabled={ !tala.necesario }
            />
            

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarTala }
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
