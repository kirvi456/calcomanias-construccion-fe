export const EmptyRubro : Rubro = {
    _id: '',
    no: '',
    desc: '',
    unidad: true,
    unidadDesc: 'mts',
    active: true
}

export type Rubro = {
    _id: string,
    no: string,
    desc: string,
    unidad: boolean,
    unidadDesc: string,
    active?: boolean
}