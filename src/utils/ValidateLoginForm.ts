import * as yup from 'yup';

export const ValidateLoginForm = yup.object().shape({
    password: yup.string().trim().required('La Contraseña es requerido') 
    .min(8, 'La Contraseña debe de tener al menos 8 caracteres'),
    user: yup.string().trim().required('El Usuario es requerido'),
})