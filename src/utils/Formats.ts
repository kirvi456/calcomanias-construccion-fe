
export const getDateString = ( date : number = 0 ) => {
    try {

        return (new Date( date ) ).toLocaleDateString(
            'es-ES', 
            {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit'
            }
        ) 
    } catch( error ) {
        return (new Date() ).toLocaleDateString(
            'es-ES', 
            {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit'
            }
        ) 
    }
}