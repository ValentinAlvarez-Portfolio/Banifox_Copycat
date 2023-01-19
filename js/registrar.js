const formularioRegistro = document.querySelector('#formularioRegistro');

formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    registro();
})


function registro() {

    let emailRegistro = document.querySelector('#emailRegistro').value;
    let passwordRegistro = document.querySelector('#passwordRegistro').value;
    let passwordRegistroConfirmar = document.querySelector('#passwordRegistroConfirmar').value;

    ocultarElemento(registroCompleto);

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
    fetch('../usuarios.json')
        .then(response => response.json())
        .then(data => {
            let usuarios = data.usuarios;
            let existeUsuario = usuarios.find(usuario => usuario.emailUsuario === usuarioARegistrar.emailUsuario);
            if (!existeUsuario) {
                usuarios.push(usuarioARegistrar);
                return fetch('../usuarios.json', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                throw new Error('El usuario ya existe');
            }
        })
        .then(response => {
            if (response.ok) {
                ocultarTodoLogin();
                mostrarElemento(registroCompleto);
                setTimeout(() => {
                    window.location.href = "ingreso.html";
                }, 1000);
            } else {
                throw new Error('Error al guardar el usuario');
            }
        })
        .catch(error => {
            ocultarTodoLogin();
            mostrarElemento(usuarioExisteRegistro);
            console.error(error);
        });
}
}



