import { Propietario } from "../../../../models/Formulario"

export enum PropietatioState {
    unregistered,
    registered,
    registering,
    normal
}

export enum PropietarioActions {
    save,
    goregistering,
    cancel,
    registering,
}

export type statePayload = {
    state : PropietatioState,
    propietario: Propietario | undefined
}

export type PropietarioAction = {
    type: PropietarioActions,
    payload: statePayload
}