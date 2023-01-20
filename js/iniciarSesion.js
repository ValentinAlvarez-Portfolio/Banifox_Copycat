const formularioIngreso = document.querySelector('#formularioIngreso');
    
// Función para iniciar sesión
function ingreso() {

    let emailIngresado = document.querySelector('#emailUsuarioInicio').value;
    let passwordIngresada = document.querySelector('#passwordUsuarioInicio').value;

    // Validaciones
    // Si el campo de email está vacío, se muestra un mensaje de error
    emailIngresado === "" ?
        
        [ocultarTodoLogin(), mostrarElemento(emailVacioInicio)] :

        // Si el campo de email no está vacío, se valida que el formato sea correcto
        /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|gmail|banifox)\.(?:|com|com.uy|es)+$/i.test(emailIngresado) === false ?
            
            [ocultarTodoLogin(), mostrarElemento(emailIncorrectoInicio)] :

            // Si el campo de email está completo y el formato es correcto, se valida que el campo de password no esté vacío
            passwordIngresada === "" ?
                
                [ocultarTodoLogin(), ocultarElemento(emailIncorrectoInicio), mostrarElemento(passwordVaciaInicio)] :

            [ocultarTodoLogin(), comparadorUsuarios()];

    // Función para comparar los datos ingresados con los datos guardados en el localStorage
    function comparadorUsuarios() {
        let usuarioAIngresar = {
            emailUsuario: emailIngresado.toLowerCase(),
            passwordUsuario: passwordIngresada
        };

        // Se crea una promesa para validar los datos ingresados
        let ingresarUsuario = new Promise((resolve, reject) => {
            
            let usuarioExiste = JSON.parse(localStorage.getItem(`${usuarioAIngresar.emailUsuario}`, usuarioAIngresar.emailUsuario && usuarioAIngresar.passwordUsuario));
            
            // Si el usuario existe, se guarda en el sessionStorage y se redirige a la página de mi cuenta
            if (usuarioExiste !== null && usuarioExiste.emailUsuario === usuarioAIngresar.emailUsuario && usuarioExiste.passwordUsuario === usuarioAIngresar.passwordUsuario) {

                usuarioActivo.push(usuarioExiste);
                sessionStorage.setItem('Usuario Activo', JSON.stringify(usuarioActivo));
                resolve();
                
            // Si el usuario no existe, se muestra un mensaje de error
            } else {
                reject();
            }
        });   
        
        // Se ejecuta la promesa
        ingresarUsuario 
            .then(() => {
                ocultarTodoLogin();
                setTimeout(() => {
                    sesion();
                    window.location.href = 'miCuenta.html';
                }, 200);
            })
            .catch(() => {
                mostrarElemento(usuarioNoExiste);
            });

    }

}

// Evento para iniciar sesión
formularioIngreso.addEventListener("submit", (e) => {
    e.preventDefault();
    ingreso();
})

