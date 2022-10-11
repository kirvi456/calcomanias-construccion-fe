import React, { ChangeEvent, useState } from 'react'
import { Stack, TextField, Button, Typography, Box, IconButton, MenuItem, Chip } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

type PisosSelectProp = {
    stringList : string[];
    name : string;
    label : string;
    handleArrayChange :  (name : string, stringList: string[]) => void;
}

export const PisosSelect : React.FC<PisosSelectProp> = ({stringList, name, label, handleArrayChange}) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = ( e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue(e.target.value);
    }

    const addToList = () => {
        if( !inputValue || inputValue == '' ) return;
        if( stringList.includes(inputValue) ) return;
        stringList.push(inputValue);
        handleArrayChange(name, stringList);
        setInputValue('');
    }

    const removeFromList = (index : number) => {
        stringList.splice(index, 1);
        handleArrayChange(name, stringList);
        setInputValue('');
    }

    return (
        <Stack width='100%'>
            <Stack direction='row' spacing={2}>
                <TextField 
                    select
                    value={inputValue}
                    onChange={ (e) => handleInputChange(e) }
                    label={label} 
                    variant="outlined" 
                    size='small' 
                    sx={{flex: '1'}}
                >
                    <MenuItem value='Primero'>Primero</MenuItem>
                    <MenuItem value='Segundo'>Segundo</MenuItem>
                    <MenuItem value='Tercero'>Tercero</MenuItem>
                    <MenuItem value='Cuarto'>Cuarto</MenuItem>
                    <MenuItem value='Quinto'>Quinto</MenuItem>
                    <MenuItem value='Sexto'>Sexto</MenuItem>
                    <MenuItem value='Septimo'>Septimo</MenuItem>
                    <MenuItem value='Octavo'>Octavo</MenuItem>
                    <MenuItem value='Noveno'>Noveno</MenuItem>
                    <MenuItem value='Decimo'>Decimo</MenuItem>
                    <MenuItem value='Decimo Primero'>Decimo Primero</MenuItem>
                    <MenuItem value='Decimo Segundo'>Decimo Segundo</MenuItem>
                    <MenuItem value='Decimo Tercero'>Decimo Tercero</MenuItem>
                    <MenuItem value='Decimo Cuarto'>Decimo Cuarto</MenuItem>
                    <MenuItem value='Decimo Quinto'>Decimo Quinto</MenuItem>
                </TextField> 
                <Button onClick={addToList}>Agregar</Button>
            </Stack>

            {
                stringList.length === 0
                ? (
                    <Box 
                        sx={{
                            p: 1, 
                            mt: 1,
                            mb: 1,
                            border: '1px solid',
                            borderColor: 'warning.main',
                            color: 'warning.main',
                            borderRadius: '0.5em',
                        }}>
                        <Typography sx={{textAlign: 'justify', width: 'calc(100% - 32px)'}}>
                            [ADVERTENCIA]: Aún no ingresa información
                        </Typography>
                    </Box>
                )
                : (
                    <Stack direction='row' flexWrap='wrap' justifyContent='center'>
                        {stringList.map((element, index) => {
                            return (
                                <Chip key={index} sx={{m: 1}} label={element} onDelete={() => removeFromList(index)} />
                                
                            )
                        })}
                    </Stack>
                )
            }
            

            
        </Stack>
    )
}