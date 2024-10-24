const almacen = document.getElementById("almacen");
almacen.addEventListener("click", () => {
  //http://localhost:3000/api/almacenes
  sessionStorage.setItem("tableHeaders", "IdAlmacen;Dirección;Tipo");
});

const camion = document.getElementById("camion");
camion.addEventListener("click", () => {
  //http://localhost:3000/api/camiones
  sessionStorage.setItem("tableHeaders", "Placa;Modelo");
});

const guiaRemision = document.getElementById("guia-remision");
guiaRemision.addEventListener("click", () => {
  //http://localhost:3000/api/guias
  sessionStorage.setItem("tableHeaders", "IdGuia;Destinatario;Fecha");
});

const orden = document.getElementById("orden");
orden.addEventListener("click", () => {
  sessionStorage.setItem("tableHeaders", "IdOrden;Cantidad;Precio;IdProducto;IdGuia");
});

const producto = document.getElementById("producto");
producto.addEventListener("click", () => {
  sessionStorage.setItem(
    "tableHeaders",
    "Nombre;Cantidad;Precio;Categoria;Vencimiento"
  );
});

const trabajador = document.getElementById("trabajador");
trabajador.addEventListener("click", () => {
  sessionStorage.setItem("tableHeaders", "DNI;Nombre;Direccion");
});
