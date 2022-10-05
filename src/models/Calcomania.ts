import { Rubro } from "./Rubro"

export type Calcomania = {
    direccion: string,
    vencimiento: number,
    norecibo: number,
    rubros: ( Rubro & { cantidad : number} )[] 
}

export const EmptyCalcomania : Calcomania = {
    direccion: '',
    vencimiento: ( new Date() ).getTime() ,
    norecibo: 0,
    rubros: []
}