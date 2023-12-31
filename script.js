document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: 1, imagen: "https://images.pexels.com/photos/687811/pexels-photo-687811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", precio: 1300 , nombre: "Control"},
        { id: 2, imagen: "https://images.pexels.com/photos/7610446/pexels-photo-7610446.jpeg?auto=compress&cs=tinysrgb&w=600", precio: 10000, nombre: "Laptop"},
        { id: 3, imagen: "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg?auto=compress&cs=tinysrgb&w=600", precio: 8000, nombre: "Teléfono"},
        { id: 4, imagen :"https://images.pexels.com/photos/8000587/pexels-photo-8000587.jpeg?auto=compress&cs=tinysrgb&w=600", precio: 550, nombre: "Audífonos"},
        { id: 5, imagen: "https://cdn.pixabay.com/photo/2016/01/10/21/05/mic-1132528_1280.jpg", precio: 350, nombre: "Micrófono"},
        { id: 6, imagen: "https://cdn.pixabay.com/photo/2014/02/27/16/09/microscope-275984_1280.jpg", precio: 2400, nombre: "Microscopio"},
        { id: 7, imagen: "https://cdn.pixabay.com/photo/2011/03/01/03/55/iron-5112_640.jpg", precio: 450, nombre: "Plancha Eléctrica"},
        { id: 8, imagen: "https://cdn.pixabay.com/photo/2011/02/07/14/01/razor-4840_1280.jpg", precio: 350, nombre: "Rasuradora"},
        { id: 9, imagen: "https://cdn.pixabay.com/photo/2018/10/31/16/30/robot-vacuum-cleaner-3786243_640.jpg", precio: 2500, nombre: "Aspiradora Autónoma"}
    ];

    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");

    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card bg-dark bg-gradient text-light rounded">
                <img src="${producto.imagen}" class="card-img-top imgArticulo" alt="Producto ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}: ${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}
                    <br>
                    Cantidad: <input type="number" class="cantidad" id="cantidadProducto${producto.id}">
                    <br><br>
                    </p>
                    <button type="button" class="btn btn-primary agregar"> Agregar al Carrito </button>
                </div>
            </div>
                
            
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
                <td>${item.producto.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }

    const finalizarCompra = document.querySelector("#finalizarCompra");
    finalizarCompra.addEventListener("click", function() {
        //Al finalizar la compra
        /*Pasar los datos a la memoria local*/
        /*Crea un contenedor vacio para almacenar los datos del ticket */
        const arregloEnvio = [];
        /*Crea las variables que contendra el objeto*/
        var idArt, nombreArt, precioArt, cantidadArt;
        /*Por cada elemento del carrito recolecta los datos del producto y guardar en objeto*/
        carrito.forEach(element => {
           idArt = element.producto.id;
           nombreArt = element.producto.nombre;
           precioArt = element.producto.precio;
           cantidadArt = element.cantidad;
           /*Crea el objeto con los datos del producto*/
           const envio = {idArt, nombreArt, precioArt, cantidadArt};
           /*Guarda el objeto en el arreglo*/
           arregloEnvio.push(envio);
        });
        /*Mandar el arreglo creado a la memoria local*/
        localStorage.setItem("arregloEnvio", JSON.stringify(arregloEnvio));

        //Borra el carrito
        carrito.length = 0;
        //Actualiza la lista de compra, borrandola
        actualizarResumenCompra();

        //Abrir ticket
        window.location.href = "ticket.html";
    });
});