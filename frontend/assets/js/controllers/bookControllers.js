import { 
    apiGetAll, 
    apiGetBook, 
    apiCreateBook, 
    apiUpdateBook, 
    apiDeleteBook 
} from "../services/bookService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/BookTable.js";
import { resetForm, fillForm } from "../components/BookForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

export function initBookController() {
  loadBooks();

  $("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: $("title").value.trim(),
      author: $("author").value.trim(),
      genre: $("genre").value.trim(),
      year: $("year").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateBook(editingId, data)
      : await createNewBook(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

export async function loadBooks() {
  const spinner = $("loadingSpinner");
  const table = $("booksTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const books = await apiGetAll();

  setState({ books });
  renderBookTable(books);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function createNewBook(data) {
  const res = await apiCreateBook(data);
  if (res.ok) {
    showAlert("Book added!");
    resetForm();
    loadBooks();
  }
}

export async function editBook(id) {
  const book = await apiGetBook(id);

  setState({ editingId: id });
  fillForm(book);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function updateBook(id, data) {
  const res = await apiUpdateBook(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadBooks();
  }
}

export async function deleteBookAction(id) {
  if (!confirm("Delete this book?")) return;

  const res = await apiDeleteBook(id);
  if (res.ok) {
    showAlert("Deleted!");
    loadBooks();
  }
}

