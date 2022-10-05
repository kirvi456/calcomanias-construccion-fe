import React from 'react'
import { Divider, Grid, Skeleton, Stack, Typography } from '@mui/material'

type CrudCardSkeletonProps = {
    title: string,
}

export const CrudCardSkeleton : React.FC<CrudCardSkeletonProps> = ({ title }) => {
    return (
        <Stack p={2} spacing={2}>
            <Typography variant='h6'>
                { title }
            </Typography>
            <Divider />
            <Grid
                container 
                spacing={1}
            >
                <Grid item xs={12} sm={8} md={10} >
                    <Stack spacing={1}>
                        <Skeleton variant="rectangular" height={40} /> 
                        <Skeleton variant="rectangular" height={40} /> 
                        <Skeleton variant="rectangular" height={40} /> 
                    </Stack>
                </Grid>
                
                
                <Grid item xs={12} sm={4} md={2} >
                    <Skeleton variant="rectangular" height={136} />
                </Grid>
                
            </Grid>
            <Stack spacing={2}>
                <Skeleton variant="rectangular" height={40} width='100%' />
                <Skeleton variant="rectangular" height={40} width='100%' />
            </Stack>
        </Stack>
    )
}
