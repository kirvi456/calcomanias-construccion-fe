import React, { useContext, useEffect, useState } from 'react';
import { Paper, Stack, TextField, Container, Typography, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ValidateLoginForm } from '../../utils/ValidateLoginForm';
import { URLSContext } from '../../context/URLs.context';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../hooks/useNotification';
import { PasswordInput } from '../../components/PasswordInput';
import { AuthContext } from '../../auth';
import LoadingButton from '@mui/lab/LoadingButton';
import { getErrorMessage } from '../../utils/ErrorMessage';

export const LoginPage : React.FC<{}> = () => {    

    const [user, setUser]           = useState<string>('');
    const [password, setPassword]   = useState<string>('');
    const [loading, setLoading]     = useState<boolean>(false);

    const { login } = useContext( AuthContext );
    const URLS = React.useContext(URLSContext);

    const {openErrorNotification} = useNotification();
    const navigate = useNavigate();

    const loguearse = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading( true );


        ValidateLoginForm.validate({user, password})
        .then(async () => {

            const loginResponse = await login(`${URLS.auth}/login`,user, password);

            if( loginResponse.length > 0 ) {
                openErrorNotification( loginResponse );
                setLoading( false );
                return;
            }
            
            return navigate('/');
        })
        .catch((error) => {
            openErrorNotification(getErrorMessage(error));
            setLoading( false );
        })
    }

    return (
        <Container 
            sx={{            
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{minWidth: '350px', width: '350px', maxWidth: '90%', p:2}} elevation={12}>

                <Stack spacing={2}>                
                    <Stack alignItems='center'>
                        <AccountCircleIcon sx={{fontSize: 70}} />
                    </Stack>

                    <Stack>
                        <Typography variant='h4' textAlign='center'>
                            Bienvenido
                        </Typography>

                        <Typography variant='caption' textAlign='center' sx={{opacity: 0.5}}>
                            Ingresa con tu email/usuario y tu contraseña
                        </Typography>
                    </Stack> 

                    <form onSubmit={ loguearse }>
                        <Stack spacing={2}>                                            

                            <Stack spacing={2}>
                                <TextField 
                                    size='small'
                                    type='text'
                                    value={user}
                                    onChange={(e) => {setUser(e.target.value)}}
                                    label="Usuario" 
                                    variant="outlined" 
                                /> 

                                <PasswordInput 
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    label="Contraseña" 
                                    size='small'
                                />                             
                            </Stack>

                            <LoadingButton
                                type='submit'
                                loading={ loading }
                                variant='contained'
                            >
                                Iniciar Sesión
                            </LoadingButton>

                        </Stack>
                    </form>

                    <Stack direction='row' spacing={1} justifyContent='center'>
                        <Typography variant='caption'>
                            ¿No tienes cuenta?
                        </Typography>
                        <Link
                            onClick={() => navigate('/registro')}
                            variant='caption' 
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            Registrate
                        </Link>
                    </Stack>
                </Stack>         
            </Paper>
        </Container>
    )
}
