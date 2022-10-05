import { Formulario, Inmueble, Propietario } from "../models/Formulario";
import { FetchRequest } from "../utils/MakeRequest";


export const actualizarFormulario = async <T>( url : string, body : T ) => {
    
    try{

        const { error, data } = await FetchRequest<Formulario>( url, 'PUT',  body );
    
        if( error ) return { result : false, message: error.message, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo crear. Intentelo más tarde.', payload: undefined}
}

export const inicializarFormulario = async( url : string, body : any ) => {
    
    try{

        const { error, data } = await FetchRequest<Formulario>( url, 'POST',  body );
    
        if( error ) return { result : false, message: error.message, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo crear. Intentelo más tarde.', payload: undefined}
}