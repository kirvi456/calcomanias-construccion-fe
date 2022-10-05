import React, { useContext, useEffect, useReducer } from 'react'
import { URLSContext } from '../../context/URLs.context'
import { FetchRequest } from '../../utils/MakeRequest'
import { AuthAction, AuthActionsKind } from '../models/enums'
import { Auth, User } from '../models/usert'
import { loginService } from '../services/login'
import { AuthContext } from './AuthContext'
import { authReducer } from './AuthReducer'

const initialState : Auth = {
    logged: false,
    user: undefined
}

type AuthProviderProps = {
    children : JSX.Element
}

const initSesion = () :Auth => {

    try {
    
        localStorage.getItem('user');
    
        const user = JSON.parse( localStorage.getItem('user') ?? 'null' ) ?? undefined;
    
        // TODO: Verificar que el usuario tenga estructura correcta


        return {
            logged: !!user,
            user: user
        }

    }
    catch ( error: any ){
        return {
            logged: false,
            user: undefined                
        }
    }
}


export const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {

    const { auth } = useContext( URLSContext )
    
    const [ authState, dispatch ] = useReducer( authReducer, initialState, initSesion )


    const verificacionToken = async () => {

        try{
            // Verificar que el token no haya expirado
            await FetchRequest(`${ auth }/validarsesion`, 'GET', undefined)
        }
        catch( error ){
            logout()
        }
    }

    useEffect(() => {
        verificacionToken()
    }, [])

    const login = async ( url: string, user : string, pw : string) : Promise<string> => {

        //Hacer la peticion al BE 
        const loginResponse = await loginService ( url, user, pw );

        //Cualquier error Reportarlo
        if( !loginResponse.response ) return loginResponse.message || '[ERROR]: Contacte con el administrador.';

        // Generar el payload a guardar con el reducer
        const respUser = loginResponse.data!;

        const userInfo : User = {
            ...respUser.usuarioInstancia,
            token: respUser.token,
            img : ''
        }

        // Definir la accion
        const action : AuthAction = {
            type: AuthActionsKind.login,
            payload: userInfo
        }

        // Disparar el cambio
        dispatch( action )

        // Grabar el usuario en el local storage
        window.localStorage.setItem( 'user', JSON.stringify( userInfo ) )
        window.localStorage.setItem( 'sesion-jwt', respUser.token )

        return '';

    }

    const logout = ()  => {        

        
        // Definir la accion
        const action : AuthAction = {
            type: AuthActionsKind.logout,
            payload: undefined
        }

        // Disparar el cambio
        dispatch( action )

        // Quitar el usuario en el local storage
        window.localStorage.removeItem( 'user' )
        window.localStorage.removeItem( 'sesion-jwt' )

    }

    return (
        <AuthContext.Provider 
            value = {{ 
                authState, 
                login,
                logout
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
