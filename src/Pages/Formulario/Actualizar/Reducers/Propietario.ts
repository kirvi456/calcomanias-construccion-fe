import { EmptyPropietario } from "../../../../models/Formulario";
import { PropietarioAction, PropietarioActions, PropietatioState, statePayload } from "../Types/Propietario";



export const PropietarioReducer = ( state : statePayload, action : PropietarioAction ) : statePayload => {

    switch( action.type ){

        case PropietarioActions.save: 
            return {
                ...state,
                state: PropietatioState.normal,
                propietario: {...action.payload.propietario!}
            }

        case PropietarioActions.cancel: 
            return {
                ...state,
                state: action.payload.propietario === undefined ? PropietatioState.unregistered : PropietatioState.normal,
                propietario: action.payload.propietario === undefined ? undefined : {...action.payload.propietario!}
            }

        case PropietarioActions.goregistering: 
            return {
                ...state,
                state: PropietatioState.registering,
                propietario: action.payload.propietario === undefined ? undefined : {...action.payload.propietario}
            }
        default: return state;
    }

}