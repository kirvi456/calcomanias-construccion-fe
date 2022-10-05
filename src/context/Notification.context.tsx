import { AlertColor } from '@mui/material';
import React, { useState } from 'react';
import { Notification } from '../components';

type ContextProps = {
    openErrorNotification: (msg: string) => void,
    openSuccessNotification: (msg: string) => void,
}

export const NotificationContext = React.createContext<ContextProps | null>(null);

export const NotificationProvider : React.FC<{children : JSX.Element}> = ({children,}) => {

    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('info');


    const handleClose = () => {
        setOpen(false);
    }

    const openErrorNotification = (msg: string) => {
        setMsg(msg);
        setSeverity('error');
        setOpen(true);
    }

    const openSuccessNotification = (msg: string) => {
        setMsg(msg);
        setSeverity('success');
        setOpen(true);
    }

    const value = {
        openErrorNotification,
        openSuccessNotification,
    }

    return (
        <NotificationContext.Provider value={value}>
            <Notification 
                handleClose={ handleClose } 
                msg={ msg }
                open={ open }
                severity= { severity }
            />
            { children }
        </NotificationContext.Provider>
    )
}

