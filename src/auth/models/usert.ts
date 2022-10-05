
export type User = {
    _id: string,
    nombre: string,
    usuario: string,
    correo: string,
    img: string,
    rol: string, 
    token: string,
}

export type Auth = {
    logged: boolean,
    user: User | undefined
}

export type ProviderOutput = {
    authState : Auth,
    login : ( url : string, user : string, pw : string) => Promise<string>,
    logout: () => void
}