const formularioRegistro = document.querySelector('#formularioRegistro');

// Función para registrar usuarios
function registro() {

    let emailRegistro = document.querySelector('#emailRegistro').value;
    let passwordRegistro = document.querySelector('#passwordRegistro').value;
    let passwordRegistroConfirmar = document.querySelector('#passwordRegistroConfirmar').value;

    ocultarElemento(registroCompleto);

    // Se valida que el formato de email sea correcto
    /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|gmail)\.(?:|com|es)+$/i.test(emailRegistro) === false ?
            
        [ocultarTodoLogin(), mostrarElemento(emailIncorrectoRegistro)] :

        // Se valida que el campo de contraseña no esté vacío
        passwordRegistro === "" ?
                
            [ocultarTodoLogin(), mostrarElemento(passwordVaciaRegistro)] :

                // Se valida que la contraseña ingresada tenga al menos 8 caracteres
                passwordRegistro.length <= 7 ?
                
                [ocultarTodoLogin(), mostrarElemento(passwordVaciaRegistro)] :

                // Se valida que las contraseñas ingresadas coincidan
                (passwordRegistro === passwordRegistroConfirmar ?

        controlRegistro() :
                    
    [ocultarElemento(passwordVaciaRegistro), mostrarElemento(passwordIgualesRegistro), ocultarElemento(usuarioExisteRegistro)]);
    

    // Función para controlar el registro de usuarios
    function controlRegistro() {

        let usuarioARegistrar = {
            emailUsuario: emailRegistro.toLowerCase(),
            passwordUsuario: passwordRegistro
            };

        // Se crea una promesa para validar que el usuario no exista
        let guardarUsuario = new Promise((resolve, reject) => {
    
            let usuarioExiste = JSON.parse(localStorage.getItem(`${usuarioARegistrar.emailUsuario}`, usuarioARegistrar));
        
            // Si el usuario no existe, se crea un nuevo usuario y se guarda en el localStorage
            if (usuarioExiste === null) {

                nuevoUsuario = new Usuario(usuarioARegistrar.emailUsuario, usuarioARegistrar.passwordUsuario);
                usuarios.push(nuevoUsuario);
                localStorage.setItem(`${usuarioARegistrar.emailUsuario}`, JSON.stringify(nuevoUsuario));
                resolve();

            // Si el usuario existe, se rechaza la promesa    
            } else {
                reject();
            }

        });

        // Se ejecuta la promesa
        guardarUsuario
            .then(() => {
                ocultarTodoLogin();
                mostrarElemento(registroCompleto);
                setTimeout(() => {
                    window.location.href = "ingreso.html";
                }, 1000);
            })
            .catch(() => {
                ocultarTodoLogin();
                mostrarElemento(usuarioExisteRegistro);
            });
} 

}

// Evento para registrar usuarios
formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    registro();
})



