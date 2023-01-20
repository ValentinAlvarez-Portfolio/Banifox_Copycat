const mainIndex = document.querySelector("#mainIndex");
const mainCarrito = document.querySelector("#mainCarrito");
const mainIngreso = document.querySelector("#mainIngreso");
const mainRegistro = document.querySelector("#mainRegistro");

// Función para mostrar elementos
function mostrarElemento(elemento) {
    elemento.classList.remove('hidden');
}

// Función para ocultar elementos
function ocultarElemento(elemento) {
    elemento.classList.add('hidden');
}

// Función para mostrar elementos con un tiempo de ocultación
function mostrarCompletado(elemento) {
    elemento.classList.remove('hidden');
    setTimeout(() => {
        elemento.classList.add('hidden');
    }, 5000);
}
