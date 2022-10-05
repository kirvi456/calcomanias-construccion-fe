import * as yup from 'yup';

export const ValidateRegistroForm = yup.object().shape({
    rol: yup.string().trim().required('El rol es requerido'),
    pwConfirmation: yup.string().test('comparariguales', 'Las Contraseñas no coinciden', (value, context) => {
        return value === context.parent.pw;
    }),
    pw: yup.string().trim().required('La Contraseña es requerido') 
    .min(8, 'La Contraseña debe de tener al menos 8 caracteres'),
    usuario: yup.string().trim().required('El Usuario es requerido'),
    correo: yup.string().trim().required('El Correo es requerido').email('El correo no es valido'),
    nombre: yup.string().trim().required('El Usuario es requerido'),
})