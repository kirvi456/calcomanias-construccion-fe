import { User } from "./usert"

export enum AuthActionsKind {
    login,
    logout
}

export type AuthAction = {
    type: AuthActionsKind,
    payload: User | undefined
}

export type AuthState = {
    user: User
}