import { Box, Grid, Stack, Typography, Button, Divider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Formulario } from '../../../../../models/Formulario'
import { jsPDF } from "jspdf";
import LOGO from '../../../../../../public/img/logo_light.jpg';
import { URLSContext } from '../../../../../context/URLs.context';
import { getQR } from '../../../../../services/formularios';
import { RubroDesc } from '../../../../../models/Calcomania';
import { getDateString } from '../../../../../utils/Formats';

type CalcomaniaPDFProps = {
    form : Formulario
}

const generarPDF = (option : number) => {    

    const doc = new jsPDF({
        orientation: 'p', // landscape
        unit: 'mm', // points, pixels won't work properly
        format: [297, 420] // set needed dimensions for any element
    });


    const pdfjs = document.querySelector<HTMLDivElement>('#divImprimir');

    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs || 'Error Interno', {
        html2canvas:{
            scale: 0.25
        },
        x: 8,
        y: 4,
        callback: function(doc) {
            
            if( option === 1 ) doc.save("output.pdf");
            else doc.output('dataurlnewwindow')
        },
    });
}

const blueColor : string = '#002D62';

export const CalcomaniaPDF3 : React.FC<CalcomaniaPDFProps> = ({ form }) => {


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
                                minHeight: '10.1rem',
                                maxHeight: '10.1rem',
                                height:    '10.1rem',
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
                    <Stack direction='row' spacing={3}>
                        <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', color: blueColor}}>
                            AUTORIZADO 
                        </Typography>
                        <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', color: blueColor}}>
                            EN MTS, MTS O MTS, OTROS
                        </Typography>
                    </Stack>
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
            width: '1148px',
            height: '1648px', 
            position: 'relative'
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
                                <Typography variant='h1' textAlign='center' 
                                    sx={{
                                        fontSize: '3.5rem',
                                        fontWeight: '800',
                                    }}
                                > 
                                    CALCOMANÍA
                                </Typography>
                                <Typography variant='h1' textAlign='center' 
                                    sx={{
                                        fontSize: '3.5rem',
                                        fontWeight: '800',
                                        pl: 1
                                    }}
                                > 
                                    DE
                                </Typography>
                                <Typography variant='h1' textAlign='center' 
                                    sx={{
                                        fontSize: '3.5rem',
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

                    <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', color: blueColor}}>
                        NIVEL(ES)
                    </Typography>

                    <Typography textAlign='center'  sx={{
                            pl: 4, 
                            pr: 4, 
                            fontSize : '2.2rem', 
                            fontWeight: '800',
                            mineight: '2.7rem',
                            height: '2.7rem',
                            maxHeight: '4.7rem',
                            overflow: 'hidden'
                        }} variant='h3'> 
                        { form!.obra!.niveles.join(', ').toUpperCase() }
                    </Typography>   
                </Stack>

                <Stack>

                    <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', color: blueColor}}>
                        DIRECCIÓN
                    </Typography>

                    <Typography textAlign='center' 
                        sx={{
                            fontSize : '2.2rem', 
                            fontWeight: '800',
                            minHeight: '7.7rem',
                            height:    '7.7rem',
                            maxHeight: '7.7rem',
                            overflow: 'hidden', 
                            letterSpacing: '.2rem'
                        }} variant='h3'> 
                        {form.calcomania!.direccion.toUpperCase()} 
                    </Typography>   
                </Stack>



                <Grid container>
                    
                    <Grid item xs={7}>
                        <Stack spacing={2} sx={{alignItems: 'start'}}>
                            <Stack direction='row' spacing={2}>
                                <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', mr: 1, color: blueColor}}>
                                    FECHA VENCIMIENTO
                                </Typography>
                                <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800'}}>
                                { 
                                    getDateString( form!.calcomania!.vencimiento )
                                }
                                </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', mr: 1, color: blueColor}}>
                                    NO. FORMULARIO
                                </Typography>
                                <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800'}}>
                                    { form!.no }
                                </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800', mr: 1, color: blueColor}}>
                                    NO. RECIBO
                                </Typography>
                                <Typography variant='h3' sx={{fontSize : '2.2rem', fontWeight: '800'}}>
                                    { form!.recibo!.no7b }
                                </Typography>
                            </Stack>                            
                        </Stack>
                    </Grid>

                    <Grid item xs={5} sx={{textAlign: 'center'}}>

                        
                        
                    </Grid>

                </Grid>


                

            </Stack>
            <Stack
                sx={{
                    position: 'absolute',
                    bottom: 0, 
                    right: 128
                }}
            >
                <img 
                    src={qr}
                    alt='QR Imagen'
                    style={{
                        width: '180px',
                        margin: 'auto', 
                    }}
                />
                <Typography>
                    {form.calcomania!._id}
                </Typography>
            </Stack>
            
        </Box>
        </>
    )
}
