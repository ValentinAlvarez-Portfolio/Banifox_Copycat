const productos = [];
const contenedorProductos = document.querySelector('#contenedorProductos');
const formularioAgregarProductos = document.querySelector('#formularioAgregarProductos');
const btnCrearProducto = document.querySelector('#btnCrearProducto');
const formularioEliminarProductos = document.querySelector('#formularioEliminarProductos');
const btnEliminarProducto = document.querySelector('#btnEliminarProducto');

// Función creadora de productos
function Producto(nombreProd, precioProd, categoriaProd, marcaProd, codigoProd, id) {

    this.nombreProd = nombreProd;
    this.precioProd = precioProd + ".00";
    this.categoriaProd = categoriaProd;
    this.marcaProd = marcaProd;
    this.codigoProd = codigoProd;
    this.id = id;

}

function productosDePrueba() {

    // Productos de prueba
    const producto1 = new Producto("ZOTAC GEFORCE RTX 2060", 619, "TARJETAS DE VIDEO", "NVIDIA", "BFXZON02", id = Date.now());
    const producto2 = new Producto("AMD PROCESADOR RYZEN 5 5600", 224, "PROCESADORES", "AMD", "BFX56", id = Date.now());

    productos.push(producto1, producto2);

    sessionStorage.setItem("productos", JSON.stringify(productos));

}


// Función para crear productos
function crearProducto() {

    let nombreProducto = document.querySelector('#nombreProducto').value;
    let precioProducto = document.querySelector('#precioProducto').value;
    let categoriaProducto = document.querySelector('#categoriaProducto').value;
    let marcaProducto = document.querySelector('#marcaProducto').value;
    let codigoProducto = document.querySelector('#codigoProducto').value;

    // Validación de campos vacíos
    nombreProducto, precioProducto, categoriaProducto, marcaProducto, codigoProducto == "" ? [mostrarElemento(completarTodo)] :

        // Si no hay campos vacíos, se crea el producto
        [ocultarElemento(completarTodo),
            id = Date.now(),
            productoACrear = {
                numeroProd: "Producto " + (productos.length + 1),
                producto: new Producto(nombreProducto, precioProducto, categoriaProducto, marcaProducto, codigoProducto, id),
            },
            localStorage.setItem(id, JSON.stringify(productoACrear.producto)),
            mostrarElemento(productoCreado),
            setTimeout(() => {
                location.reload();
            }, 2000)
        ];

}

// Función para eliminar productos
function eliminarProducto() {
    codigoProductoAEliminar = document.querySelector('#codigoProductoAEliminar').value;

    let producto = productos.find(p => p.codigoProd === codigoProductoAEliminar);

    // Si el producto existe, se elimina
    if (producto != undefined) {
        if (producto.id) {
            localStorage.removeItem(producto.id);
            filterdObjects = productos.filter(p => p.codigoProd !== codigoProductoAEliminar);
            ocultarElemento(errorEliminarProducto);
            mostrarElemento(productoEliminado);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }

        // Si el producto no existe, se muestra un mensaje de error
    } else {
        ocultarElemento(productoEliminado);
        mostrarElemento(errorEliminarProducto);
    }

    cargarProductos();
}

// Función para cargar los productos
function cargarProductos() {

    // Se recorre el localStorage y se guardan los productos en un array
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let valor = localStorage.getItem(clave);
        let producto = JSON.parse(valor);
        producto.codigoProd != undefined ?
            productos.push(producto) : () => {
                return;
            };
    }

    // Se carga el array en el sessionStorage
    sessionStorage.setItem("productos", JSON.stringify(productos));

}

// Función para mostrar los productos
function mostrarProductos() {

    // Si el creador de productos no se muestra, recorre el sessionStorage y se muestran los productos para el cliente
    creadorProductos.classList.contains("hidden") ?
        JSON.parse(sessionStorage.getItem("productos", JSON.stringify(productos))).forEach((producto) => {

            contenedorProductos.innerHTML +=
                `<div class="col">
            <div class="card h-100 border-0">
                <img class="card-img-top ratio ratio-1x1" src="assets/images/productosNuevos/${producto.codigoProd}.jpg" alt="${producto.nombreProd}">
                <div class="card-body text-center mb-0 mt-0">
                    <p class="card-text mb-2 nombreProd">${producto.nombreProd}</p>
                    <h6 class="card-text mt-0 fw-bold precioProd"> USD ${producto.precioProd}</h6>
                </div>
            <div class="card-footer text-center border-0 mb-4">
                <a class="btn rounded-0" onclick="agregarAlCarrito('${producto.codigoProd}')">Añadir</a>
            </div>
        </div>`;
        }) :

        // Si el creador de productos se muestra, recorre el sessionStorage y se muestran los productos para el administrador
        JSON.parse(sessionStorage.getItem("productos", JSON.stringify(productos))).forEach((producto) => {

            contenedorProductos.innerHTML +=
                `<div class="col">
            <div class="card h-100 border-0">
                <img class="card-img-top ratio ratio-1x1" src="assets/images/productosNuevos/${producto.codigoProd}.jpg" alt="${producto.nombreProd}">
                <div class="card-body mb-0 mt-0">
                    <p class="card-text mb-2">Nombre:</p>
                    <p class="card-text mb-2 fw-bold nombreProd">${producto.nombreProd}</p>
                    <p class="card-text mb-2">Precio:</p>
                    <p class="card-text mb-2 fw-bold precioProd">USD ${producto.precioProd}</p>
                    <p class="card-text mb-2">Categoria:</p>
                    <p class="card-text mb-2 fw-bold categoriaProd">${producto.categoriaProd}</p>
                    <p class="card-text mb-2">Marca:</p>
                    <p class="card-text mb-2 fw-bold marcaProd">${producto.marcaProd}</p>
                    <p class="card-text mb-2">Código:</p>
                    <p class="card-text mb-2 fw-bold codigoProd">${producto.codigoProd}</p>
                </div>
        </div>`;

        });



}

// Eventos
formularioAgregarProductos.addEventListener("submit", (e) => {
    e.preventDefault();
    crearProducto();
})

btnCrearProducto.addEventListener("click", (e) => {
    e.preventDefault();
    crearProducto();
})

formularioEliminarProductos.addEventListener("submit", (e) => {
    e.preventDefault();
    eliminarProducto();
})

btnEliminarProducto.addEventListener("click", (e) => {
    e.preventDefault();
    eliminarProducto();
})

// Llamado a las funciones
productosDePrueba();
cargarProductos();
mostrarProductos();