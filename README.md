# Análisis

### 1. Análisis del código

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
- Esta función tiene como objetivo agregar productos a la lista de compra. Se manda a llamar en el `eventListener` asociado a cada botón del catálogo.
- Recibe como parámetros dos valores, un objeto de tipo `producto` y un valor numérico que hace referencia a la `cantidad` de ese producto.
- Lo que hace es revisar si el producto solicitado ya se encuentra dentro del `array` llamado `carrito`. i lo encuentra, entonces a la cantidad asociada a ese producto se le suma la recibida como parámetro, si no, entonces se agrega un nuevo objeto al `carrito` al llamar la función `carrito.push({producto, cantidad})`. Finalmente, se manda a llamar a la función `actualizarResumenCompra()`.

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

- Este método no tiene parámetros de entrada y su función es mostrar en una tabla los productos que se quieran comprar.
- Internamente lo que hace es borrar todo el contenido de la tabla para poder calcular el nuevo. Esto se hace recorriendo el `array` asociado al `carrito` y por cada elemento en él, se crea una etiqueta `<tr>` y en el código dentro de esta se colocan los atributos de los productos encerrados en etiquetas `<td>` y se usa la estructura `${}` para poder atraer elementos guardados en variables. En este caso, los valores del objeto `carrito`.

### 2. En código JS, ¿qué tipo de variable es `catalogo`? ¿Cómo se manipula?
- `catalogo` es un objeto de tipo Array. Estos cuentan con métodos asociados a ellos para poder manipularlos. Su función es almacenar datos de forma estructurada. No están limitados a contener un solo tipo de dato, sino que pueden mezclarse.
- Los métodos usados en este caso son `.push()` y la iniciación de valores. Al encerrar una serie de valores con `{}` se genera un objeto que contenga los valores dentro contenidos. Para iniciar estos valores se usa la siguiente sintaxis. `nombre: valor`.

### 3. ¿Que hace const `card = document.createElement("div")`?
- Crea una variable que contiene un objeto de tipo HTML con el nombre `div`. En esencia, lo que hace es crear un bloque de código HTML con el nombre `div`, lo que nos permite modificar el interior de esta etiqueta para incluir código personalizado.

### 4. ¿Que hace `card.innerHTML`?
- Es una propiedad de un objeto HTML. Hace referencia al código intermedio entre las etiquetas de apertura y de cierre.
- En este caso se usa para crear la tabla de elementos que conformará el catálogo de la tienda.

### 5. ¿Que hace `catalogoContainer.appendChild(card)`?
- Agrega el código generado del catálogo como hijo del contenedor del catálogo. Esto se traduce en agregar todos los elementos del catálogo uno después de otro, dentro de un contenedor más grande.