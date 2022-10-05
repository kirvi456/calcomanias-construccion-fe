import { requestOptions } from "../config/request-config"

type RequestResponse<T> = {
    data?: T 
    error?: Error
}

export const FetchRequest = <T = unknown> (
    url : string, 
    method : 'GET' | 'POST' | 'PUT' | 'DELETE', 
    body : any
    ) : Promise<RequestResponse<T>> => {

    return new Promise ((resolve, reject) => {

        const token = window.localStorage.getItem('sesion-jwt') ?? '';

        
        const headers : HeadersInit = {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/javascript, */*;',
            'X-Access-Token': token
        }

        fetch(
            url, {
            method, 
            headers,           
            body: JSON.stringify(body),
            ...requestOptions 
        })
        .then(async (result) => {

            if( !result.ok ){
                throw new Error( ( await result.json() ).msg )
                
            } else return result.json();

        })
        .then(( data ) => {            
            
            resolve({data});
        
        })
        .catch(error => {
            reject( { 
                data: undefined,
                error : error.message ?? `No se pudo ralizar la petición a ${url}`
            } )
        });


    }) 

    
    
    
}




export const FetchRequestImg = (
    url : string, 
    method : 'GET' | 'POST' | 'PUT' | 'DELETE', 
    body : any
    ) : Promise<RequestResponse<string>> => {

    return new Promise ((resolve, reject) => {

        const token = window.localStorage.getItem('sesion-jwt') ?? '';

        const headers : HeadersInit = {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/javascript, */*;',
            'X-Access-Token': token
        }

        fetch(
            url, {
            method, 
            headers,           
            body: JSON.stringify(body),
            ...requestOptions 
        })
        .then(async (result) => {

            if( !result.ok ){
                throw new Error( ( await result.json() ).msg )
                
            } else return result.blob();

        })
        .then(( data ) => {            
            
            const blobURL = URL.createObjectURL(data);
            resolve({data : blobURL});
        
        })
        .catch(error => {
            reject( { 
                data: undefined,
                error : error.message ?? `No se pudo ralizar la petición a ${url}`
            } )
        });


    }) 

    
    
    
}