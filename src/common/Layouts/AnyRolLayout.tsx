import React from 'react';
import {  Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';


export const AnyRolLayout : React.FC<{}> = () =>{
    
    return  ( 
        <> 
            <NavBar /> 
            <Outlet /> 
        </> 
    )   
    
}