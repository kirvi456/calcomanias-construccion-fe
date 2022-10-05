import React from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import { BarItem, BarOptions } from './Types/Bar'

type MenuBarProps = {
  options : BarItem[],
  handleSelect: (optionSelect: BarOptions) => void
}

export const MenuBar : React.FC<MenuBarProps> = ( { options, handleSelect } ) => {
    return (
      <Stack sx={{ maxWidth: '90%', overflowX: 'auto' }}>
        <Stack direction='row' spacing={2} sx={{mt: 2, maxWidth: '100%', pl: 2, pr: 2}}>
          {
            options.map( (el, index) => (
              
              <Paper
                key={index}
                onClick={ () => handleSelect(el.value) }
                sx={{
                  cursor: 'pointer',
                  p: 1,
                  minWidth: '75px',
                  color: el.selected ? 'primary.main' : ''
                }}
                elevation={el.selected ? 15 : 3 }
              >
                <Stack alignItems='center' spacing={1}>

                  {el.icon}

                  <Typography variant='caption'>
                    {el.label}
                  </Typography>

                </Stack>
              </Paper>
            ))
          }
        </Stack>
      </Stack>
    )
}
