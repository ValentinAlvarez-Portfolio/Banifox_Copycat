const mainIndex = document.querySelector("#mainIndex");
const mainCarrito = document.querySelector("#mainCarrito");
const mainIngreso = document.querySelector("#mainIngreso");
const mainRegistro = document.querySelector("#mainRegistro");

function mostrarElemento(elemento) {
    elemento.classList.remove('hidden');
}

function ocultarElemento(elemento) {
    elemento.classList.add('hidden');
}

function mostrarCompletado(elemento) {
    elemento.classList.remove('hidden');
    setTimeout(() => {
        elemento.classList.add('hidden');
    }, 5000);
}
