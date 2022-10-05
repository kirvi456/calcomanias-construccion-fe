import React from 'react';

type URLSList = {
    auth        : string;
    usuario     : string;
    tipoobra    : string;
    movtierra   : string;
    aguapotable : string;
    drenajesanitario    : string;
    drenajepluvial      : string;
    tipotala            : string;
    formulario          : string;
    rubros              : string;
}

console.log(import.meta.env.VITE_APP_BASE_URL)

const myURLS : URLSList = {
    auth:                   `${import.meta.env.VITE_APP_BASE_URL}api/auth`,
    usuario:                `${import.meta.env.VITE_APP_BASE_URL}api/usuarios`,
    
    tipoobra:               `${import.meta.env.VITE_APP_BASE_URL}api/obratipo`,
    movtierra:              `${import.meta.env.VITE_APP_BASE_URL}api/movimientotierratipo`,
    aguapotable:            `${import.meta.env.VITE_APP_BASE_URL}api/aguapotabletipo`,
    drenajepluvial:         `${import.meta.env.VITE_APP_BASE_URL}api/drenajepluvialtipo`,
    drenajesanitario:       `${import.meta.env.VITE_APP_BASE_URL}api/drenajesanitariotipo`,
    tipotala:               `${import.meta.env.VITE_APP_BASE_URL}api/talatipo`,
    formulario:             `${import.meta.env.VITE_APP_BASE_URL}api/formularios`,
    rubros:                 `${import.meta.env.VITE_APP_BASE_URL}api/rubro`,
}


export const URLSContext = React.createContext<URLSList >(myURLS);

export const URLSProvider : React.FC<{children : JSX.Element}> = ({children}) => {

    const value = myURLS;

    return (
        <URLSContext.Provider value={value}>
            { children }
        </URLSContext.Provider>
    )
}