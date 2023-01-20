// Función para ocultar todos los mensajes de error en los formularios de ingreso y registro
function ocultarTodoLogin() {

    ocultarElemento(emailVacioInicio);
    ocultarElemento(emailIncorrectoInicio);
    ocultarElemento(passwordVaciaInicio);
    ocultarElemento(usuarioNoExiste);
    ocultarElemento(emailIncorrectoRegistro);
    ocultarElemento(passwordVaciaRegistro);
    ocultarElemento(passwordIgualesRegistro);
    ocultarElemento(usuarioExisteRegistro);
    ocultarElemento(registroCompleto);

}

// Función para mostrar el formulario de ingreso o registro
function ingresarORegistro() {

    const bloque = document.querySelectorAll('.bloque');
    const btnAqui = document.querySelectorAll('.btnAqui');

    // Si el usuario se encuentra en la página de registro, se oculta el formulario de ingreso
    mainRegistro !== null ?
        [ocultarElemento(ingresar)] :

        // Si el usuario se encuentra en la página de ingreso, se oculta el formulario de registro
        mainIngreso !== null ?
            [ocultarElemento(registrar)] : 
    null;


    // Se recorre el array de botones y se agrega un evento click a cada uno
    btnAqui.forEach((cadaBtn, i) => {

    btnAqui[i].addEventListener('click', () => {
        bloque.forEach((cadaBloque, i) => {
            bloque[i].classList.remove('hidden');
        })
        bloque[i].classList.add('hidden');

    })

})
}

ocultarTodoLogin();


ingresarORegistro();

