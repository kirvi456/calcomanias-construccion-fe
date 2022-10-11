import { Box, Grid, Stack, Typography, Button, Divider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Formulario } from '../../../../../models/Formulario'
import { jsPDF } from "jspdf";
import LOGO from '../../../../../../public/img/logo_light.jpg';
import { URLSContext } from '../../../../../context/URLs.context';
import { getQR } from '../../../../../services/formularios';

type CalcomaniaPDFProps = {
    form : Formulario
}

const generarPDF = (option : number) => {    

    const doc = new jsPDF({
        orientation: 'l', // landscape
        unit: 'mm', // points, pixels won't work properly
        format: [279, 215] // set needed dimensions for any element
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


export const CalcomaniaPDF : React.FC<CalcomaniaPDFProps> = ({ form }) => {

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

    return (
        <>
            <Button
                onClick={() => generarPDF(0)}
            >imprimir</Button>
        <Box sx={{
            background: 'white', 
            color: 'black', 
            borderRadius: '0.5rem',
            width: '1084px',
            height: '824px'
            }}
            id='divImprimir'
        >
            <div 
                style={{
                    background: 'black',
                    height: '24px',
                    marginTop: '4px'
                }}>
            </div>
            <Stack sx={{ height: '100%', p: 1}} spacing={2}>
            
                <Grid container alignItems='center'>

                    <Grid item xs={2}> 
                        <Stack>
                            <img src={LOGO} alt='escudo muni' style={{padding: '12px'}} />
                        </Stack>
                    </Grid>

                    
                    <Grid item xs={8}> 
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

                            <Stack direction='row' spacing={2} sx={{mt: 4}}>
                                <Typography variant='h3' textAlign='center' 
                                    sx={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                    }}
                                > 
                                    CALCOMANÍA
                                </Typography>
                                <Typography variant='h3' textAlign='center' 
                                    sx={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                    }}
                                > 
                                    DE
                                </Typography>
                                <Typography variant='h3' textAlign='center' 
                                    sx={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                    }}
                                > 
                                    CONSTRUCIÓN
                                </Typography>

                            </Stack>

                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                    <img 
                        src={qr}
                        alt='QR Imagen'
                        style={{
                            width: '180px'
                        }}
                    />
                    </Grid>
                </Grid>

                <div style={{borderTop: '1px solid black', margin: '4px 24px'}}></div>
                <Stack sx={{position: 'relative', mt: 4}} spacing={1}>
                                
                    <Typography textAlign='center' sx={{pl: 4, pr: 4, fontWeight: '800'}} variant='h6'> 
                        {form.calcomania!.direccion} 
                    </Typography>   
                </Stack>

                <Stack>
                <Grid 
                    container 
                    sx={{
                        border: 'solid 1px black'
                    }}
                >
                    <Grid item xs={1} sx={{
                        borderRight: 'solid 1px black',
                    }}>
                        <Typography textAlign='center' fontWeight='bold'>
                            Número
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sx={{
                        borderRight: 'solid 1px black'
                    }}>
                        <Typography textAlign='center' fontWeight='bold'>
                            Descripción
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{
                    }}>
                        <Typography textAlign='center' fontWeight='bold'>
                            Cantidad
                        </Typography>
                    </Grid>
                </Grid>
                {
                    form.calcomania?.rubros.map( (el, index) => (
                        
                        <Grid container key={index}
                            sx={{
                                border: 'solid 1px black'
                            }}
                        >
                            <Grid item xs={1} sx={{borderRight: 'solid 1px black'}}>
                                <Typography textAlign='center'>
                                    { el.no }
                                </Typography>
                            </Grid>
                            <Grid 
                                item xs={9}
                                sx={{
                                    borderRight: 'solid 1px black'
                                }}
                            >
                                <Typography 
                                    variant='caption'
                                    component='p'
                                    textAlign='justify'
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            pl: 2,
                                            pr: 2
                                        }}
                                    >
                                    { el.desc }
                                    </Typography>
                                    </Grid>
                                {
                                    el.unidad && 
                                    <Grid item xs={2}>
                                        <Typography textAlign='center'>
                                            { el.cantidad }{ el.unidadDesc } 
                                        </Typography>
                                    </Grid>
                                }
                            </Grid>
                        ))
                    }
                </Stack>

                <Grid container>
                    <Grid item xs={6}>
                        <Stack direction='row' alignItems='center' justifyContent='center'>
                            <Typography variant='h4' sx={{mr: 1}}>
                                Formulario:
                            </Typography>
                            <Typography variant='h4'>
                                { form!.no }
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction='row' alignItems='center' justifyContent='center'>
                            <Typography variant='h4' sx={{mr: 1}}>
                                Recibo:
                            </Typography>
                            <Typography variant='h4'>
                                { form!.recibo!.no7b }
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction='row' alignItems='center' justifyContent='center'>
                            <Typography variant='h6' sx={{mr: 1}}>
                                Niveles: 
                            </Typography>
                            <Typography>
                                { form!.obra!.niveles.join(', ') }
                            </Typography>
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
