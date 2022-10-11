import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextField } from '@mui/material'

type useDatePickerProps = {
    label: string,
    initialValue?: number
}

export const useDatePicker = ({ label, initialValue = 0} : useDatePickerProps) => {
    
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(initialValue));

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
