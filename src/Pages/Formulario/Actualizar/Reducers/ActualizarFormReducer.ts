import { Action, Actions, State, statePayload } from "../Types/ReducerTypes";



export const InmuebleReducer = <T>( state : statePayload<T>, action : Action<T> ) : statePayload<T> => {

    switch( action.type ){

        case Actions.save: 
            return {
                ...state,
                state: State.normal,
                object: {...action.payload.object!}
            }
        
        case Actions.save: 
            return {
                ...state,
                state: State.normal,
                object: {...action.payload.object!}
            }

        case Actions.cancel: 
            return {
                ...state,
                state: action.payload.object === undefined ? State.unregistered : State.normal,
                object: action.payload.object === undefined ? undefined : {...action.payload.object!}
            }

        case Actions.goregistering: 
            return {
                ...state,
                state: State.registering,
                object: action.payload.object === undefined ? undefined : {...action.payload.object}
            }
        default: return state;
    }

}