import React, { useState } from 'react'
import { Stack, Paper, ToggleButtonGroup, ToggleButton, Typography, TextField, Grid } from '@mui/material'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useDatePicker } from '../../../hooks/useDatePicker';

type BuscadorHeaderProps = {
    tipoBusqueda: string,
    formulario: string,
    propietario: string,
    direccion: string,
    loading: boolean,
    fechaInicialURL: number,
    fechaFinalURL: number,
    setLoading: () => void
}

export const BuscadorHeader : React.FC<BuscadorHeaderProps> = React.memo( ({ 
    tipoBusqueda,
    formulario,
    propietario,
    direccion,
    loading, 
    fechaInicialURL,
    fechaFinalURL,
    setLoading }) => {

    const fechaIniInicial = ( new Date() ).getTime() - 31536000000 ;
    const fechaFinInicial = ( new Date() ).getTime() ;

    const getInputType = () => {
        switch( tipo ) {
            case 'propietario':
            case 'direccion':
                return 'text';
            case 'formulario':
                return 'number';
            default : return 'text';
        }
    }

    const getInputLabel = () => {
        switch( tipo ) {
            case 'propietario': return 'Nombre Propietario';
            case 'direccion': return 'Dirección Inmueble';
            case 'formulario': return 'Número Formulario';
            default : return 'Input';
        }
    }

    const getURLProp = () => {
        switch( tipo ) {
            case 'propietario': return 'propietario=' + inputValue;
            case 'direccion': return 'direccion=' + inputValue;
            case 'formulario': return 'noForm=' + inputValue;
            default : return '';
        }
    }
    
    const getDates = () => {
        const fechaIniC = fechaIni?.toDate().getTime() || fechaIniInicial;
        const fechaFinC = fechaFin?.toDate().getTime() || fechaFinInicial;
        return `fechaIni=${fechaIniC}&fechaFin=${fechaFinC}`
    
    }
    
    const getInitialValue = () => {
        switch( tipo ) {
            case 'propietario': return propietario;
            case 'direccion': return direccion;
            case 'formulario': return formulario;
            default : return '';
        }
    }
    
    const navigate = useNavigate();

    console.log(fechaInicialURL, fechaFinalURL)

    const {  component : DatePicker1, value : fechaIni } = useDatePicker({label : 'Fecha Inicial', initialValue: fechaInicialURL })
    const {  component : DatePicker2, value : fechaFin } = useDatePicker({label : 'Fecha Inicial', initialValue: fechaFinalURL })

    const [tipo, setTipo] = React.useState<string>(tipoBusqueda || 'formulario');
    const [inputValue, setInputValue] = React.useState<string>( getInitialValue() );

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setInputValue('')
        setTipo(newAlignment);
    };


    const nag = useLocation();

    const handleBusqueda = () => {
        const newQuery = `/formularios?tipoBusqueda=${tipo}&${getURLProp()}&${getDates()}`;
        if( nag.pathname + nag.search === newQuery ) return;
        setLoading();
        navigate(newQuery, {replace: true})
    }

    

    
    
    return (
        <Paper elevation={11} sx={{p: 2, width: '900px', m: 'auto'}} >

            <Stack  spacing={2}>

                <Stack direction='row' justifyContent='end' alignItems='center' spacing={1}>
                    <Typography>
                        Criterio de Busqueda:
                    </Typography>
                    <ToggleButtonGroup
                        value={tipo}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size='small'
                    >
                        <ToggleButton value="formulario" aria-label="formulario">
                            Formulario
                        </ToggleButton>
                        <ToggleButton value="direccion" aria-label="direccion">
                            Dirección
                        </ToggleButton>
                        <ToggleButton value="propietario" aria-label="propietario">
                            Propietario
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                <TextField 
                    size='small'
                    type={ getInputType() }
                    
                    label={ getInputLabel() } 
                    variant="outlined" 
                    fullWidth

                    value={ inputValue }
                    onChange={ (e) => setInputValue( e.target.value ) }
                />

                <Grid container>
                    <Grid item xs={6} textAlign='center'>
                        { DatePicker1 }
                    </Grid>
                    <Grid item xs={6} textAlign='center'>
                        { DatePicker2 }
                    </Grid>
                </Grid>


                <LoadingButton 
                    loading={ loading }
                    variant='contained'
                    onClick={ handleBusqueda }
                >
                    Buscar
                </LoadingButton>
            </Stack>
        </Paper>
    )
})