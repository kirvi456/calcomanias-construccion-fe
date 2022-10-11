import { Rubro } from "./Rubro"

export type RubroDesc = ( Rubro & { cantidad : number} );

export type Calcomania = {
    _id: string,
    direccion: string,
    vencimiento: number,
    norecibo: number,
    rubros: RubroDesc[] 
}

export const EmptyCalcomania : Calcomania = {
    _id: '',
    direccion: '',
    vencimiento: ( new Date() ).getTime() ,
    norecibo: 0,
    rubros: []
}