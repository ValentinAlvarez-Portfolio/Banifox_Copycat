let carrito = [];
let precioTotalCarrito = 0;

const precioCarritoHeader = document.querySelector("#precioCarritoHeader");
const btnEliminarCarrito = document.querySelector("#btnEliminarCarrito");

function agregarAlCarrito(codigoProd) {
    let producto = productos.find(p => p.codigoProd === codigoProd);

    Swal.fire({
        customClass: {
            title: 'tituloAlerta',
        },
        title: `¿Estás seguro que deseas añadir este producto al carrito?`,
        text: `USD ${producto.precioProd} `,
        position: 'center',
        imageUrl: `assets/images/productosNuevos/${producto.codigoProd}.jpg`,
        imageAlt: 'Imagen producto agregado al carrito',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0074bd',
        cancelButtonColor: '#d7292b',
        confirmButtonText: 'Confirmar',
        
    }).then((result) => {
        if (result.isConfirmed) {
            if(producto) {
                if(!sessionStorage.getItem("carrito")) {
                    sessionStorage.setItem("carrito", JSON.stringify([producto]));
            } else {
                let carrito = JSON.parse(sessionStorage.getItem("carrito"));
                carrito.push(producto);
                    sessionStorage.setItem("carrito", JSON.stringify(carrito));
            }
            }
            Swal.fire({
                title: 'Añadido',
                text: 'Su producto ha sido añadido con exito al carrito.',
                icon: 'success',
                confirmButtonColor: '#0074bd',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                result.isConfirmed ? location.reload() : location.reload();
            }).catch((error) => {
                console.log(error);
            });
        } else {
            Swal.fire({
                title: 'Cancelado',
                text: 'Su producto no ha sido añadido al carrito.',
                icon: 'error',
                confirmButtonColor: '#0074bd',
                confirmButtonText: 'Continuar'
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

function sumarPrecioCarrito() {
    let productosCarrito = JSON.parse(sessionStorage.getItem("carrito"));
    
    productosCarrito.forEach(producto => {
        precioTotalCarrito += parseInt(producto.precioProd);
    });
    precioCarritoHeader.innerText = `USD ${precioTotalCarrito.toFixed(2)}`;
}

function mostrarCarrito() {

        JSON.parse(sessionStorage.getItem("carrito", JSON.stringify(carrito))).forEach(producto => {
            productosEnCarrito.innerHTML += `
                <div class="card mb-3 p-0 m-0 rounded-0">
                    <div class="row g-0 mb-0">
                        <div class="col-md-4">
                            <img src="../assets/images/productosNuevos/${producto.codigoProd}.jpg" class="img-fluid rounded-start"
                                alt="${producto.nombreProd}">
                        </div>
                        <div class="col-md-8 mb-0 mt-0">
                            <div class="card-body mt-0 mb-0 pb-0">
                                <div class="col-12">
                                    <i class="fa-solid fa-trash fa-lg d-flex justify-content-end mb-3" onclick="eliminarProducto('${producto.codigoProd}')"></i> 
                                    <p class="card-text" id="tituloPoductoCarrito">${producto.nombreProd}.</p>
                                </div>
                                <p class="card-text"><small class="text-muted" id="codigoProductoCarrito">Cod.
                                        ${producto.codigoProd}.</small></p>
                            </div>
                            <div class="ps-3 pe-3 mt-0 mb-0">
                                <hr class="mt-1 mb-1">
                            </div>
                            <div class="card-body row mt-0 pt-2 mb-0 pb-0">
                                <p class="card-text col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 me-3">PRECIO:
                                    <strong class="ms-1" id="precioProductoCarrito">USD ${producto.precioProd}</strong></p>
                                <p class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 ms-2 pe-0 ms-0">CANTIDAD:
                                    <strong class="ms-1"> 1 </strong>
                                </p>
                                <i class="col-1 fa-solid fa-pen pt-1 "></i>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
    
        resumenCarrito.innerHTML += `
            <div class="card mb-0 p-0 m-0 rounded-0">
                <div class="card-body m-2 pb-2" id="resumenPedido">
                    <h5 class="card-title d-flex justify-content-center pb-3 pt-3">RESUMEN DE TU
                        PEDIDO</h5>
                </div>
                <div class="card-body row mt-0 mb-0 pt-1 pb-1">
                    <p class="col-6 mb-2"> Subtotal</p>
                    <strong class="col-6 d-flex justify-content-end">USD ${precioTotalCarrito.toFixed(2)}</strong>
                    <p class="col-6"><small class="text-muted">Envío</small></p>
                    <small class="text-muted col-6 d-flex justify-content-end"><strong> USD
                            0.00</strong></small>
                 </div>
                <hr class="mt-1 mb-1 me-3 ms-3">
                <div class="card-title d-flex justify-content-center">
                    <h4 id="precioTotal">USD ${precioTotalCarrito.toFixed(2)}</h4>
                </div>
            </div>
            <p class="aclaraciones mt-4 mb-4"> Para continuar con tu pedido, deberás previamente crear una cuenta en
                nuestro
                sitio.</p>
            <div class="card mb-0 p-0 m-0 rounded-0 border-0">
                <div class="card-footer text-center border-0 mb-2" id="btnPagar">
                    <a class="btn rounded-0" href=""> CONTINUAR CON EL PAGO </a>
                </div>
                <div class="card-footer text-center border-0 mb-2 mt-0" id="btnCrearCuenta">
                    <a class="btn rounded-0" href="./registro.html"> CREÁ TU CUENTA AQUÍ </a>
                </div>
                <div class="card-footer text-center border-0 mb-0 mt-0" id="btnIngresarCarrito">
                    <a class="btn rounded-0" href="./ingreso.html"> SI YA SOS USUARIO, INGRESÁ AQUÍ </a>
                </div>
            </div>
        `      
}

function eliminarProducto(codigoProd) {

    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    let producto = carrito.find(p => p.codigoProd === codigoProd);
    let index = carrito.indexOf(producto);
    Swal.fire({
        customClass: {
            title: 'tituloAlerta',
        },
        title: `¿Estás seguro que deseas eliminar este producto del carrito?`,
        text: `USD ${producto.precioProd} `,
        position: 'center',
        imageUrl: `../assets/images/productosNuevos/${producto.codigoProd}.jpg`,
        imageAlt: 'Imagen producto eliminado del carrito',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0074bd',
        cancelButtonColor: '#d7292b',
        confirmButtonText: 'Confirmar',
        
    }).then((result) => {
        if (result.isConfirmed) {
            let carrito = JSON.parse(sessionStorage.getItem("carrito"));
            carrito.splice(index, 1);
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            Swal.fire({
                title: 'Eliminado',
                text: 'Su producto ha sido eliminado con exito del carrito.',
                icon: 'success',
                confirmButtonColor: '#0074bd',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                result.isConfirmed ? location.reload() : location.reload();
            }).catch((error) => {
                console.log(error);
            });
        
        } else {
            Swal.fire({
                title: 'Cancelado',
                text: 'Su producto no ha sido eliminado del carrito.',
                icon: 'error',
                confirmButtonColor: '#0074bd',
                confirmButtonText: 'Continuar'
            })
        }
    }).catch((error) => {
        console.log(error);
    });
    
}

window.addEventListener('DOMContentLoaded', () => {
    const btnPagar = document.querySelector("#btnPagar");
    const btnCrearCuenta = document.querySelector("#btnCrearCuenta");
    const btnIngresarCarrito = document.querySelector("#btnIngresarCarrito");
    window.location.pathname === '/carrito.html' ?
        sessionStorage.getItem('Usuario Activo') !== null ?
            [btnPagar.classList.remove('hidden'), btnCrearCuenta.classList.add('hidden'), btnIngresarCarrito.classList.add('hidden')] :
            [btnPagar.classList.add('hidden'), btnCrearCuenta.classList.remove('hidden'), btnIngresarCarrito.classList.remove('hidden')] :
        null;
});

sessionStorage.getItem("carrito") ? sumarPrecioCarrito() : null;

window.location.pathname === '/carrito.html' ? mostrarCarrito() : null;




