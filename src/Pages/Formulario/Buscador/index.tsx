import React, { useContext, useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material';
import { BuscadorHeader } from './BuscadorHeader';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useFetch from '../../../hooks/useFetch';
import { URLSContext } from '../../../context/URLs.context';

import LodingSVG from '../../../assets/svg/loading124.svg';
import { Formulario } from '../../../models/Formulario';
import { ListaForms } from './ListaForms';

export const BuscadorFormularioPage = () => {

    const URLS = useContext( URLSContext );
    const getURL = () => {
        switch( tipoBusqueda ){
            case 'formulario': return `${URLS.formulario}/formulario?&noForm=${noForm}${getURLDates()}`;
            case 'propietario': return `${URLS.formulario}/propietario?&propietario=${propietario}${getURLDates()}`;
            case 'direccion': return `${URLS.formulario}/direccion?&direccion=${direccion}${getURLDates()}`;
            default: return `${URLS.formulario}`;
        }
    }

    const getURLDates = () => {
        return `&fechaIni=${fechaIni}&fechaFin=${fechaFin}`;
    }
    
    const { search } =  useLocation();
    const getURLProps = () => {
        const fechaIniInicial = ( new Date() ).getTime() - 31536000000 ;
        const fechaFinInicial = ( new Date() ).getTime() ;

        console.log(fechaIniInicial);

        const { 
            tipoBusqueda = '', 
            noForm = '', 
            propietario = '', 
            direccion = '',
            fechaIni = '',
            fechaFin = '',
        } = queryString.parse( search );


        return {
            tipoBusqueda : typeof tipoBusqueda === 'string' ? tipoBusqueda : '',
            noForm : typeof noForm === 'string' ? noForm : '',
            propietario : typeof propietario === 'string' ? propietario : '', 
            direccion : typeof direccion === 'string' ? direccion : '', 
            fechaIni : typeof fechaIni === 'string' && fechaIni !== '' ? fechaIni : '' + fechaIniInicial, 
            fechaFin : typeof fechaFin === 'string' && fechaIni !== '' ? fechaFin : '' + fechaFinInicial, 
        }
    }


    const { 
        tipoBusqueda, 
        noForm, 
        propietario, 
        direccion,
        fechaIni,
        fechaFin
    } = getURLProps();

    
    const [ forms, setForms ] = useState<Formulario[]>([]);

    const [ loading, setLoading ] = useState<boolean>(true)

    const { data, error } = useFetch<Formulario[]>( getURL() )

    

    const handleLoaging = () => {
        setLoading(true)
    }

    useEffect(() => {
        if( data && Array.isArray( data ) ) { setForms([...data]); setLoading( false ); }
        if( error ) { setForms([]); setLoading( false ); } 
    }, [ data, error ])


    return (
        <Container>
            <Stack spacing={2}>
                <BuscadorHeader 
                    formulario={noForm}
                    direccion={direccion}
                    tipoBusqueda={tipoBusqueda}
                    propietario={propietario}
                    loading={loading}
                    fechaInicialURL={Number(fechaIni)}
                    fechaFinalURL={Number(fechaFin)}
                    setLoading={handleLoaging}
                />

                {
                    loading 
                    ? <img src={LodingSVG} style={{maxWidth: '64px', margin: '32px auto'}} />
                    : <ListaForms forms={ forms } />
                }
                
            </Stack>
            
        </Container>
    )
}