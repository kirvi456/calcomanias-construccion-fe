
export enum State {
    unregistered,
    registered,
    registering,
    normal
}

export enum Actions {
    save,
    goregistering,
    cancel,
    registering,

    savepropietario,
}

export type statePayload<T> = {
    state : State,
    object: T | undefined
}

export type Action<T> = {
    type: Actions,
    payload: statePayload<T>
}