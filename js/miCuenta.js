const formularioDatosBasicos = document.querySelector('#formularioDatosBasicos');
const formularioDireccion = document.querySelector('#formularioDireccion');
const formularioDatosAcceso = document.querySelector('#formularioDatosAcceso');
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


usuarioActivo = {
        emailUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario,
        passwordUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].passwordUsuario
};
    
usuarioAModificar = JSON.parse(localStorage.getItem(usuarioActivo.emailUsuario));
modificarUsuarioActivo = JSON.parse(sessionStorage.getItem('Usuario Activo'));

for (const propiedad in usuarioAModificar) {
    if (usuarioAModificar[propiedad]) {
        (propiedad !== 'emailUsuario' && propiedad !== 'passwordUsuario')?
        document.querySelector(campos[propiedad]).placeholder = usuarioAModificar[propiedad] :
    null;
}

}

formularioDatosBasicos.addEventListener('submit', (e) => {
    e.preventDefault();
    validarDatosBasicos();
});

formularioDireccion.addEventListener('submit', (e) => {
    e.preventDefault();
    validarDireccion();
});

formularioDatosAcceso.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#passwordActualMiCuenta').value === usuarioAModificar.passwordUsuario ?
        modificarPassword() :
        mostrarElemento(errorPasswordActualMiCuenta);
});

function validarCampo(nombreCampo, valorCampo) {
    if (valorCampo === "") {
        return false;
    } else {
        switch (nombreCampo) {
            case 'cedula':
                if (valorCampo.length === 8) {
                    return true;
                } else {
                    return false;
                }
            case 'celular':
                if (valorCampo.length === 9) {
                    return true;
                } else {
                    return false;
                }
            case 'telefono':
                if (valorCampo.length === 8) {
                    return true;
                } else {
                    return false;
                }
            case 'numeroPuerta':
                if (valorCampo.length >= 4) {
                    return true;
                } else {
                    return false;
                }
            case 'numeroApartamento':
                if (valorCampo.length >= 4) {
                    return true;
                }
            case 'codigoPostal':
                if (valorCampo.length >= 4) {
                    return true;
                }
            case 'passwordNueva':
                if (valorCampo.length >= 8) {
                    return true;
                }
            case 'passwordNuevaRepetida':
                if (valorCampo.length >= 8) {
                    return true;
                } else {
                    return false;
                }
            default:
                return true;
        }
    }
}

function validarDatosBasicos() {
    const datos = new FormData(formularioDatosBasicos);
    const propiedadesDatosBasicos = ['nombre', 'apellido', 'razonSocial', 'cedula', 'celular', 'telefono'];
    let formularioValido = true;

    propiedadesDatosBasicos.forEach(propiedad => {
        if (!validarCampo(propiedad, datos.get(propiedad)) && propiedad !== 'razonSocial' && propiedad !== 'telefono') {
            formularioValido = false;
            document.querySelector(`#${propiedad}Requerido`).classList.remove('hidden');
        } else {
            document.querySelector(`#${propiedad}Requerido`).classList.add('hidden');
        }
    });

    if (formularioValido) {
        for (let i = 0; i < propiedadesDatosBasicos.length; i++) {
            usuarioAModificar[propiedadesDatosBasicos[i]] = datos.get(propiedadesDatosBasicos[i]);
        }
        localStorage.setItem(usuarioActivo.emailUsuario, JSON.stringify(usuarioAModificar));
        confirmacionDatosBasicos.classList.remove('hidden');
        setTimeout(() => {
            confirmacionDatosBasicos.classList.remove('hidden');
            location.reload();
        }, 3000);
    } else {
        return;
    }
}    

function validarDireccion() {

    const datos = new FormData(formularioDireccion);
    const propiedadesDireccion = ['departamento', 'localidad', 'calle', 'numeroPuerta', 'numeroApartamento', 'codigoPostal'];
    let formularioValido = true;

    propiedadesDireccion.forEach(propiedad => {
        if (!validarCampo(propiedad, datos.get(propiedad)) && propiedad !== 'numeroApartamento' && propiedad !== 'codigoPostal') {
            formularioValido = false;
            document.querySelector(`#${propiedad}Requerido`).classList.remove('hidden');
        } else {
            document.querySelector(`#${propiedad}Requerido`).classList.add('hidden');
        }
    });

    if (formularioValido) {
        for (let i = 0; i < propiedadesDireccion.length; i++) {
            usuarioAModificar[propiedadesDireccion[i]] = datos.get(propiedadesDireccion[i]);
        }
        localStorage.setItem(usuarioActivo.emailUsuario, JSON.stringify(usuarioAModificar));
        confirmacionDireccion.classList.remove('hidden');
        setTimeout(() => {
            confirmacionDireccion.classList.add('hidden');
            location.reload();
        }, 2000);
    } else {
        return;
    }
}

function modificarPassword() {
    const passwordNueva = document.querySelector('#passwordNuevaMiCuenta').value;
    const passwordRepetida = document.querySelector('#passwordRepetidaMiCuenta').value;
    const errorPasswordActual = errorPasswordActualMiCuenta;
    const errorPasswordNueva = errorPasswordNuevaMiCuenta;
    const errorPasswordRepetida = errorPasswordRepetidaMiCuenta;
    const registroCompleto = document.querySelector('#registroCompleto');

    ocultarElemento(errorPasswordActual);

    (passwordNueva.length <= 7) ?
        mostrarElemento(errorPasswordNueva) :
        (passwordNueva !== passwordRepetida) ?
            [ocultarElemento(errorPasswordNueva),
            mostrarElemento(errorPasswordRepetida)] :
            [ocultarElemento(errorPasswordRepetida), ocultarElemento(errorPasswordRepetida),
            usuarioAModificar.passwordUsuario = passwordNueva,
            localStorage.setItem(usuarioActivo.emailUsuario, JSON.stringify(usuarioAModificar)),
            sessionStorage.setItem('Usuario Activo', JSON.stringify([usuarioAModificar])),
            document.querySelector('#passwordActualMiCuenta').value = '',
            document.querySelector('#passwordNuevaMiCuenta').value = '',
            document.querySelector('#passwordRepetidaMiCuenta').value = '',
            mostrarCompletado(registroCompleto)];

}




