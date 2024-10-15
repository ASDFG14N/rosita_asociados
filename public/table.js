const generateHeaders = (headers) => {
  let headerHTML = `<th scope="col" class="px-6 py-3 w-[2rem]">ID</th>`;
  headers.forEach((header) => {
    headerHTML += `<th scope="col" class="px-6 py-3">${header.toUpperCase()}</th>`;
  });
  headerHTML += `<th scope="col" class="px-6 py-3 text-right">Editar</th>`;
  headerHTML += `<th scope="col" class="px-6 py-3 text-right">Eliminar</th>`;
  headersRow.innerHTML = headerHTML;
};

const fillTableBody = async () => {
  try {
    const response = await fetch("URL");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    data.forEach((item) => {
      const row = `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              4
            </td>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4 text-right w-[2rem]">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
            </td>
            <td class="px-6 py-4 text-right w-[2rem]">
              <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
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

if (headers) {
  generateHeaders(headers.split(";"));
}
