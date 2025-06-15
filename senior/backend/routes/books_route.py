from flask import Blueprint, jsonify, request

from services.books_service import (
    get_all_books,
    get_books_by_author_name,
    get_books_by_subject,
    get_books_by_subject_slug,
    create_new_book
)

books_bp = Blueprint('books', __name__)

@books_bp.route('/api/v1/books', methods=['GET'])
def get_books():
    # Get the page and page_size parameters from the request arguments
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    # Call the get_all_books function with the page and page_size parameters
    books = get_all_books(page=page, page_size=page_size)

    # Return the books as a JSON response
    return jsonify(books)

@books_bp.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author(author_slug):
    return jsonify(get_books_by_author_name(author_slug))

@books_bp.route('/api/v1/books/subjects', methods=['GET'])
def get_books_by_subject():
    return jsonify(get_books_by_subject())

@books_bp.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug(subject):
    return jsonify(get_books_by_subject_slug(subject))

@books_bp.route('/api/v1/books', methods=['POST'])
def create_book():

    # Get the book data from the request body
    book_data = request.get_json()

    return jsonify(create_new_book(book_data))
