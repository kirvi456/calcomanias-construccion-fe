import React from 'react'
import { Menu } from './Menu'
import { Container, Typography, Stack } from '@mui/material'

export const AdminPanelPage = () => {
    return (
        <Container>
            <Stack spacing={2}>
                <Typography 
                    variant='h2'
                    textAlign='center'
                >
                    Panel de Administración
                </Typography>
                <Menu />
            </Stack>
        </Container>
    )
}
