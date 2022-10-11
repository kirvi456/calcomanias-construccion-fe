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
import { CalcomaniaPDF3 } from './Formularios/Calcomania/CalcomaniaPDF3';

type MenuProps = {
    form: Formulario,
    handleFormChange : ( nuevo : Formulario ) => void
}


export const Menu : React.FC<MenuProps> = ({ form, handleFormChange }) => {

    const [ options, setOptions ] = useState<BarItem[]>([
        {
            icon: <PersonIcon />,
            label: 'Propietario',
            value: BarOptions.propietario,
            selected: true,
        },
        {
            icon: <HouseSidingIcon />,
            label: 'Inmueble',
            value: BarOptions.inmueble,
            selected: false    
        },
        {
            icon: <ConstructionIcon />,
            label: 'Obra',
            value: BarOptions.obra,
            selected: false    
        },
        {
            icon: <WaterIcon />,
            label: 'Servicios',
            value: BarOptions.servicios,
            selected: false    
        },
        {
            icon: <ForestIcon />,
            label: 'Tala',
            value: BarOptions.tala,
            selected: false    
        },
        {
            icon: <Person4Icon />,
            label: 'Ejecutor',
            value: BarOptions.ejecutor,
            selected: false    
        },
        {
            icon: <Person3Icon />,
            label: 'Planificador',
            value: BarOptions.planificador,
            selected: false    
        },
        {
            icon: <ReceiptIcon />,
            label: 'Recibo',
            value: BarOptions.recibo,
            selected: false    
        },
        {
            icon: <TextSnippetTwoToneIcon />,
            label: 'Calcomania',
            value: BarOptions.calcomania,
            selected: false    
        }
    ])
    
    const handleSelect = ( optionSelect : BarOptions ) => {
        const nuevoSelected = options.map(el => ({ ...el, selected: el.value === optionSelect }) )
        console.log(nuevoSelected)
        setOptions([...nuevoSelected])
    }


    const getCard = () => {
        const selected = options.find( el => el.selected )!.value;
        switch( selected ){
            case BarOptions.propietario : 
                return <PropietarioCard 
                    icon={<PersonIcon fontSize='large' />} 
                    label={'Propietario'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />;
            case BarOptions.inmueble : 
                return <InmuebleCard 
                    icon={<HouseSidingIcon fontSize='large'/>}
                    label={'Inmueble'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.ejecutor : 
                return <EjecutorCard 
                    icon={<Person4Icon fontSize='large' />}
                    label={'Ejecutor'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.obra : 
                return <ObraCard 
                    icon={<ConstructionIcon fontSize='large' />}
                    label={'Obra'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.servicios : 
                return <ServiciosCard 
                    icon={<WaterIcon fontSize='large' />}
                    label={'Servicios'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.tala : 
                return <TalaCard 
                    icon={<ForestIcon fontSize='large'  />}
                    label={'Tala'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.planificador : 
                return <PlanificadorCard
                    icon={<Person3Icon fontSize='large'  />}
                    label={'Planificador'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.recibo : 
                return <ReciboCard 
                    icon={<ReceiptIcon fontSize='large'  />}
                    label={'Recibo 7B'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            case BarOptions.calcomania : 
                return form.calcomania 
                ? <CalcomaniaPDF3 form={form} />
                : <CalcomaniaCard 
                    icon={<TextSnippetTwoToneIcon fontSize='large' />}
                    label={'Calcomania'}
                    form={form}
                    handleFormChange={ handleFormChange }
                />
            default: return <></>
        }
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

                { getCard() }

            </Stack>
            

        </Stack>
    )
}
