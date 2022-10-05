import React from "react";
import { NotificationContext } from "../context/Notification.context";



export const useNotification = () => {
    const context = React.useContext(NotificationContext)
    if(!context) throw new Error('No existe contexto de Notificaciones');
    return context;
} 