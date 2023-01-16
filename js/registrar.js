const formularioRegistro = document.querySelector('#formularioRegistro');

formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    registro();
})

function registro() {

    let emailRegistro = document.querySelector('#emailRegistro').value;
    let passwordRegistro = document.querySelector('#passwordRegistro').value;
    let passwordRegistroConfirmar = document.querySelector('#passwordRegistroConfirmar').value;

    registroCompleto.classList.add('hidden');

       /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|gmail)\.(?:|com|es)+$/i.test(emailRegistro) === false ?
            
        [ocultarTodoLogin(), mostrarError(emailIncorrectoRegistro)] :

            passwordRegistro === "" ?
                
               [ocultarTodoLogin(), mostrarError(passwordVaciaRegistro)] :

                    passwordRegistro.length <= 7 ?
                
                   [ocultarTodoLogin(), mostrarErrror(passwordVaciaRegistro)] :

                    (passwordRegistro === passwordRegistroConfirmar ?

                controlRegistro() :
                    
    [ocultarError(passwordVaciaRegistro), mostrarError(passwordIgualesRegistro), ocultarError(usuarioExisteRegistro)]);
    

    function controlRegistro() {
    let usuarioARegistrar = {
        emailUsuario: emailRegistro.toLowerCase(),
        passwordUsuario: passwordRegistro
    };
    let guardarUsuario = new Promise((resolve, reject) => {
        let usuarioExiste = JSON.parse(localStorage.getItem(`${usuarioARegistrar.emailUsuario}`, usuarioARegistrar));
        if (usuarioExiste === null) {
            nuevoUsuario = new Usuario(usuarioARegistrar.emailUsuario, usuarioARegistrar.passwordUsuario);
            usuarios.push(nuevoUsuario);
            localStorage.setItem(`${usuarioARegistrar.emailUsuario}`, JSON.stringify(nuevoUsuario));
            resolve();
        } else {
            reject();
        }
    });
    guardarUsuario
        .then(() => {
            ocultarTodoLogin();
            registroCompleto.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = /* "/pages/ingreso.html" */ "/PFAlvarez/pages/ingreso.html";
            }, 1000);
        })
        .catch(() => {
            ocultarTodoLogin();
            mostrarError(usuarioExisteRegistro);
        });
}
}



