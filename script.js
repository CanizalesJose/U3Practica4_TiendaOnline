document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: 1, imagen: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", precio: 10 },
        { id: 2, imagen: "https://images.pexels.com/photos/7610446/pexels-photo-7610446.jpeg?auto=compress&cs=tinysrgb&w=600", precio: 15 },
        { id: 3, imagen: "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=600", precio: 20 },
        // Agrega más productos aquí
    ];

    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");

    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top imgArticulo" alt="Producto ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">Producto ${producto.id}</h5>
                    <p class="card-text">Precio: ${producto.precio}
                    <br>
                    Cantidad: <input type="number" class="cantidad" id="cantidadProducto${producto.id}">
                    <br><br>
                    
                    <button type="button" class="btn btn-primary agregar"> Agregar al Carrito </button>
                
            
        `;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón de "Agregar al Carrito"
        const botonAgregar = card.querySelector("button");
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });

    const carrito = [];

    const finalizarCompra = document.querySelector("#finalizarCompra");
    finalizarCompra.addEventListener("click", function() {
        //Al finalizar la compra
        /*Pasar los datos a la memoria local*/
        //Borra el carrito
        carrito.length = 0;
        actualizarResumenCompra();

        //location.reload();
    });

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>Producto ${item.producto.id}</td>
                <td>${item.cantidad}</td>
                <td>${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }
});