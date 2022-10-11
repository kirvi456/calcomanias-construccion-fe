import React from 'react'
import { Grid, Paper, Typography, Stack, Box, Divider, IconButton, Tooltip, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';


import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Formulario } from '../../../models/Formulario';
import { getDateString } from '../../../utils/Formats';

import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

type CardFormProps = {
    form : Formulario
}

export const CardForm : React.FC<CardFormProps> = ({ form }) => {

    const navigate = useNavigate();    

    const handleVer = () => {
        navigate( '/formulario?formNo=' + form.no )
    }

    return (
        <Paper 
            sx={{
                pt: 2, 
                pl: 2, 
                pr: 2, 
                position: 'relative', 
                overflow: 'hidden', 
                maxWidth: '600px',
                minWidth: '600px'
            }}
        >
            <Stack spacing={1}>            
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0,
                        p: 1,
                        bgcolor: 'primary.main',
                        borderRadius: '0 0 8px 0'
                    }}
                >
                    { 'No.' + form.no || 'N/A' }
                </Box>
                
                <Stack alignItems='end'>
                    <Typography variant='caption'>
                        { getDateString(form.fechaEntrega) }
                    </Typography>
                </Stack>

                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <PersonIcon fontSize='large' />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography>
                            <strong>Propietario: </strong>{ form.propietario?.nombres || 'No registrado'}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <HomeWorkIcon fontSize='large' />
                    </Grid>
                    <Grid item xs={11} textAlign='justify'>
                        <Typography>
                            <strong>Dirección: </strong>{ form.inmueble?.direccion || 'No registrada'}
                        </Typography>
                    </Grid>
                </Grid>


                <Divider />
                <Stack direction='row' justifyContent='end' spacing={1} sx={{pt: 1, pb: 1}}>

                    <Tooltip title="Ir a Formulario">
                        <Button 
                            aria-label='editar pc' 
                            size='small'
                            onClick={ handleVer }
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            Ir
                        </Button>
                    </Tooltip>

                </Stack>
            </Stack>
        </Paper>
    )
}