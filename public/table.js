const URL_API = "https://jsonplaceholder.typicode.com/users";

const generateHeaders = (headers) => {
  let headerHTML = `<th scope="col" class="px-6 py-3 w-[2rem]">ID</th>`;
  headers.forEach((header) => {
    headerHTML += `<th scope="col" class="px-6 py-3">${header.toUpperCase()}</th>`;
  });
  headerHTML += `<th scope="col" class="px-6 py-3 text-right">Editar</th>`;
  headerHTML += `<th scope="col" class="px-6 py-3 text-right">Eliminar</th>`;
  headersRow.innerHTML = headerHTML;
};

const fillTableBody = async (numberOfFields) => {
  try {
    const response = await fetch(URL_API);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    data.forEach((item) => {
      let row = `
        <tr class="border-b bg-slate-500 dark:border-gray-700 hover:bg-gray-600">
            <td class="px-6 py-4 font-medium text-black whitespace-nowrap">
              ${item.id}
            </td>
      `;

      const itemValues = Object.values(item);

      for (let i = 1; i <= numberOfFields && i < itemValues.length; i++) {
        row += `<td class="px-6 py-4 text-black">${itemValues[i]}</td>`;
      }
      row += `
            <td class="px-6 py-4 text-right w-[2rem]">
              <a href="#" class="font-medium text-gray-900 hover:underline edit">Editar</a>
            </td>
            <td class="px-6 py-4 text-right w-[2rem]">
              <a href="#" class="font-medium text-red-800 hover:underline" id="del">Remove</a>
            </td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error al llenar la tabla:", error);
  }
};

const headers = sessionStorage.getItem("tableHeaders");
const headersRow = document.getElementById("headers");
const closeButton = document.getElementById("close");
const form = document.getElementById("form-edit");

if (headers) {
  const headersList = headers.split(";");
  generateHeaders(headersList);
  (async () => {
    await fillTableBody(3);
    const elements = document.getElementsByClassName("edit");
    const edit = document.getElementById("container-edit");
    const toggleButton = elements[0];

    toggleButton.addEventListener("click", () => {
      edit.classList.remove("hidden");
    });
    closeButton.addEventListener("click", () => {
      edit.classList.add("hidden");
    });
    let htmlForm;
    headersList.forEach((header) => {
      htmlForm += `
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
          ${header}
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text">
      </div>
      `;
    });
    htmlForm += `   
      <div class="flex items-center justify-end">
        <button
          class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Confirmar
        </button>
      </div>`;
    form.innerHTML = htmlForm;
  })();
}