import { Rubro } from "../models/Rubro";
import { FetchRequest } from "../utils/MakeRequest";

export const crearRubro = async( url : string, body : any ) => {
    
    try{

        const { error, data } = await FetchRequest<Rubro>( url, 'POST',  body );
    
        if( error ) return { result : false, message: error.message, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo crear. Intentelo más tarde.', payload: undefined}
}

export const borrarRubro = async( url : string, body : any ) => {
    
    try{

        const { error, data } = await FetchRequest<Rubro>( url, 'DELETE',  body );
    
        if( error ) return { result : false, message: error.message, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo borrar. Intentelo más tarde.', payload: undefined}
}