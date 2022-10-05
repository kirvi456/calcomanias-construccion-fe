
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NoAuthLayout, AuthLayout } from './common/Layouts';
import { AdminRolLayout } from './common/Layouts/AdminRolLayout';
import { AnyRolLayout } from './common/Layouts/AnyRolLayout';
import { ControllerLayout } from './common/Layouts/ControllerLayout';
import { AdminOpcionesPage } from './Pages/AdminOpciones';
import { AdminPanelPage } from './Pages/AdminPanel';
import { AdminRubrosPage } from './Pages/AdminRubros';
import { ActualizarFormPage } from './Pages/Formulario/Actualizar';
import { InicializadorFormPage } from './Pages/Formulario/Inicializar';


import { AdminHomePage } from './Pages/Home/admin';
import { DigitadorHomePage } from './Pages/Home/digitador';
import { LoginPage } from './Pages/Login';
import { RegistrarPage } from './Pages/Registrar';


export const AppRouter : React.FC<{}> = () => {
    return (
        <Routes>


            <Route path='/' element={<AuthLayout />}>

                <Route path='/' element={<ControllerLayout />} />

                <Route path='/' element={<AdminRolLayout />} >
                    <Route path='/adminhome' element={<AdminHomePage />} />
                    <Route path='/adminpanel' element={<AdminPanelPage />} />
                    <Route path='/adminopciones' element={<AdminOpcionesPage />} />
                    <Route path='/adminrubros' element={<AdminRubrosPage />} />
                    <Route path='/registro' element={<RegistrarPage />} />
                </Route>

                <Route path='/' element={<AnyRolLayout />} >
                    <Route path='/digitadorhome' element={<DigitadorHomePage />} /> 
                    <Route path='/iniciarform' element={<InicializadorFormPage />} /> 
                    <Route path='/formulario' element={<ActualizarFormPage />} /> 
                </Route>

            </Route>

            <Route path='/' element={<NoAuthLayout />}>
                <Route path='/login' element={<LoginPage />} />
            </Route>

            <Route path='*' element={ <div>404</div> }/>

        </Routes>
    )
}