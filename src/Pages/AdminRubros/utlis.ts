import { Rubro } from "../../models/Rubro"

export const sortArray = ( arr : Rubro[] ) => {
    arr.sort( ( item1, item2 ) => (
            item1.no.toUpperCase() < item2.no.toUpperCase() 
            ? -1
            : 1
        )   
    )
}