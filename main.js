
const agregarProductos = async ()=> {
    const response = await fetch("productos.json")
    const productos = await response.json()
    const contenedorProductos = document.getElementById("cantenedor-productos")
    productos.forEach(producto =>{
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
                    <div class="div-imagen">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <h2>${producto.nombre}</h2>
                    <h3>$${producto.precio}</h3>
                    <h4 id="producto${producto.id}">Stock: ${producto.stock}</h4>
                    <button id="${producto.id}" class="agregar">Agregar a carrito</button>`
        contenedorProductos.appendChild(card)
    })
    const numCant = document.getElementById("numCantidad")
    let numCantidad

    let carrito
    let carritolocalstoraje = JSON.parse(localStorage.getItem("carrito"))
    if(carritolocalstoraje){
        carrito = carritolocalstoraje
        actualizarCantidad()
        carrito.forEach(produc => {
            let idProduc = produc.id
            productos[idProduc - 1].stock = produc.stock
            let cambiarStock = document.getElementById(`producto${idProduc}`)
            cambiarStock.innerText =`Stock: ${produc.stock}`
        })
    }else{
        carrito = []
    }

    let botonesAgregar = document.querySelectorAll(".agregar")
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarACarrito)
    })


    function agregarACarrito(evento){
        const id = evento.currentTarget.id
        const agregarProducto = productos.find(producto => producto.id === id)
        const actualizarONo = actualizarStock(agregarProducto)
        if(actualizarONo === 1){
            if(carrito.some(producto => producto.id === id)){
                const indice = carrito.findIndex(producto => producto.id === id)
                carrito[indice].cantidad++
            }else{
                agregarProducto.cantidad = 1
                carrito.push(agregarProducto)
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
            actualizarCantidad()
            Toastify({
                text: "Se agrego al Carrito",
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                background: 'linear-gradient(to right, #0dcbd8, #0d2bd8)'
                }
            }).showToast();
        }else{
            Toastify({
                text: "No existe Stock de este producto",
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                background: 'linear-gradient(to right, #fa3600, #ff0000)'
                }
            }).showToast();
        }
    }

    function actualizarCantidad(){
        numCantidad = carrito.reduce((acc, producto)=> acc + producto.cantidad, 0)
        numCant.innerText = numCantidad
    }

    function actualizarStock(producto){
        const elemCarrito = carrito.findIndex(produc => produc.id === producto.id)
        const elemento = document.getElementById(`producto${producto.id}`)
        if(producto.stock <= 0){
            return 0
        }else{
            producto.stock = producto.stock - 1
            elemCarrito != -1 && (carrito[elemCarrito].stock = producto.stock)
            elemento.innerText = `Stock: ${producto.stock}`
            return 1
        }
    }
}

agregarProductos()
