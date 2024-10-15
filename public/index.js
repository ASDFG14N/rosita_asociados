const almacen = document.getElementById("almacen");
almacen.addEventListener("click", () => {
  sessionStorage.setItem("tableHeaders", "Dirección;Tipo");
});

const camion = document.getElementById("camion");
camion.addEventListener("click", () => {
  sessionStorage.setItem("tableHeaders", "Placa;Modelo");
});

const guiaRemision = document.getElementById("guia-remision");
guiaRemision.addEventListener("click", () => {
  sessionStorage.setItem("tableHeaders", "Destinatario;Fecha");
});

const orden = document.getElementById("orden");
orden.addEventListener("click", () => {
  sessionStorage.setItem("tableHeaders", "Cantidad;Precio");
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
