// Función para mostrar y ocultar elementos, según el estado de la sesión
function sesion() {

    const nombreCuenta = document.querySelector('.nombreCuenta');
    const eliminarCuenta = document.getElementById('eliminarCuenta');

    // Se verifica si existe un usuario activo en la sesión
    sessionStorage.getItem('Usuario Activo') !== null ?
        
        // Se muestra el email en el menú de la cuenta y se oculta el menú de registro e ingreso
        [mostrarElemento(bienvenido), ocultarElemento(registroHeader), ocultarElemento(ingresarHeader), mostrarElemento(dropCuenta), nombreCuenta.innerHTML = JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario] :
    
        // Se oculta el menú de la cuenta y se muestra el menú de registro e ingreso
        [ocultarElemento(bienvenido), mostrarElemento(registroHeader), mostrarElemento(ingresarHeader), ocultarElemento(dropCuenta)]; 
    
    // Función para eliminar la cuenta
    function eliminarUsuario() {
        
        // Se crea un evento para eliminar la cuenta
        eliminarCuenta.addEventListener('click', () => {

            usuarioAEliminar = JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario;
            sessionStorage.removeItem('Usuario Activo');
            localStorage.removeItem(usuarioAEliminar);
            location.href = 'registro.html';

        })

    }
    
    // Función para cerrar sesión
    function cerrarSesion() {
        
        const cerrarSesion = document.getElementById('cerrarSesion');

        // Se crea un evento para cerrar sesión
        cerrarSesion.onclick = () => {
            sessionStorage.removeItem('Usuario Activo');
            location.href = 'PFAlvarez/index.html';
            sesion();
        }

    }

    // Función para saber si el usuario es administrador
    function admin() {

        let existeAdmin = JSON.parse(localStorage.getItem('admin@banifox.com.uy'), usuarioAdmin.emailUsuario && usuarioAdmin.passwordUsuario);
            
        JSON.parse(sessionStorage.getItem('Usuario Activo')) !== null ?
            usuarioActivo = {
            emailUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario,
            passwordUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].passwordUsuario
        }:
        null;
            
        // Se verifica si el usuario activo es el administrador y se muestra el creador de productos
        `${existeAdmin.emailUsuario}` === `${usuarioActivo.emailUsuario}` ?
            mostrarElemento(creadorProductos):
            ocultarElemento(creadorProductos);
        null;

    }

    // Si el usuario se encuentra en la página de inicio, se ejecuta la función admin
    mainIndex !== null ?
        admin() :
    null;
    
        
    // Se ejecuta la función para poder cerrar sesión
    cerrarSesion();

    // Se ejecuta la función para poder eliminar la cuenta
    eliminarCuenta !== null ?
        eliminarUsuario() : null;
    
    // Se carga el contenido antes de mostrar los botones de pago, registro o ingreso al carrito
    window.addEventListener('DOMContentLoaded', () => {
    
    const btnPagar = document.querySelector("#btnPagar");
    const btnCrearCuenta = document.querySelector("#btnCrearCuenta");
    const btnIngresarCarrito = document.querySelector("#btnIngresarCarrito");
    mainCarrito !== null && JSON.parse(sessionStorage.getItem("carrito")) !== null && JSON.parse(sessionStorage.getItem("carrito")).length > 0 ?
        sessionStorage.getItem('Usuario Activo') !== null ?
            [mostrarElemento(btnPagar), ocultarElemento(btnCrearCuenta), ocultarElemento(btnIngresarCarrito)] :
            [ocultarElemento(btnPagar), mostrarElemento(btnCrearCuenta), mostrarElemento(btnIngresarCarrito)] :
        null;
});






    
}

sesion();