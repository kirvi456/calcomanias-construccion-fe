import { Paper, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import { bnorrarTipoObra } from '../../services/cruds';
import { useNotification } from '../../hooks/useNotification';
import { ItemSchema } from './types';

type CrudListItemProps = {
    _id: string,
    nombre: string,
    path : string,
    handleDeleteSuccess: (result : ItemSchema) => void
}

export const CrudListItem : React.FC<CrudListItemProps> = ({ _id, nombre, path, handleDeleteSuccess }) => {
    
    const { openErrorNotification } = useNotification();

    const deleteOption = async ( _id : string ) => {
        const { result, message, payload } = await bnorrarTipoObra( `${ path }/${ _id }`, undefined );
        if( !result ) openErrorNotification( message );
        else handleDeleteSuccess( payload! )
    }

    return (
        <Paper sx={{ p: 1, mt: 1}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography>
                    { nombre }
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
