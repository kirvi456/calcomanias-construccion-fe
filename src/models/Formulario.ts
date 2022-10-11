import { Calcomania } from "./Calcomania"

export const EmptyPropietario = {
    nombres: '',
    apellidos: '',
    direccion: '',
    telefonos: [],
    email: '',
    dpi: '',
    extendido: ''
}
export type Propietario = {
    nombres: string,
    apellidos: string,
    direccion: string,
    telefonos: string[],
    email: string,
    dpi: string,
    extendido: string
}

export const EmptyInmueble : Inmueble = {
    direccion: '',
    noFinca: '',
    folio: '',
    libro: '',
    area: 0,
    frente: 0,
    fondo: 0,
    irregular: false
}

export type Inmueble = {
    direccion: string,
    noFinca: string,
    folio: string,
    libro: string,
    area: number,
    frente: number,
    fondo: number,
    irregular: boolean
}

export const EmptyObra : Obra = {
    tipo: '',
    area: 0,
    movimientoTierra: false,
    metrosCubicos: 0,
    demolicion: false,
    metrosCuadrados: 0,
    meses: 0,
    niveles: [],
    tipoUso: '',
    costoEstimado: 0,
}

export type Obra = {
    tipo: string,
    area: number,
    movimientoTierra: boolean,
    demolicion: boolean,
    metrosCuadrados: number,
    metrosCubicos: number,
    meses: number,
    niveles: string[],
    tipoUso: string,
    costoEstimado: number,
}

export const EmptyServicios : Servicios = {
    aguaPotable: '',
    drenajeSanitario: '',
    drenajePluvial: '',
    otros: []
}

export type Servicios = {
    aguaPotable: string,
    drenajeSanitario: string,
    drenajePluvial: string,
    otros: string[]
}

export const EmptyTala = {
    necesario: false,
    tipo: ''
}

export type Tala = {
    necesario: boolean,
    tipo: string
}

export const EmptyPlanificador : Planificador = {
    nombres: '',
    apellidos: '',
    direccion: '',
    telefonos: [],
    email: '',
    dpi: '',
    colegiado: false,
    profesion: '',
    extendido: ''
}

export type Planificador = {
    nombres: string,
    apellidos: string,
    direccion: string,
    telefonos: string[],
    email: string,
    dpi: string,
    colegiado: boolean,
    profesion: string,
    extendido: string
}

export const EmptyEjecutor : Ejecutor = {
    nombres: '',
    apellidos: '',
    direccion: '',
    telefonos: [],
    email: '',
    dpi: '',
    colegiado: false,
    profesion: '',
    extendido: ''
}

export type Ejecutor = {
    nombres: string,
    apellidos: string,
    direccion: string,
    telefonos: string[],
    email: string,
    dpi: string,
    colegiado: boolean,
    profesion: string,
    extendido: string
}

export const EmptyRecibo : Recibo = {
    no7b: 0,
    fecha: (new Date()).getTime(),
    total: 0
}

export type Recibo = {
    no7b: number,
    fecha: number,
    total: number
}

export const EmptyFormulario : Formulario = {
    _id: '',
    no: 0,
    fechaEntrega: 0,
    createdAt: 0,
    userCreated: ''
}


export type Formulario = {
    _id: string,
    no: number,
    fechaEntrega: number,
    propietario?: Propietario,
    inmueble?: Inmueble,
    obra?: Obra,
    servicios?: Servicios,
    tala?: Tala,
    planificador?: Planificador,
    ejecutor?: Ejecutor,
    createdAt: number,
    userCreated: string,
    modifiedAt?: number,
    userLastModification?: string,
    recibo?: Recibo,
    calcomania?: Calcomania,
    recibopdf?: string
    formulariopdf?: string
    obligacionpdf?: string
}
