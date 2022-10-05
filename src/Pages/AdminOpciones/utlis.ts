import { ItemSchema } from "./types"

export const sortArray = ( arr : ItemSchema[] ) => {
    arr.sort( ( item1, item2 ) => (
            item1.nombre.toUpperCase() < item2.nombre.toUpperCase() 
            ? -1
            : 1
        )   
    )
}