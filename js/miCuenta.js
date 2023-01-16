const formularioDatosBasicos = document.querySelector('#formularioDatosBasicos');
const formularioDireccion = document.querySelector('#formularioDireccion');
const formularioDatosAcceso = document.querySelector('#formularioDatosAcceso');

usuarioActivo = {
        emailUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario,
        passwordUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].passwordUsuario
};
    
usuarioAModificar = JSON.parse(localStorage.getItem(usuarioActivo.emailUsuario));

const campos = {
    nombre: '#nombreMiCuenta',
    apellido: '#apellidoMiCuenta',
    razonSocial: '#razonSocialMiCuenta',
    cedula: '#ciMiCuenta',
    celular: '#celularMiCuenta',
    telefono: '#telefonoMiCuenta',
    departamento: '#departamentoMiCuenta',
    localidad: '#localidadMiCuenta',
    calle: '#calleMiCuenta',
    numeroPuerta: '#numeroPuertaMiCuenta',
    numeroApartamento: '#numeroApartamentoMiCuenta',
    codigoPostal: '#codigoPostalMiCuenta',
    passwordActual: '#passwordActualMiCuenta',
    passwordNueva: '#passwordNuevaMiCuenta',
    passwordNuevaRepetida: '#passwordNuevaRepetidaMiCuenta'
};

for (const propiedad in usuarioAModificar) {
    if (usuarioAModificar[propiedad]) {
        (propiedad !== 'emailUsuario' && propiedad !== 'passwordUsuario')?
        document.querySelector(campos[propiedad]).placeholder = usuarioAModificar[propiedad] :
    null;
}

}

formularioDatosBasicos.addEventListener('submit', (e) => {
    e.preventDefault();
    modificarDatosBasicos();
});

formularioDireccion.addEventListener('submit', (e) => {
    e.preventDefault();
    modificarDireccion();
});

formularioDatosAcceso.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#passwordActualMiCuenta').value === usuarioAModificar.passwordUsuario ?
        modificarPassword() :
        mostrarError(errorPasswordActualMiCuenta);
});


function modificarDatosBasicos() {

    const datos = new FormData(formularioDatosBasicos);
    const propiedades = ['nombre', 'apellido', 'razonSocial', 'cedula', 'celular', 'telefono'];

    for (let i = 0; i < propiedades.length; i++) {
        usuarioAModificar[propiedades[i]] = datos.get(propiedades[i]);
    }
    localStorage.setItem(usuarioActivo.emailUsuario, JSON.stringify(usuarioAModificar));

}

function modificarDireccion() {

    const datos = new FormData(formularioDireccion);
    const propiedades = ['departamento', 'localidad', 'calle', 'numeroPuerta', 'numeroApartamento', 'codigoPostal'];

    for (let i = 0; i < propiedades.length; i++) {
        usuarioAModificar[propiedades[i]] = datos.get(propiedades[i]);
    }
    localStorage.setItem(usuarioActivo.emailUsuario, JSON.stringify(usuarioAModificar));

}

function modificarPassword() {
    const passwordActual = document.querySelector('#passwordActualMiCuenta').value;
    const passwordNueva = document.querySelector('#passwordNuevaMiCuenta').value;
    const passwordRepetida = document.querySelector('#passwordRepetidaMiCuenta').value;
    const errorPasswordActual = errorPasswordActualMiCuenta;
    const errorPasswordNueva = errorPasswordNuevaMiCuenta;
    const errorPasswordRepetida = errorPasswordRepetidaMiCuenta;
    const registroCompleto = document.querySelector('#registroCompleto');

    ocultarError(errorPasswordActual);

    (passwordNueva.length <= 7) ?
        mostrarError(errorPasswordNueva) :
        (passwordNueva !== passwordRepetida) ?
            [ocultarError(errorPasswordNueva),
            mostrarError(errorPasswordRepetida)] :
            [ocultarError(errorPasswordRepetida),
            usuarioAModificar.passwordUsuario = passwordNueva,
            localStorage.setItem(usuarioActivo.emailUsuario, JSON.stringify(usuarioAModificar)),
            sessionStorage.setItem('Usuario Activo', JSON.stringify([usuarioAModificar])),
            document.querySelector('#passwordActualMiCuenta').value = '',
            document.querySelector('#passwordNuevaMiCuenta').value = '',
            document.querySelector('#passwordRepetidaMiCuenta').value = '',
            mostrarCompletado(registroCompleto)];

}



