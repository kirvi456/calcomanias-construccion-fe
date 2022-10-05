import React, { useContext } from 'react'
import { Stack, Container, Typography } from '@mui/material'
import { CrudCard } from './CrudCard'
import { URLSContext } from '../../context/URLs.context';

export const AdminRubrosPage = () => {

    const URLS = useContext( URLSContext );

    return (
        <Container>
            <Stack spacing={2}>
                <Typography 
                    variant='h3'
                    textAlign='center'
                >
                    Administración de Rubros
                </Typography>
                <CrudCard 
                    path  = { URLS.rubros } 
                    title = { 'Rubros' }
                />
            </Stack>
        </Container>
    )
}
