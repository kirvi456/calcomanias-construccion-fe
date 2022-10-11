import React, { useContext, useEffect, useState } from 'react'
import { Button, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { RubroDesc } from '../../../../../models/Calcomania'
import { URLSContext } from '../../../../../context/URLs.context'
import useFetch from '../../../../../hooks/useFetch'
import { Rubro } from '../../../../../models/Rubro'
import { useNotification } from '../../../../../hooks/useNotification'

type RubrosSelectorProps = {
    rubros: RubroDesc[],
    setRubros: ( nuevos : RubroDesc[] ) => void
}

const EmptyCantidadOptions : CantidadOptionsType = {
    disabled: false,
    value: '',
    unidades: 'mts',
}

type CantidadOptionsType = {
    disabled: boolean,
    value: string,
    unidades: string,
}

export const RubrosSelector : React.FC<RubrosSelectorProps> = ({ rubros, setRubros }) => {

    const { openErrorNotification } = useNotification();

    const [ options, setOptions ] = useState<Rubro[]>([])
    const [ rubro, setRubro ] = useState<string>('')
    const [ selected, setSelected ] = useState<RubroDesc>()

    const [ cantidadOptions, setCantidadOptions ] = useState<CantidadOptionsType>( EmptyCantidadOptions );



    const URLS = useContext( URLSContext )

    const { data, error } = useFetch<{ result: Rubro[] }>( URLS.rubros )

    useEffect(()=>{
        if( data ) setOptions( [ ...data.result.map(el => el ) ] )
    }, [ data ])


    const handleRubroChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const currentSelected = e.target.value;
        const currentRubro = options.find( el => el._id === currentSelected )
        setRubro( currentSelected )
        setCantidadOptions({
            disabled: currentRubro ? !currentRubro.unidad : false,
            value: '',
            unidades: currentRubro ? currentRubro.unidad ? currentRubro.unidadDesc : '' : ''
        })
        setSelected({...currentRubro!, cantidad: 0})
    }

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCantidadOptions((prev) => ({ ...prev, value: e.target.value }))
    }

    const addRubro = () => {
        if( !selected ) return;
        if( cantidadOptions.unidades && Number(cantidadOptions.value) === 0 ){
            openErrorNotification(
                'Es necesario indicar la cantidad de ' + 
                ( selected?.unidadDesc || 'mts' ) 
            )
            return;
        }
        rubros.push( {...selected!, cantidad: Number(cantidadOptions.value) } )
        setRubros([...rubros])
    }

    return (
        <Stack>
            <Stack spacing={1}>
                <TextField 
                    select
                    size='small'
                    type='text'
                    
                    label="Rubro" 
                    variant="outlined" 
                    fullWidth
                    onChange={handleRubroChange}
                    value={rubro || ''}
                >
                    {   
                        options.map( (el) => (
                            <MenuItem key={el._id} value={el._id}>
                                {el.no} {el.desc}
                            </MenuItem>
                        )) 
                    }
                </TextField> 
                <Stack direction='row' spacing={1}>
                    <TextField 
                        disabled={cantidadOptions.disabled}
                        value={cantidadOptions.value}
                        size='small'
                        type='number'
                        
                        label="Cantidad" 
                        variant="outlined" 
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="start">{cantidadOptions.unidades}</InputAdornment>,
                        }}
                        onChange={handleCantidadChange}
                    /> 
                    <Button
                        onClick={addRubro}
                        variant='contained'
                    >
                        Agregar
                    </Button>
                </Stack>
            </Stack>

            
        </Stack>
    )
}
