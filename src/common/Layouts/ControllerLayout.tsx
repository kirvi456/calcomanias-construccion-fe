import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { NavBar } from '../NavBar/NavBar';


export const ControllerLayout : React.FC<{}> = () =>{
    
    const { authState } = useContext( AuthContext );

    const handleHome = () : JSX.Element => {
        switch( authState.user?.rol ){
            case 'ADMIN': return <Navigate to='/adminhome' />
            case 'DIGITADOR': return <Navigate to='/digitadorhome' />
            default: return <div>No rol</div>
        }
    }

    return (
        <>
        { handleHome() }
        </>
    )
}