import React, { useState } from 'react'

import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordInputProps = OutlinedInputProps 
& {size : 'small' | 'medium' | undefined}
;

export const PasswordInput = (props : PasswordInputProps) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const mySize = props.size || 'medium';

    return (
        <FormControl variant="outlined" size={mySize}>
            <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}                
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword( c => !c )}
                        onMouseDown={ (e) => { e.preventDefault() }}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                {...props}
            />
        </FormControl>
    )
}
