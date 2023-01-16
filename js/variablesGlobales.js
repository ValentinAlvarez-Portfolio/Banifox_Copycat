function mostrarError(elemento) {
    elemento.classList.remove('hidden');
}

function ocultarError(elemento) {
    elemento.classList.add('hidden');
}

function mostrarCompletado(elemento) {
    elemento.classList.remove('hidden');
    setTimeout(() => {
        elemento.classList.add('hidden');
    }, 5000);
}
