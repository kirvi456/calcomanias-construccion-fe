import { Box, Grid, Stack, Typography, Button, Divider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Formulario } from '../../../../../models/Formulario'
import { jsPDF } from "jspdf";
import LOGO from '../../../../../../public/img/logo_light.jpg';
import { URLSContext } from '../../../../../context/URLs.context';
import { getQR } from '../../../../../services/formularios';
import { RubroDesc } from '../../../../../models/Calcomania';

type CalcomaniaPDFProps = {
    form : Formulario
}

const generarPDF = (option : number) => {    

    const doc = new jsPDF({
        orientation: 'p', // landscape
        unit: 'mm', // points, pixels won't work properly
        format: [215, 279] // set needed dimensions for any element
    });


    const pdfjs = document.querySelector<HTMLDivElement>('#divImprimir');

    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs || 'Error Interno', {
        html2canvas:{
            scale: 0.25
        },
        x: 4,
        y: 4,
        callback: function(doc) {
            
            if( option === 1 ) doc.save("output.pdf");
            else doc.output('dataurlnewwindow')
        },
    });
}

const blueColor : string = '#002D62';

export const CalcomaniaPDF2 : React.FC<CalcomaniaPDFProps> = ({ form }) => {


    const URLS = useContext( URLSContext )
    const [ qr, setQR ] = useState<string>('')

    const obtenerQRImage = async () => {
        try {

            const resultImg = await getQR( URLS.calcomania + '/' +form.calcomania!._id );

            if( !resultImg.payload || resultImg.payload === '' ){
                setQR( '' );
                return;
            }

            setQR( resultImg.payload )

        } catch( error ) {
            setQR('')
        }
    }

    useEffect( () => {
        obtenerQRImage();
    }, [])



    const getRubrosDesc = () => {
        const rubros : JSX.Element[] = [];
            for( let i = 0; i < 5; i++ ) {
                const el : RubroDesc = form.calcomania!.rubros[i] || { no: '--', desc: '--------------------------------------------------------------------------------------------------------------------------------------------------------', unidad: false, unidadDesc: '--------', cantidad: 0};
                rubros.push(           
                <Grid container key={i}
                    sx={{
                        border: 'solid 1px black'
                    }}
                >
                    
                    <Grid 
                        item xs={10}
                        sx={{
                            borderRight: 'solid 1px black'
                        }}
                    >
                        <Typography 
                            variant='h3'
                            component='p'
                            textAlign='justify'
                            sx={{
                                maxHeight: '4.7rem',
                                height: '4.7rem',
                                overflow: 'hidden',
                                pl: 2,
                                pr: 2,
                                fontSize: '2.2rem',
                                fontWeight: '800',
                            }}
                            >
                            { el.no } { el.desc }
                            </Typography>
                            </Grid>
                        {
                            el.unidad && 
                            <Grid item xs={2}>
                                <Typography 
                                    textAlign='center'
                                    variant='h3'
                                    sx={{
                                        fontSize: '2.2rem',
                                        fontWeight: '800',
                                    }}
                                >
                                    { el.cantidad }{ el.unidadDesc.replace('ts','').toUpperCase() } 
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                )
                    }
        return rubros;
    
    }

    const getTablaRubros = () => {
        return (
            <Stack spacing={1}>
                    <Typography  variant='h6' sx={{fontWeight: '800', color: blueColor}}>
                        AUTORIZADO EN MTS, MTS O MTS, OTROS
                    </Typography>
                    <Stack 
                        sx={{
                            minHeight: '350px'
                        }}
                    >                    
                    {
                        getRubrosDesc()    
                    }
                        </Stack>
                </Stack>
        )
    }

    return (
        <>
            <Button
                onClick={() => generarPDF(0)}
            >imprimir</Button>
        <Box sx={{
            background: 'white', 
            color: 'black', 
            borderRadius: '0.5rem',
            width: '824px',
            height: '1084px'
            }}
            id='divImprimir'
        >
            <Stack sx={{ height: '100%', p: 1}} spacing={2}>
            
                <Grid container alignItems='center'>

                    <Grid item xs={2}> 
                        <Stack>
                            <img src={LOGO} alt='escudo muni' style={{padding: '12px'}} />
                        </Stack>
                    </Grid>

                    
                    <Grid item xs={10}> 
                        <Stack justifyContent='center' alignItems='center'>
                            <Stack direction='row' spacing={2}>
                                <Typography variant='h5' textAlign='center'> 
                                    MUNICIPALIDAD 
                                </Typography>
                                <Typography variant='h5' textAlign='center'> 
                                    DE
                                </Typography>
                                <Typography variant='h5' textAlign='center'> 
                                    SAN
                                </Typography>
                                <Typography variant='h5' textAlign='center'> 
                                    JOSÉ
                                </Typography>
                                <Typography variant='h5' textAlign='center'> 
                                    PINULA
                                </Typography>
                            </Stack>
                            
                            <Typography variant='body2' textAlign='center'> 
                                Dirección de Construccion y Urbanismo (DCU)
                            </Typography>
                            <Typography variant='body2' textAlign='center'> 
                                PBX:66265500 Ext:5526
                            </Typography>

                            <Stack direction='row' spacing={2} sx={{mt: 2}}>
                                <Typography variant='h3' textAlign='center' 
                                    sx={{
                                        fontSize: '2.2rem',
                                        fontWeight: '800',
                                    }}
                                > 
                                    CALCOMANÍA
                                </Typography>
                                <Typography variant='h3' textAlign='center' 
                                    sx={{
                                        fontSize: '2.2rem',
                                        fontWeight: '800',
                                        pl: 1
                                    }}
                                > 
                                    DE
                                </Typography>
                                <Typography variant='h3' textAlign='center' 
                                    sx={{
                                        fontSize: '2.2rem',
                                        fontWeight: '800',
                                    }}
                                > 
                                    CONSTRUCIÓN
                                </Typography>

                            </Stack>

                        </Stack>
                    </Grid>
                </Grid>


                <Stack>
                    {
                        getTablaRubros()
                    }
                    <Typography textAlign='center' variant='caption'>
                        *** Para ver una completa descripción por favor visitar la página web marcada con el código QR ***
                    </Typography>
                </Stack>                   
                

                

                <Stack>

                    <Typography variant='h6' sx={{fontWeight: '800', color: blueColor}}>
                        DIRECCIÓN
                    </Typography>

                    <Typography textAlign='center' sx={{pl: 4, pr: 4, fontWeight: '800'}} variant='h6'> 
                        {form.calcomania!.direccion} 
                    </Typography>   
                </Stack>

                <Stack>

                    <Typography variant='h6' sx={{fontWeight: '800', color: blueColor}}>
                        NIVELES
                    </Typography>

                    <Typography textAlign='center' sx={{pl: 4, pr: 4, fontWeight: '800'}} variant='h6'> 
                        { form!.obra!.niveles.join(', ') }
                    </Typography>   
                </Stack>


                <Grid container>
                    <Grid item xs={6} sx={{textAlign: 'center'}}>

                        <img 
                            src={qr}
                            alt='QR Imagen'
                            style={{
                                width: '220px',
                                margin: 'auto'
                            }}
                        />
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2} sx={{alignItems: 'center'}}>
                            <Stack direction='row'>
                                <Typography variant='h4' sx={{mr: 1}}>
                                    NO. FORMULARIO:
                                </Typography>
                                <Typography variant='h4'>
                                    { form!.no }
                                </Typography>
                            </Stack>
                            <Stack direction='row'>
                                <Typography variant='h4' sx={{mr: 1}}>
                                    NO. RECIBO:
                                </Typography>
                                <Typography variant='h4'>
                                    { form!.recibo!.no7b }
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>


                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction='row' alignItems='center' justifyContent='end'>
                            <Typography variant='h6' sx={{mr: 1}}>
                                Fecha Vencimiento: 
                            </Typography>
                            <Typography>
                                { 
                                    (
                                        new Date(form!.calcomania!.vencimiento)).toLocaleDateString(
                                            'es-ES', 
                                            {
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric'
                                            }
                                    ) 
                                }
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                

            </Stack>
        </Box>
        </>
    )
}
