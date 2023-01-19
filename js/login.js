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


function ingresarORegistro() {

    const bloque = document.querySelectorAll('.bloque');
    const btnAqui = document.querySelectorAll('.btnAqui');

    mainRegistro !== null ?
        [ocultarElemento(ingresar)] :
        mainIngreso !== null ?
            [ocultarElemento(registrar)] :
    null;


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

