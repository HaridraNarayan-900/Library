import { $ } from "../utils/dom.js";
import { editBook, deleteBookAction } from "../controllers/bookController.js";

// Renders the list of books into an HTML table
export function renderBookTable(books) {
  const body = $("booksTableBody");
  const noBooks = $("noBooks");

  body.innerHTML = "";

  if (books.length === 0) {
    noBooks.style.display = "block";
    return;
  }

  noBooks.style.display = "none";

  books.forEach(book => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${book.id}</td>
      <td class="px-3 py-2">${book.title}</td>
      <td class="px-3 py-2">${book.author}</td>
      <td class="px-3 py-2">${book.genre}</td>
      <td class="px-3 py-2">${book.year}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${book.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${book.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editBook(book.id);
    row.querySelector("[data-delete]").onclick = () => deleteBookAction(book.id);

    body.appendChild(row);
  });
}
