import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import useFetch from '../../../hooks/useFetch';
import { EmptyFormulario, Formulario } from '../../../models/Formulario';
import { URLSContext } from '../../../context/URLs.context';
import { Button, Container } from '@mui/material';
import { Menu } from './Menu';

export const ActualizarFormPage = () => {

    const URLS = useContext( URLSContext )

    const { search } = useLocation();
    const { formNo } = queryString.parse( search ) ;

    const { data, error } = useFetch<Formulario>(`${URLS.formulario}/${ !formNo || formNo === '' ? '0' : formNo}`)

    const [form, setForm] = useState<Formulario>();

    const handleFormChange = ( nuevo : Formulario ) => {
        console.log( 'se esta intentando cambiarrrrr', nuevo )
        const cuz = JSON.parse(JSON.stringify(nuevo));
        setForm( cuz )
    }

    useEffect( () => {
        console.log('el efffeeeeect')
        if( !error && data ) { 
            const newEntry = JSON.parse(JSON.stringify(data));
            console.log('entro al iffff', newEntry);
            setForm({...newEntry}); 
            console.log('el form', form)
        }
    
    }, [data])

    const dejar = () => {
        setForm({...EmptyFormulario})
        console.log('EL VACIOOOO', form)
    }

    if ( error ) return ( <div>no encontrado {formNo}</div> )
    if ( !form ) return ( <div>cargando</div> )

    return (
        <Container>
            <Menu 
                form = { form! }
                setForm = { setForm }
                handleFormChange={handleFormChange}
            />
            <Button 
                onClick={dejar}
            >
                fdsklf
            </Button>
        </Container>
    )
}
