function ocultarTodoLogin() {

    emailVacioInicio.classList.add('hidden');
    emailIncorrectoInicio.classList.add('hidden');
    passwordVaciaInicio.classList.add('hidden');
    usuarioNoExiste.classList.add('hidden');
    emailIncorrectoRegistro.classList.add('hidden');
    passwordVaciaRegistro.classList.add('hidden');
    passwordIgualesRegistro.classList.add('hidden');
    usuarioExisteRegistro.classList.add('hidden');
    registroCompleto.classList.add('hidden');

}


function ingresarORegistro() {

    const bloque = document.querySelectorAll('.bloque');
    const btnAqui = document.querySelectorAll('.btnAqui');

    window.location.pathname === ('/PFAlvarez/pages/registro.html' /* '/pages/registro.html' */) ?
        [ingresar.classList.add('hidden')] :
        window.location.pathname === ('/PFAlvarez/pages/ingreso.html' /* '/pages/ingreso.html' */) ?
            [registrar.classList.add('hidden')] :
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

