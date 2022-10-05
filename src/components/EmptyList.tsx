import React from 'react'
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import EmptySVG from '../../public/svg/empty.svg';

type EmptyListProps = {
    message: string
}

export const EmptyList : React.FC<EmptyListProps> = ({ message }) => {
    return (
        <Stack alignItems='center' spacing={2} sx={{mt: 2, mb: 2}}>
            <img 
                src={EmptySVG} 
                alt='empty list'
                style={{
                    width: '300px'
                }}
            />
            <Typography>
                { message }
            </Typography>
        </Stack>
    )
}
