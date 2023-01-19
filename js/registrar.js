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
            
        [ocultarTodoLogin(), mostrarElemento(emailIncorrectoRegistro)] :

            passwordRegistro === "" ?
                
               [ocultarTodoLogin(), mostrarElemento(passwordVaciaRegistro)] :

                    passwordRegistro.length <= 7 ?
                
                   [ocultarTodoLogin(), mostrarElemento(passwordVaciaRegistro)] :

                    (passwordRegistro === passwordRegistroConfirmar ?

                controlRegistro() :
                    
    [ocultarElemento(passwordVaciaRegistro), mostrarElemento(passwordIgualesRegistro), ocultarElemento(usuarioExisteRegistro)]);
    

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
                window.location.href = "ingreso.html";
            }, 1000);
        })
        .catch(() => {
            ocultarTodoLogin();
            mostrarElemento(usuarioExisteRegistro);
        });
}
}



