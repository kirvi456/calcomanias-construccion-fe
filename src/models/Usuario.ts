export interface Usuario {
    nombre: string;
    usuario: string;
    correo: string;
    pw: string;
    rol: string;    
}

export const emptyUsuario : Usuario = {
    nombre: '',
    usuario: '',
    correo: '',
    pw: '',
    rol: '',
}
