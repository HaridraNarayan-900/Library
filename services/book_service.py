from database.queries import (
    db_get_all,
    db_get_one,
    db_create,
    db_update,
    db_delete
)

def service_get_all():
    """Return all books"""
    return db_get_all()

def service_get_one(book_id):
    """Return a single book by ID"""
    return db_get_one(book_id)

def service_create(data):
    """Create a new book"""
    return db_create(data)

def service_update(book_id, data):
    """Update an existing book"""
    return db_update(book_id, data)

def service_delete(book_id):
    """Delete a book by ID"""
    return db_delete(book_id)
