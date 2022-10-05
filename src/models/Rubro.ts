export const EmptyRubro : Rubro = {
    _id: '',
    no: '',
    desc: '',
    unidad: '',
    active: true
}

export type Rubro = {
    _id: string,
    no: string,
    desc: string,
    unidad: string,
    active?: boolean
}