const headers = sessionStorage.getItem("tableHeaders");
const addButton = document.getElementById("add");
const closeButton = document.getElementById("close");
const form = document.getElementById("form-edit");
const editContainer = document.getElementById("container-edit");
let optionClick = 0;

const generateHTMLHeaders = (headers) => {
  const headersRow = document.getElementById("headers");
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
    const response = await fetch(endpoint);
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
          <td class="px-6 py-4 font-medium text-black whitespace-nowrap">${itemValues[0]}</td>
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

const generateHTMLForm = (headersList, editData = [], id) => {
  let htmlForm = "";
  const startIndex = "Placa;Modelo" || "DNI;Nombre;Direccion" ? 0 : 1;

  for (let i = startIndex; i < headersList.length; i++) {
    htmlForm += `
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2">${
          headersList[i]
        }</label>
        <input 
          class="textField shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
          type="text" value="${
            editData.length == 0 ? "" : editData[i - (startIndex === 1 ? 1 : 0)]
          }">
      </div>
    `;
  }

  htmlForm += `
    <div class="flex items-center justify-end">
        <button
            id="send"
            class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Confirmar
        </button>
    </div>`;

  form.innerHTML = htmlForm;

  const btnSend = document.getElementById("send");
  const jsonObject = {};
  let url = "";
  btnSend.addEventListener("click", () => {
    const textFields = document.getElementsByClassName("textField");
    jsonObject[headersList[0]] = id;
    Array.from(textFields).forEach((textField, index) => {
      jsonObject[headersList[index + 1]] = textField.value;
    });
    const json = JSON.stringify(jsonObject);

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

    const method = optionClick == 1 ? "POST" : "PUT";
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
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
        location.reload();
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
    case "IdGuia;Destinatario;Fecha":
      return "http://localhost:3000/api/guias";
    case "IdOrden;Cantidad;Precio;IdProducto;IdGuia":
      return "http://localhost:3000/api/ordenes";
    case "IdProducto;Nombre;Cantidad;Precio;Categoria;Vencimiento":
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
      optionClick = 0;

      const row = editButton.closest("tr");
      const cells = row.querySelectorAll("td");
      let id = "";

      editData = [];
      cells.forEach((cell, index) => {
        if (
          index !== 0 &&
          index !== cells.length - 1 &&
          index !== cells.length - 2
        ) {
          editData.push(cell.textContent.trim());
        }
        if (index === 0) {
          id = cell.textContent.trim();
        }
      });

      generateHTMLForm(headersList, editData, id);
    });
  });
};

const addFunctionalityeDeleteButton = (deleteButtons, headers) => {
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
            case "IdGuia;Destinatario;Fecha":
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

          fetch(url, options).then((data) => {
            console.log("Éxito:", data);
            location.reload();
          });
        }
      });
    });
  });
};

if (headers) {
  const headersList = headers.split(";");
  generateHTMLHeaders(headersList);
  addButton.addEventListener("click", () => {
    editContainer.classList.remove("hidden");
    optionClick = 1;
    generateHTMLForm(headersList);
  });
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
