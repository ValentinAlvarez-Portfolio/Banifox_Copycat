function sesion() {

    const nombreCuenta = document.querySelector('.nombreCuenta');
    const eliminarCuenta = document.getElementById('eliminarCuenta');

    sessionStorage.getItem('Usuario Activo') !== null ?
        
        [mostrarElemento(bienvenido), registroHeader.classList.add('hidden'), ingresarHeader.classList.add('hidden'), dropCuenta.classList.remove('hidden'), nombreCuenta.innerHTML = JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario] :
    
        [bienvenido.classList.add('hidden'), registroHeader.classList.remove('hidden'), ingresarHeader.classList.remove('hidden'), dropCuenta.classList.add('hidden')]; 
    
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
            creadorProductos.classList.remove('hidden') :
            creadorProductos.classList.add('hidden');
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
    mainCarrito !== null ?
        sessionStorage.getItem('Usuario Activo') !== null ?
            [btnPagar.classList.remove('hidden'), btnCrearCuenta.classList.add('hidden'), btnIngresarCarrito.classList.add('hidden')] :
            [btnPagar.classList.add('hidden'), btnCrearCuenta.classList.remove('hidden'), btnIngresarCarrito.classList.remove('hidden')] :
        null;
});






    
}

sesion();