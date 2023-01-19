function sesion() {

    const nombreCuenta = document.querySelector('.nombreCuenta');
    const eliminarCuenta = document.getElementById('eliminarCuenta');

    sessionStorage.getItem('Usuario Activo') !== null ?
        
        [mostrarElemento(bienvenido), ocultarElemento(registroHeader), ocultarElemento(ingresarHeader), mostrarElemento(dropCuenta), nombreCuenta.innerHTML = JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario] :
    
        [ocultarElemento(bienvenido), mostrarElemento(registroHeader), mostrarElemento(ingresarHeader), ocultarElemento(dropCuenta)]; 
    
    function eliminarUsuario() {
        
        eliminarCuenta.addEventListener('click', () => {
            usuarioAEliminar = JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario;
            console.log(usuarioAEliminar);
            sessionStorage.removeItem('Usuario Activo');
            localStorage.removeItem(usuarioAEliminar);
            location.href = 'registro.html';
        })

    }
    
    function cerrarSesion (){
        const cerrarSesion = document.getElementById('cerrarSesion');
        cerrarSesion.onclick = () => {
            sessionStorage.removeItem('Usuario Activo');
            location.href = '../index.html';
            sesion();
        }
    }

    function admin() {

    let existeAdmin = JSON.parse(localStorage.getItem('admin@banifox.com.uy'), usuarioAdmin.emailUsuario && usuarioAdmin.passwordUsuario);
        
        JSON.parse(sessionStorage.getItem('Usuario Activo')) !== null ?
            usuarioActivo = {
                emailUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario,
                passwordUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].passwordUsuario
        }:
        null;
         
        `${existeAdmin.emailUsuario}` === `${usuarioActivo.emailUsuario}` ?
            mostrarElemento(creadorProductos):
            ocultarElemento(creadorProductos);
        null;

    }

    mainIndex !== null ?
        admin() :
    null;
    
        
    cerrarSesion();

    eliminarCuenta !== null ?
        eliminarUsuario() : null;
    
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