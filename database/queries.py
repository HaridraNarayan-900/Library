
# books_crud.py

from datetime import datetime
from .connection import get_connection

# Get all books
def db_get_all_books():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM books ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

# Get one book by ID
def db_get_book(book_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

# Create a new book
def db_create_book(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO books (title, author, genre, published_year, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["title"], data["author"], data["genre"], data["published_year"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_book(new_id)

# Update an existing book
def db_update_book(book_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE books SET title=?, author=?, genre=?, published_year=?, updated_at=?
        WHERE id=?
    """, (data["title"], data["author"], data["genre"], data["published_year"], now, book_id))
    conn.commit()
    conn.close()
    return db_get_book(book_id)

# Delete a book
def db_delete_book(book_id):
    book = db_get_book(book_id)
    if not book:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM books WHERE id=?", (book_id,))
    conn.commit()
    conn.close()
    return book
