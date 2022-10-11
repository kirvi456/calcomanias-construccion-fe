import React, { useContext, useState } from 'react'
import { Button, Checkbox, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { EmptyObra, Formulario, Obra } from '../../../../../models/Formulario'
import { URLSContext } from '../../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../../services/formularios'
import { useNotification } from '../../../../../hooks/useNotification'


import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { APISelect } from '../../../../../components/APISelect'
import { PisosSelect } from './PisosSelect'

type ObraFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const ObraForm : React.FC<ObraFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ obra, setObra ] = useState<Obra>( () => form.obra ? form.obra : {...EmptyObra });
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        obra[ e.target.name as 'tipo' ] = e.target.value;
        setObra( { ...obra } )
    }

    const handleArrayChange = (name :string, stringList : string[]) => {
        obra[name as 'niveles'] = [...stringList];
        setObra({ ...obra });
    }
    
    const handleCubicosChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        obra.movimientoTierra = e.target.checked;
        if( !e.target.checked ) obra.metrosCubicos = 0;
        setObra( { ...obra } )
    }

    const handleCuadradosChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        obra.demolicion = e.target.checked;
        if( !e.target.checked ) obra.metrosCuadrados = 0;
        setObra( { ...obra } )
    }

    const registrarObra = async() => {

        setLoading( true )
        const { result, message, payload } = await actualizarFormulario<Obra>( `${URLS.formulario}/actualizarobra/${form.no}`, obra )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        handleFormChange2( {...form, obra} )

        openSuccessNotification('Se actualizó la obra')   
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
                label="Tipo de Obra" 
                name='tipo'
                value={ obra.tipo }
                onChange={ handleFormChange }
                url={URLS.tipoobra}
            />

            <TextField 
                size='small'
                type='number'
            
                label="Area" 
                name='area'
                variant="outlined" 
                fullWidth
                value={ obra.area }
                onChange={ handleFormChange }
                InputProps={{
                    endAdornment: <InputAdornment position="start">mts²</InputAdornment>,
                }}
            /> 
            
            <Stack spacing={1}>
                <Typography
                    variant='caption'
                >
                    Movimiento de tierra (Corte o Relleno)
                </Typography>
            
                <Grid container>
                    <Grid item xs={2} md={1}>
                        <Checkbox 
                            icon={<CheckCircleOutlinedIcon />} 
                            checkedIcon={<CheckCircleIcon />} 
                            value={ obra.movimientoTierra }
                            onChange={ handleCubicosChange }
                            name='movimientoTierra'
                        />
                    </Grid>
                    <Grid item xs={10} md={11}>
                        <TextField 
                            disabled={ !obra.movimientoTierra }
                            size='small'
                            type='number'
                        
                            label="Metros Cúbicos" 
                            name='metrosCubicos'
                            variant="outlined" 
                            fullWidth
                            value={ obra.metrosCubicos }
                            onChange={ handleFormChange }
                            InputProps={{
                                endAdornment: <InputAdornment position="start">mts³</InputAdornment>,
                            }}
                        /> 
                    </Grid>
                </Grid>
            </Stack>

            <Stack spacing={1}>
                <Typography
                    variant='caption'
                >
                    Demolición
                </Typography>
                <Grid container>
                    <Grid item xs={2} md={1}>
                        <Checkbox 
                            icon={<CheckCircleOutlinedIcon />} 
                            checkedIcon={<CheckCircleIcon />} 
                            value={ obra.demolicion }
                            onChange={ handleCuadradosChange }
                            name='demolicion'
                        />
                    </Grid>
                    <Grid item xs={10} md={11}>
                        <TextField 
                            disabled={ !obra.demolicion }
                            size='small'
                            type='number'
                        
                            label="Metros Cadrados" 
                            name='metrosCuadrados'
                            variant="outlined" 
                            fullWidth
                            value={ obra.metrosCuadrados }
                            onChange={ handleFormChange }
                            InputProps={{
                                endAdornment: <InputAdornment position="start">mts²</InputAdornment>,
                            }}
                        /> 
                    </Grid>
                </Grid>
            </Stack>

            <TextField 
                size='small'
                type='number'
            
                label="Tiempo en meses" 
                name='meses'
                variant="outlined" 
                fullWidth
                value={ obra.meses }
                onChange={ handleFormChange }
                InputProps={{
                    endAdornment: <InputAdornment position="start">mes(es)</InputAdornment>,
                }}
            /> 

            <PisosSelect 
                stringList={obra.niveles}
                name='niveles'
                label='Nivele(s) y/ Piso(s)'
                handleArrayChange={handleArrayChange}
            /> 

            <TextField 
                size='small'
                type='text'
            
                label="Tipo de Uso" 
                name='tipoUso'
                variant="outlined" 
                fullWidth
                value={ obra.tipoUso }
                onChange={ handleFormChange }
            /> 

            <TextField 
                size='small'
                type='number'
            
                label="Costo Estimado" 
                name='costoEstimado'
                variant="outlined" 
                fullWidth
                value={ obra.costoEstimado }
                onChange={ handleFormChange }
                InputProps={{
                    startAdornment: <InputAdornment position="start">Q </InputAdornment>,
                }}
            />

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarObra }
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
