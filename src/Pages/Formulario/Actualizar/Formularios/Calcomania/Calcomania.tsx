import React, { useContext, useState } from 'react'
import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { State } from '../../Types/ReducerTypes'
import { EmptyCalcomania, Calcomania, RubroDesc } from '../../../../../models/Calcomania'
import { URLSContext } from '../../../../../context/URLs.context'
import { actualizarFormulario } from '../../../../../services/formularios'
import { useNotification } from '../../../../../hooks/useNotification'
import { useDatePicker } from '../../../../../hooks/useDatePicker'
import { Formulario } from '../../../../../models/Formulario'
import { RubrosSelector } from './RubrosSelector'


type CalcomaniaFromProps = {
    form: Formulario,
    handleFormChange2 : ( nuevo : Formulario ) => void,
    goToNormal: () => void,
    goToCancel: () => void
}

export const CalcomaniaForm : React.FC<CalcomaniaFromProps> = ({ form, handleFormChange2, goToNormal, goToCancel }) => {

    const URLS = useContext( URLSContext );
    const { openErrorNotification, openSuccessNotification } = useNotification();
    const [ calcomania, setCalcomania ] = useState<Calcomania>( () => form.calcomania ? form.calcomania : {...EmptyCalcomania });
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleFormChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        calcomania[ e.target.name as 'direccion' ] = e.target.value;
        setCalcomania( { ...calcomania } );
    }

    const { component, value } = useDatePicker({label: 'Fecha Vencimiento', initialValue: calcomania.vencimiento || 0});

    const registrarCalcomania = async() => {

        setLoading( true )
        const vencimiento = value?.toDate().getTime() || 0; 
        const { result, message } = await actualizarFormulario<Calcomania>( `${URLS.formulario}/actualizarcalcomania/${form.no}`, {...calcomania, vencimiento, norecibo: form.recibo!.no7b  } )
        
        if( !result ) {
            openErrorNotification( message )
            setLoading( false )
            return;
        }

        console.log('NO ERCIBO', form.recibo!.no7b)

        handleFormChange2( {...form, calcomania: {...calcomania, vencimiento, norecibo: form.recibo!.no7b }} )

        openSuccessNotification('Se actualizó el calcomania')   
        setLoading( false )
    }

    const setRubros = ( nuevos : RubroDesc[] ) => {
        calcomania.rubros = [ ...nuevos ];
        setCalcomania( {...calcomania } )
    }

    return (
        <Stack 
            spacing={2}
            sx={{
                p: 1
            }}
        >
            

            <TextField 
                size='small'
                type='text'
                
                label="Dirección" 
                name='direccion'
                variant="outlined" 
                fullWidth
                value={ calcomania.direccion }
                onChange={ handleFormChange }
            /> 

            { component }
            
            <TextField 
                disabled
                size='small'
                type='text'
                
                label="Recibo 7B No." 
                variant="outlined" 
                fullWidth
                value={ form.recibo!.no7b }
                onChange={ handleFormChange }
            /> 

            <TextField 
                disabled
                size='small'
                type='text'
                
                label="Pisos/Niveles" 
                variant="outlined" 
                fullWidth
                value={ form.obra!.niveles.join(', ') }
                onChange={ handleFormChange }
            /> 

            <Divider>Rubros</Divider>

            <RubrosSelector
                rubros={ calcomania.rubros }
                setRubros={setRubros}
            />

            <Stack>
                {
                    calcomania.rubros.map( (el, index) => (
                        <Typography key={index}>{el.no} {el.desc} {el.cantidad} </Typography>
                    ))
                }
            </Stack>

            <Stack spacing={1}>
                <LoadingButton
                    loading={loading}
                    variant='contained'
                    onClick={ registrarCalcomania }
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
