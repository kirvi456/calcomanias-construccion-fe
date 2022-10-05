import React, { useEffect, useState } from 'react'
import { MenuItem, TextField } from '@mui/material'
import useFetch from '../hooks/useFetch'

type APISelectProps = {
    url: string,
    value : string,
    label : string,
    name : string,
    disabled?: boolean,
    onChange : ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void,
}

type ResponseType = {
    result : {
        _id: string,
        nombre: string,
        active: boolean
    }[]
}

export const APISelect : React.FC<APISelectProps> = ({ label, name, url, value, disabled, onChange }) => {

    const [ options, setOptions ] = useState<string[]>( [] );
    const { data, error } = useFetch<ResponseType>( url )

    useEffect(()=>{
        if( data ) setOptions( [ ...data.result.map(el => el.nombre) ] )
    }, [ data ])

    return (
        <>
            <TextField 
                select
                size='small'
                type='text'
            
                label={ label } 
                name={ name }
                variant="outlined" 
                fullWidth
                value={ value }
                onChange={ onChange }
                disabled={ disabled }
            >
                {
                    options.map( ( el, index ) => (
                        <MenuItem key={index} value={el}>{ el } </MenuItem>
                    ))
                }
            </TextField> 
        </>
    )
}
