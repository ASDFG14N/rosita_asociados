const headers = sessionStorage.getItem("tableHeaders");
const closeButton = document.getElementById("close");
const form = document.getElementById("form-edit");
const editContainer = document.getElementById("container-edit");

<<<<<<< HEAD
const generateHTMLHeaders = (headers) => {
  const headersRow = document.getElementById("headers");
=======
const generateHeaders = (headers) => {
>>>>>>> 0a21c3aecf69d8d0cd5518a15717ae125cd5a82b
  let headerHTML = ``;
  headers.forEach((header) => {
    headerHTML += `<th scope="col" class="px-6 py-3">${header.toUpperCase()}</th>`;
  });
  headerHTML += `<th scope="col" class="px-6 py-3 text-right">Editar</th>`;
  headerHTML += `<th scope="col" class="px-6 py-3 text-right">Eliminar</th>`;
  headersRow.innerHTML = headerHTML;
};

const fillTableBody = async (numberOfFields, endpoint) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    data.forEach((item) => {
      const itemValues = Object.values(item);
      let row = `
        <tr class="border-b bg-slate-500 dark:border-gray-700 hover:bg-gray-600">
<<<<<<< HEAD
          <td class="px-6 py-4 font-medium text-black whitespace-nowrap">${itemValues[0]}</td>
=======
            <td class="px-6 py-4 font-medium text-black whitespace-nowrap">
              ${itemValues[0]}
            </td>
>>>>>>> 0a21c3aecf69d8d0cd5518a15717ae125cd5a82b
      `;

      for (let i = 1; i <= numberOfFields && i < itemValues.length; i++) {
        row += `<td class="px-6 py-4 text-black">${itemValues[i]}</td>`;
      }
      row += `
            <td class="px-6 py-4 text-right w-[2rem]">
              <a href="#" class="font-medium text-gray-900 hover:underline edit">Editar</a>
            </td>
            <td class="px-6 py-4 text-right w-[2rem]">
              <a href="#" class="font-medium text-red-800 hover:underline delete">Eliminar</a>
            </td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error al llenar la tabla:", error);
  }
};

const generateHTMLForm = (headersList, editData) => {
  let htmlForm = "";
  headersList.forEach((header, index) => {
    htmlForm += `
        <div class="mb-4">
            <label class="block text-gray-300 text-sm font-bold mb-2">${header}</label>
            <input
                class="textField shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" value="${editData[index]}">
        </div>
        `;
  });

  htmlForm += `
    <div class="flex items-center justify-end">
        <button
            id="send"
            class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Confirmar
        </button>
    </div>`;

<<<<<<< HEAD
  form.innerHTML = htmlForm;

  const btnSend = document.getElementById("send");
  const jsonObject = {};
  btnSend.addEventListener("click", () => {
    const textFields = document.getElementsByClassName("textField");
    Array.from(textFields).forEach((textField, index) => {
      jsonObject[headersList[index]] = textField.value;
    });
    const jsonString = JSON.stringify(jsonObject);

    switch (headers) {
      case "IdAlmacen;Dirección;Tipo":
        url = `http://localhost:3000/api/almacenes/${id}`;
=======
  (async () => {
    switch (headers.trim()) {
      case "IdAlmacen;Dirección;Tipo":
        endpoint = "http://localhost:3000/api/almacenes";
>>>>>>> 0a21c3aecf69d8d0cd5518a15717ae125cd5a82b
        break;
      case "Placa;Modelo":
        url = `http://localhost:3000/api/camiones/${id}`;
        break;
<<<<<<< HEAD
      case "Destinatario;Fecha":
        url = `http://localhost:3000/api/guias/${id}`;
        break;
      case "IdOrden;Cantidad;Precio;IdProducto;IdGuia":
        url = `http://localhost:3000/api/ordenes/${id}`;
=======
      case "IdGuia;Destinatario;Fecha":
        endpoint = "http://localhost:3000/api/guias";
        break;
      case "IdOrden;Cantidad;Precio;IdProducto;IdGuia":
        endpoint = "http://localhost:3000/api/ordenes";
>>>>>>> 0a21c3aecf69d8d0cd5518a15717ae125cd5a82b
        break;
      case "Nombre;Cantidad;Precio;Categoria;Vencimiento":
        url = `http://localhost:3000/api/productos/${id}`;
        break;
      case "DNI;Nombre;Direccion":
        url = `http://localhost:3000/api/trabajadores`;
        break;
      default:
        console.error("No matching case found for headers");
        return;
    }

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Éxito:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};

const selectEndpoind = () => {
  switch (headers.trim()) {
    case "IdAlmacen;Dirección;Tipo":
      return "http://localhost:3000/api/almacenes";
    case "Placa;Modelo":
      return "http://localhost:3000/api/camiones";
    case "Destinatario;Fecha":
      return "http://localhost:3000/api/guias";
    case "IdOrden;Cantidad;Precio;IdProducto;IdGuia":
      return "http://localhost:3000/api/ordenes";
    case "Nombre;Cantidad;Precio;Categoria;Vencimiento":
      return "http://localhost:3000/api/productos";
    case "DNI;Nombre;Direccion":
      return "http://localhost:3000/api/trabajadores";
    default:
      return null;
  }
};

const addFunctionalityeEditButton = (editButtons, headersList, editData) => {
  Array.from(editButtons).forEach((editButton) => {
    editButton.addEventListener("click", () => {
      editContainer.classList.remove("hidden");

      const row = editButton.closest("tr");
      const cells = row.querySelectorAll("td");

      editData = [];
      cells.forEach((cell, index) => {
        if (
          index !== 0 &&
          index !== cells.length - 1 &&
          index !== cells.length - 2
        ) {
          editData.push(cell.textContent.trim());
        }
      });

      generateHTMLForm(headersList, editData);
    });
  });
};

const addFunctionalityeDeleteButton = (deleteButtons, headers) => {
  let id = "";
  Array.from(deleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const row = deleteButton.closest("tr");
      const cells = row.querySelectorAll("td");
      cells.forEach((cell, index) => {
        if (index === 0) {
          let url = "";
          const id = cell.textContent.trim();

          switch (headers) {
            case "IdAlmacen;Dirección;Tipo":
              url = `http://localhost:3000/api/almacenes/${id}`;
              break;
            case "Placa;Modelo":
              url = `http://localhost:3000/api/camiones/${id}`;
              break;
            case "Destinatario;Fecha":
              url = `http://localhost:3000/api/guias/${id}`;
              break;
            case "IdOrden;Cantidad;Precio;IdProducto;IdGuia":
              url = `http://localhost:3000/api/ordenes/${id}`;
              break;
            case "Nombre;Cantidad;Precio;Categoria;Vencimiento":
              url = `http://localhost:3000/api/productos/${id}`;
              break;
            case "DNI;Nombre;Direccion":
              url = `http://localhost:3000/api/trabajadores`;
              break;
            default:
              console.error("No matching case found for headers");
              return;
          }

          const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };

          fetch(url, options)
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response was not ok: ${response.statusText}`
                );
              }
              return response.json();
            })
            .then((data) => {
              console.log("Éxito:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    });
  });
};

if (headers) {
  const headersList = headers.split(";");
  generateHTMLHeaders(headersList);
  let endpoint = selectEndpoind();
  let editData = [];
  (async () => {
    await fillTableBody(headersList.length, endpoint);

    const editButtons = document.getElementsByClassName("edit");
    const deleteButtons = document.getElementsByClassName("delete");

    addFunctionalityeEditButton(editButtons, headersList, editData);
    addFunctionalityeDeleteButton(deleteButtons, headers);

    closeButton.addEventListener("click", () => {
      editContainer.classList.add("hidden");
    });
  })();
}
