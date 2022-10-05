import React, { useContext, useState } from 'react'
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'


import { useNotification } from '../../../hooks/useNotification';
import { URLSContext } from '../../../context/URLs.context';
import { inicializarFormulario } from '../../../services/formularios';
import { useNavigate } from 'react-router-dom';
import { useDatePicker } from '../../../hooks/useDatePicker';


export const InicializadorForm = () => {

    const [ formNo, setFormNo ] = useState<string>('')

    const URLS = useContext( URLSContext );

    const { component, value } = useDatePicker({ label: 'Fecha de Entrega' });

    const { openErrorNotification } = useNotification();
    const navigate = useNavigate();

    const handleInitForm = async () => {

        const fechaEntrega = value?.toDate().getTime();

        if( !parseInt(formNo) ) {
            openErrorNotification( 'Se debe especificar el número de formulario' );
            return;
        }
        if( !fechaEntrega ){
            openErrorNotification( 'Se debe especificar la fecha de entrega' );
            return;
        }

        const { result, message, payload } = await inicializarFormulario( URLS.formulario, { no: formNo, fechaEntrega } );
    
        if( !result ) openErrorNotification( message )
        else navigate('/formulario?formNo=' + formNo)

    }


    return (


        <Paper
            sx={{
                m: '15vh auto',
                p: 2,
                width: 600,
                maxWidth: '90%'
            }}
        >
            <Stack spacing={2}>
                <Typography 
                    textAlign='center' 
                    variant='h6'
                >
                    Inicializar Formulario
                </Typography>

                <TextField 
                    size='small'
                    type='number'
                    label="No. Formulario"
                    variant="outlined" 
                    value={formNo}
                    onChange={(e) => setFormNo(e.target.value)}
                /> 

                { component }


                <LoadingButton
                    variant='contained'
                    onClick={handleInitForm}
                >
                    Inicializar Formulario
                </LoadingButton>

            </Stack>
                
        </Paper>


    )
}
