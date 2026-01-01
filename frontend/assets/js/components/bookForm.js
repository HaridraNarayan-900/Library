import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new book
export function resetForm() {
  // Reset all form fields to empty
  $("bookForm").reset();

  // Change the submit button text back to "Add Book"
  $("submitBtn").textContent = "Add Book";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected book object (for editing)
export function fillForm(book) {
  // Fill each input field with the corresponding property from the book data
  $("title").value = book.title;
  $("author").value = book.author;
  $("genre").value = book.genre;
  $("year").value = book.year;

  // Change the submit button text to "Update Book"
  $("submitBtn").textContent = "Update Book";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}

