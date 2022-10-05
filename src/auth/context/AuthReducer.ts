import { AuthAction, AuthActionsKind } from "../models/enums";
import { Auth } from "../models/usert";


export const authReducer = (state : Auth , action : AuthAction ) : Auth => {

    const { type, payload } = action;

    switch( type ) {
        case AuthActionsKind.login:
            return {
                ...state,
                logged: true,
                user: payload
            };
        
        case AuthActionsKind.logout:
            return {
                logged: false,
                user: undefined
            };

        default:
            return {
                logged: false,
                user: undefined
            };
    }

}