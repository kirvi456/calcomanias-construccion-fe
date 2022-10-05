import { FetchRequest } from "../utils/MakeRequest"

type ResponseCrud = {
    _id: string,
    nombre: string,
    active: string
}


export const crearTipoObra = async( url : string, body : any ) => {
    
    try{

        const { error, data } = await FetchRequest<ResponseCrud>( url, 'POST',  body );
    
        if( error ) return { result : false, message: error.message, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo crear. Intentelo más tarde.', payload: undefined}
}

export const bnorrarTipoObra = async( url : string, body : any ) => {
    
    try{

        const { error, data } = await FetchRequest<ResponseCrud>( url, 'DELETE',  body );
    
        if( error ) return { result : false, message: error.message, payload: undefined };
    
        if( data ) return { result : true, message: '', payload: data };


    } catch( error : any ){
        console.log( error )
        return { result : false, message: error.error as string, payload: undefined };
    }

    return { result: false, message: 'No se pudo crear. Intentelo más tarde.', payload: undefined}
}