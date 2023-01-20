let carrito = [];
let precioTotalCarrito = 0;
let precioEnvio = 0;

const precioCarritoHeader = document.querySelector("#precioCarritoHeader");
const btnEliminarCarrito = document.querySelector("#btnEliminarCarrito");

// Función para agregar productos al carrito
function agregarAlCarrito(codigoProd) {
    let producto = productos.find(p => p.codigoProd === codigoProd);

    // Alerta y promesa para confirmar si desea agregar el producto al carrito
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

        // Si confirma, se agrega el producto al carrito
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

        // Si cancela, no se agrega el producto al carrito
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

// Función para calcular el precio total del carrito.
function sumarPrecioCarrito() {
    let productosCarrito = JSON.parse(sessionStorage.getItem("carrito"));
    
    // Se recorren los productos del carrito y se suman los precios.
    productosCarrito.forEach(producto => {
        precioTotalCarrito += parseInt(producto.precioProd);
        precioSubTotal = precioTotalCarrito;
    });

    precioCarritoHeader.innerText = `USD ${precioTotalCarrito.toFixed(2)}`;

    // Función para calcular el precio del envío.
    function calcularEnvio () {
        usuarioActivo = {
        emailUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].emailUsuario,
        passwordUsuario: JSON.parse(sessionStorage.getItem('Usuario Activo'))[0].passwordUsuario,
        };
        usuario = JSON.parse(localStorage.getItem(usuarioActivo.emailUsuario));

        // Si el usuario no es de Montevideo, se le suma USD 5 al precio del envío.
        if (usuario.departamento !== undefined && usuario.departamento !== "Montevideo") {
            precioEnvio += 5;
            precioTotalCarrito += precioEnvio;
        } else {
            precioEnvio = 0;
            }
    }

    JSON.parse(sessionStorage.getItem('Usuario Activo')) !== null ? calcularEnvio() : null;
    
}

// Función para mostrar el carrito en "carrito.HTML".
function mostrarCarrito() {

    // Si el carrito no se encuentra vacio, se recorren los productos del carrito y se muestran en el HTML.
    if (JSON.parse(sessionStorage.getItem("carrito")) !== null && JSON.parse(sessionStorage.getItem("carrito")).length > 0) {

        ocultarElemento(carritoVacio);

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
                    <strong class="col-6 d-flex justify-content-end">USD ${precioSubTotal.toFixed(2)}</strong>
                    <p class="col-6"><small class="text-muted">(*) Envío</small></p>
                    <small class="text-muted col-6 d-flex justify-content-end"><strong> USD
                            ${precioEnvio.toFixed(2)}</strong></small>
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
                    <a class="btn rounded-0" href="" id="pagar"> CONTINUAR CON EL PAGO </a>
                </div>
                <div class="card-footer text-center border-0 mb-2 mt-0" id="btnCrearCuenta">
                    <a class="btn rounded-0" href="./registro.html"> CREÁ TU CUENTA AQUÍ </a>
                </div>
                <div class="card-footer text-center border-0 mb-0 mt-0" id="btnIngresarCarrito">
                    <a class="btn rounded-0" href="./ingreso.html"> SI YA SOS USUARIO, INGRESÁ AQUÍ </a>
                </div>
            </div>
            <p class="aclaraciones mt-4 mb-4"> (*) Si usted se encuentra en el interior, el envío tiene un costo de USD 5.</p>
        `
        

    // Si el carrito está vacío, se muestra el mensaje de carrito vacío
    } else {
        mostrarElemento(carritoVacio);
    }

    
    
}

// Función para eliminar un producto del carrito
function eliminarProducto(codigoProd) {

    // Si el carrito no está vacío, se elimina el producto seleccionado
    if (JSON.parse(sessionStorage.getItem("carrito")) !== null && JSON.parse(sessionStorage.getItem("carrito")).length > 0) {
        let carrito = JSON.parse(sessionStorage.getItem("carrito"));
        let producto = carrito.find(p => p.codigoProd === codigoProd);
        let index = carrito.indexOf(producto);

        // Se muestra un mensaje de confirmación para eliminar el producto
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

            // Si se confirma la eliminación, se elimina el producto del carrito
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
        
            // Si se cancela la eliminación, se muestra un mensaje de cancelación
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
    
    // Si el carrito está vacío, se muestra un mensaje de error
    } else {
        mostrarElemento(carritoVacio);
    }
    
}

// Función para mostrar alerta de método de pago y confirmación de compra
function comprar() {
    swal.fire({
        title: 'Ingresa los datos de tu tarjeta',
        html: 'Número de tarjeta: <input id="swal-input1" class="swal2-input">' +
                'Fecha de vencimiento: <input id="swal-input2" class="swal2-input">' +
                'CVV: <input id="swal-input3" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return {
            cardNumber: document.getElementById('swal-input1').value,
            expirationDate: document.getElementById('swal-input2').value,
            cvv: document.getElementById('swal-input3').value
            }
        }
        }).then((result) => {
        if (result.value) {
            swal.fire(
            '¡Pago realizado!',
            `Número de tarjeta: ${result.value.cardNumber}` +
            `Fecha de vencimiento: ${result.value.expirationDate}` +
            `CVV: ${result.value.cvv}`,
            'success'
            )
        }
        })
}

// Si el carrito no está vacío, se ejecuta la función para sumar el precio total del carrito
sessionStorage.getItem("carrito") ? sumarPrecioCarrito() : null;

// Si el usuario se encuentra en el carrito, se muestra el carrito
if (mainCarrito !== null) {

    mostrarCarrito();

    // Si el usuario se encuentra en el carrito y el carrito no está vacío, evalúa si el usuario ha ingresado su dirección
    if (pagar !== null && JSON.parse(sessionStorage.getItem("Usuario Activo")) !== null) {
        
        usuarioActivo = {
            departamento: JSON.parse(sessionStorage.getItem("Usuario Activo"))[0].departamento,
        }

        // Si el usuario no ha ingresado su dirección, se muestra un mensaje de error
        if (usuarioActivo.departamento === "" || usuarioActivo.departamento === null || usuarioActivo.departamento === undefined || usuarioActivo.departamento === " ") {
                
                pagar.addEventListener("click", (e) => {
                    e.preventDefault();
                    swal.fire({
                        title: '¡Importante!',
                        text: 'Para realizar la compra es necesario que ingreses tu dirección.',
                        icon: 'warning',
                        confirmButtonText: 'Ingresar dirección',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar compra',
                        confirmButtonColor: '#0074bd',
                        cancelButtonColor: '#d7292b',
                    }).then((result) => {
                        if (result.value) {
                            setTimeout(() => {
                                location.href = "./miCuenta.html";
                            }, 1000);
                        } else if (result.dismiss === swal.DismissReason.cancel) {
                            swal.fire(
                                {
                                    title: 'Compra cancelada',
                                    text: 'La compra ha sido cancelada.',
                                    icon: 'error',
                                    confirmButtonColor: '#0074bd',
                                    cancelButtonColor: '#d7292b',
                                })
                        }
                    })
                })
                    
            // Si el usuario ha ingresado su dirección, se ejecuta la función para pagar
            } else {
                pagar.addEventListener("click", (e) => {
                    e.preventDefault();
                    comprar();
                })
                
            }
    }
    
}








