export const getErrorMessage = ( error : any ) : string => {
    

    if( !!error.error
        && typeof error.error === 'string' 
        && error.error !== '' 
    ) return error.error;
    
    if( !!error.msg
        && typeof error.msg === 'string' 
        && error.msg !== '' 
    ) return error.msg;

    if( !!error.message
        && typeof error.message === 'string' 
        && error.message !== '' 
    ) return error.message;

    return error.toString() || 'Surgio un error, contacte con el administrador';
}