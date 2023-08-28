let carrito = localStorage.getItem("carrito")
carrito = JSON.parse(carrito)
const contenedor = document.getElementById("contenedor-carrito")
const numCant = document.getElementById("numCantidad")
const carritoVacio = document.querySelector("#carritovacio")
const acciones = document.querySelector("#acciones")
const vaciar = document.querySelector("#vaciarCarrito")
const comprar = document.querySelector("#comprar")
const total = document.querySelector("#total")
let botonesEliminar = document.querySelectorAll(".eliminar")
let numCantidad
actualizarCantidad()

function agregarProductos(){
    if (carrito && carrito.length > 0){
        contenedor.innerHTML = ""
        acciones.classList.remove("disabled")
        carritoVacio.classList.add("disabled")
        contenedor.classList.remove("disabled")
        carrito.forEach(producto =>{
            const card = document.createElement("div")
            card.classList.add("card-carrito")
            card.classList.add(`indice${producto.id}`)
            card.innerHTML = `
                        <div class="div-imagen">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                        </div>
                        <h2>${producto.nombre}</h2>
                        <h3>$${producto.precio}</h3>
                        <h4>Cantidad: ${producto.cantidad}</h4>
                        <p>Subtotal: $${producto.precio * producto.cantidad}</p>
                        <button id="${producto.id}" class="eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg></button>`
            contenedor.append(card)
    })
    botonesEliminarProductos()
    actualizarTotal()
    } else {
        contenedor.innerHTML = ''
        carritoVacio.classList.remove("disabled")
        acciones.classList.add("disabled")
        contenedor.classList.add("disabled")
    }
}

agregarProductos()
let boton

function botonesEliminarProductos(){
    botonesEliminar = document.querySelectorAll(".eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDeCarrito)
    })
}

function eliminarDeCarrito(evento){
    const id = evento.currentTarget.id
    const indice = carrito.findIndex(producto => producto.id === id)
    carrito.splice(indice, 1)
    agregarProductos()
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCantidad()
    Toastify({
        text: "Se elimino el producto del Carrito",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
        background: 'linear-gradient(to right, #0dcbd8, #0d2bd8)'
        }
    }).showToast();
}

vaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {
    carrito.length = 0
    localStorage.setItem("carrito", JSON.stringify(carrito))
    agregarProductos()
    actualizarCantidad()
    Toastify({
        text: "Se vacio el Carrito",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
        background: 'linear-gradient(to right, #0dcbd8, #0d2bd8)'
        }
    }).showToast();
}

function actualizarTotal() {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `El Total es de $${totalCalculado}`
}

comprar.addEventListener("click", comprarCarrito)
function comprarCarrito() {
    carrito.length = 0
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoVacio.classList.remove("disabled")
    acciones.classList.add("disabled")
    contenedor.classList.add("disabled")
    contenedor.innerHTML = ''
    actualizarCantidad()
    Swal.fire({
        icon: 'success',
        title: 'Gracias por tu Compra',
    })
}

function actualizarCantidad(){
    numCantidad = carrito.reduce((acc, producto)=> acc + producto.cantidad, 0)
    numCant.innerText = numCantidad
}