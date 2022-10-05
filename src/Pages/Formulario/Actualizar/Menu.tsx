import React, { useState } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { Formulario } from '../../../models/Formulario'
import { PropietarioCard } from './Cards/Propietario'
import { InmuebleCard } from './Cards/Inmueble';
import { ObraCard } from './Cards/Obra';
import { ServiciosCard } from './Cards/Servicios';
import { TalaCard } from './Cards/Tala';
import { PlanificadorCard } from './Cards/Planificador';
import { EjecutorCard } from './Cards/Ejecutor';
import { BarItem, BarOptions } from './Types/Bar';
import { ReciboCard } from './Cards/Recibo';
import { CalcomaniaCard } from './Cards/Calcomania';

import { MenuBar } from './MenuBar';


import PersonIcon from '@mui/icons-material/Person';

import FeedIcon from '@mui/icons-material/Feed';
import Person4Icon from '@mui/icons-material/Person4';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import ConstructionIcon from '@mui/icons-material/Construction';
import Person3Icon from '@mui/icons-material/Person3';
import WaterIcon from '@mui/icons-material/Water';
import ForestIcon from '@mui/icons-material/Forest';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';

type MenuProps = {
    form: Formulario,
    setForm: React.Dispatch<React.SetStateAction<Formulario | undefined>>,
    handleFormChange : ( nuevo : Formulario ) => void
}


export const Menu : React.FC<MenuProps> = ({ form, setForm, handleFormChange }) => {

    const [ options, setOptions ] = useState<BarItem[]>([
        {
            icon: <PersonIcon />,
            label: 'Propietario',
            value: BarOptions.propietario,
            component: <PropietarioCard 
                icon={<PersonIcon fontSize='large' />} 
                label={'Propietario'}
                formNo={ form.no }
                propietario={ form.propietario }
                form={form}
                setForm={setForm}
                handleFormChange={handleFormChange }
                />,
            selected: true,
        },
        {
            icon: <HouseSidingIcon />,
            label: 'Inmueble',
            value: BarOptions.inmueble,
            component: <InmuebleCard 
                icon={<HouseSidingIcon fontSize='large'/>}
                label={'Inmueble'}
                formNo={form.no}
                inmueble={ form.inmueble }
            />,
            selected: false    
        },
        {
            icon: <ConstructionIcon />,
            label: 'Obra',
            value: BarOptions.obra,
            component: <ObraCard 
                icon={<ConstructionIcon fontSize='large' />}
                label={'Obra'}
                formNo={form.no}
                obra={ form.obra }
            />,
            selected: false    
        },
        {
            icon: <WaterIcon />,
            label: 'Servicios',
            value: BarOptions.servicios,
            component: <ServiciosCard 
                icon={<WaterIcon fontSize='large' />}
                label={'Servicios'}
                formNo={form.no}
                servicios={ form.servicios }
            />,
            selected: false    
        },
        {
            icon: <ForestIcon />,
            label: 'Tala',
            value: BarOptions.tala,
            component: <TalaCard 
                icon={<ForestIcon fontSize='large'  />}
                label={'Tala'}
                formNo={form.no}
                tala={ form.tala }
            />,
            selected: false    
        },
        {
            icon: <Person4Icon />,
            label: 'Ejecutor',
            value: BarOptions.ejecutor,
            component: <EjecutorCard 
                icon={<Person4Icon fontSize='large' />}
                label={'Ejecutor'}
                formNo={form.no}
                ejecutor={ form.ejecutor }
            />,
            selected: false    
        },
        {
            icon: <Person3Icon />,
            label: 'Planificador',
            value: BarOptions.planificador,
            component: <PlanificadorCard
                icon={<Person3Icon fontSize='large' />}
                label={'Planificador'} 
                formNo={form.no}
                planificador={ form.planificador }
            />,
            selected: false    
        },
        {
            icon: <ReceiptIcon />,
            label: 'Recibo',
            value: BarOptions.recibo,
            component: <ReciboCard 
                icon={<ReceiptIcon fontSize='large'  />}
                label={'Recibo 7B'}
                formNo={form.no}
                recibo={ form.recibo }
            />,
            selected: false    
        },
        {
            icon: <TextSnippetTwoToneIcon />,
            label: 'Calcomania',
            value: BarOptions.calcomania,
            component: <CalcomaniaCard 
                icon={<TextSnippetTwoToneIcon fontSize='large' />}
                label={'Calcomania'}
                formNo={form.no}
                calcomania={ form.calcomania }
                propietario={ form.propietario }
                recibo={ form.recibo }
                inmueble={ form.inmueble }
            />,
            selected: false    
        },
        {
            icon: <Person3Icon />,
            label: 'Planificador',
            value: BarOptions.planificador,
            component: <PlanificadorCard
                icon={<Person3Icon fontSize='large' />}
                label={'Planificador'} 
                formNo={form.no}
                planificador={ form.planificador }
            />,
            selected: false    
        },
    ])
    
    const handleSelect = ( optionSelect : BarOptions ) => {
        const nuevoSelected = options.map(el => ({ ...el, selected: el.value === optionSelect }) )
        console.log(nuevoSelected)
        setOptions([...nuevoSelected])
    }

    return (
        <Stack>
            <Stack>
                <Stack direction='row' spacing={2} sx={{mb: 1}}>
                    <FeedIcon sx={{fontSize: 60}} />
                    <Stack>
                        <Typography
                            variant='h4'
                        >
                            Formulario { form.no }
                        </Typography>
                        <Typography
                            variant='caption'
                        >
                            Fecha Entrega: { (new Date(form.fechaEntrega)).toLocaleDateString() }
                        </Typography>
                    </Stack>
                </Stack>
                
                
                <Divider />
            </Stack>


            <Stack alignItems='center' spacing={2}>
                

                <MenuBar options={options} handleSelect={handleSelect} />

                {
                    options.find( el => el.selected )!.component
                }

            </Stack>
            

        </Stack>
    )
}
