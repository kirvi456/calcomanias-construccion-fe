import React from 'react'
import { Dayjs } from 'dayjs';
import 'dayjs/locale/es'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextField } from '@mui/material'

type useDatePickerProps = {
    label: string
}

export const useDatePicker = ({ label } : useDatePickerProps) => {
    
    const [value, setValue] = React.useState<Dayjs | null>(null);

    return { component: (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
            <DatePicker
                label={ label }
                value={value}
                onChange={(newValue ) => {
                    setValue(newValue);
                }}
                renderInput={(params : any) => <TextField {...params} />}
            />
        </LocalizationProvider>
    ), value }

}
