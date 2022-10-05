import React from 'react'
import { Container, Typography, Stack } from '@mui/material'
import { CrudList } from './CrudList'

export const AdminOpcionesPage = () => {
    return (
        <Container>
            <Stack spacing={2}>
                <Typography 
                    variant='h3'
                    textAlign='center'
                >
                    Administración de Opciones
                </Typography>
                <CrudList />
            </Stack>
        </Container>
    )
}
