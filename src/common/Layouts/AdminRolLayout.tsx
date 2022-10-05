import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { NavBar } from '../NavBar/NavBar';


export const AdminRolLayout : React.FC<{}> = () =>{
    
    const { authState } = useContext( AuthContext );

    return (        
        authState.user?.rol === 'ADMIN'
        ? ( <> <NavBar /> <Outlet /> </> )
        : <Navigate to='/' />        
    )
}