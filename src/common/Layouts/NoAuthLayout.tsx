import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth';


export const NoAuthLayout : React.FC<{}> = () =>{
    
    const { authState } = useContext( AuthContext );

    return (
        <>
            {
                ! authState.logged
                ? <Outlet />
                : <Navigate to='/' />
            }
        </>
    )
}