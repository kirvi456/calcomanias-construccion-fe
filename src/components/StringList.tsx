import React, { ChangeEvent, useState } from 'react'
import { Stack, TextField, Button, Typography, Box, IconButton } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

type StringListProp = {
    stringList : string[];
    name : string;
    label : string;
    handleArrayChange :  (name : string, stringList: string[]) => void;
}

export const StringList : React.FC<StringListProp> = ({stringList, name, label, handleArrayChange}) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = ( e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue(e.target.value);
    }

    const addToList = () => {
        if( !inputValue || inputValue == '' ) return;
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
                    value={inputValue}
                    onChange={ (e) => handleInputChange(e) }
                    label={label} 
                    variant="outlined" 
                    size='small' 
                    sx={{flex: '1'}}
                /> 
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
                    <Stack>
                        {stringList.map((element, index) => {
                            return (
                                <Box 
                                    key={'element' + index} 
                                    sx={{
                                        p: 1, 
                                        mt: 1,
                                        mb: 1,
                                        border: '1px solid',
                                        borederColor: 'divider',
                                        borderRadius: '0.5em'   ,
                                        position: 'relative' 
                                    }}>
                                    <Typography sx={{textAlign: 'justify', width: 'calc(100% - 32px)'}}>
                                        {element}
                                    </Typography>
                                    <IconButton 
                                        color="primary" 
                                        aria-label="upload picture" 
                                        component="span"
                                        onClick={() => removeFromList(index)}
                                        sx={{position: 'absolute', top: 0, right: 0}}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            )
                        })}
                    </Stack>
                )
            }
            

            
        </Stack>
    )
}