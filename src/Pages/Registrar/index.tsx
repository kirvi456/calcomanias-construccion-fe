import React, { ChangeEvent, useState } from 'react';
import { Paper, Stack, TextField, Container, Typography, Link, Divider } from '@mui/material';

import { emptyUsuario, Usuario } from '../../models/Usuario';
import { useNotification } from '../../hooks/useNotification';
import { ValidateRegistroForm } from '../../utils/ValidateRegitroForm';
import { URLSContext } from '../../context/URLs.context';
import { FetchRequest } from '../../utils/MakeRequest';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../../components/PasswordInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { getErrorMessage } from '../../utils/ErrorMessage';


export const RegistrarPage = () => {
    const [user, setUser]                       = useState<Usuario>({...emptyUsuario, rol: 'DIGITADOR'});
    const [pwConfirmation, setPwConfirmation]   = useState<string>('');
    const [loading, setLoading]                 = useState<boolean>(false);

    const navigate = useNavigate();

    const URLS = React.useContext(URLSContext);
    

    const { openErrorNotification, openSuccessNotification } = useNotification();

    const hangleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        user[e.target.name as 'nombre'] = e.target.value;
        setUser({...user});
    }

    const Registrar = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading( true );

        ValidateRegistroForm.validate({...user, pwConfirmation})
        .then(async () => {
            const usuario = await FetchRequest<Usuario>(
                `${URLS.usuario}/registro`,
                'POST',
                user                
            )
            
            if(usuario.error){
                openErrorNotification(getErrorMessage(usuario.error));
                setLoading( false );
                return;
            }
            openSuccessNotification('Usuario registrado');

            setUser({...emptyUsuario, rol: 'ADMIN'});
            setPwConfirmation('');
            setLoading( false );
        })
        .catch(error => {
            console.log(getErrorMessage(error))
            openErrorNotification(getErrorMessage(error));
            setLoading( false );
        })

    }

    return (
        <Container 
            sx={{            
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 8
            }}
        >
            <Paper sx={{minWidth: '350px', width: '350px', maxWidth: '90%', p:2}}>
                <Stack spacing={2}>

                    <Stack spacing={1}>
                        <Typography variant='h4' textAlign='center'>
                            Crear una cuenta
                        </Typography>

                        <Divider />
                    </Stack>

                    <form onSubmit={ Registrar }>                    
                        <Stack spacing={2}>

                            <TextField 
                                size='small'
                                type='text'
                                value={user.nombre}
                                name='nombre'
                                onChange={ hangleInputChange }
                                label="Nombre Completo" 
                                variant="outlined" 
                            /> 

                            <TextField 
                                size='small'
                                type='email'
                                value={user.correo}
                                name='correo'
                                onChange={ hangleInputChange }
                                label="Correo" 
                                variant="outlined" 
                            /> 

                            <TextField 
                                size='small'
                                type='text'
                                value={user.usuario}
                                name='usuario'
                                onChange={ hangleInputChange }
                                label="Usuario" 
                                variant="outlined" 
                            /> 
                            
                            <PasswordInput 
                                name='pw'
                                value={user.pw}
                                onChange={ hangleInputChange }
                                label="Confirmar Contraseña" 
                                size='small'
                            /> 

                            <PasswordInput 
                                value={pwConfirmation}
                                onChange={ (e) => setPwConfirmation(e.target.value) }
                                label="Confirmar Contraseña" 
                                size='small'
                            />                         

                            <LoadingButton
                                type='submit'
                                variant='contained'
                                loading={loading}
                            >
                                Crear
                            </LoadingButton>

                        </Stack>
                    </form>  

                </Stack>

            </Paper>
        </Container>
    )
}