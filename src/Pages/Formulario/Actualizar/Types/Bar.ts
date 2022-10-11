export enum BarOptions {
    propietario,
    inmueble,
    servicios,
    obra,
    planificador,
    ejecutor,
    tala,
    recibo,
    documentos,
    calcomania
}

export type BarItem = {
    icon: JSX.Element,
    label: string,
    component?: JSX.Element,
    selected: boolean,
    value:  BarOptions
}