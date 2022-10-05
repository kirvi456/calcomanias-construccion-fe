import { Paper, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import { useNotification } from '../../hooks/useNotification';
import { borrarRubro } from '../../services/rubros';
import { Rubro } from '../../models/Rubro';

type CrudListItemProps = {
    _id: string,
    path : string,
    no: string,
    desc: string,
    unidad: string,
    handleDeleteSuccess: (result : Rubro) => void
}

export const CrudListItem : React.FC<CrudListItemProps> = ({ _id, no, desc, unidad, path, handleDeleteSuccess }) => {
    
    const { openErrorNotification } = useNotification();

    const deleteOption = async ( _id : string ) => {
        const { result, message, payload } = await borrarRubro( `${ path }/${ _id }`, undefined );
        if( !result ) openErrorNotification( message );
        else handleDeleteSuccess( payload! )
    }

    return (
        <Paper sx={{ p: 1, mt: 1}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography>
                    <strong>{ no }: </strong>{ desc } ({unidad})
                </Typography>

                <Tooltip title='Borrar'>
                    <IconButton aria-label="delete"
                        onClick= { () => { deleteOption(_id) }}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Paper>
    )
}
