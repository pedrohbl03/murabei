import sqlite3

def get_all_books(page=1, page_size=10, author_slug=None, title=None, subject=None):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Calculate the offset based on the page number and page size
    offset = (page - 1) * page_size
    
    query = 'SELECT * FROM book'
    meta_query = 'SELECT COUNT(*) FROM book'
    conditions = []
    params = []

    if author_slug:
        conditions.append('author_slug LIKE ?')
        params.append(f'%{author_slug}%')
    if title:
        conditions.append('title LIKE ?')
        params.append(f'%{title}%')
    if subject:
        conditions.append('subjects LIKE ?')
        params.append(f'%{subject}%')
    if conditions:
        query += ' WHERE ' + ' AND '.join(conditions)
        meta_query += ' WHERE ' + ' AND '.join(conditions)

    if not conditions:
        query += ' ORDER BY id'
    else:
        query += ' ORDER BY title'

    query += ' LIMIT ? OFFSET ?;'

    params.append(page_size)
    params.append(offset)

    # Execute the meta query to get the total count of books
    cursor.execute(meta_query, params[:-2])
    total_books = cursor.fetchone()[0]
    # Calculate pagination metadata
    pagination_metadata = {
        'current_page': page,
        'page_size': page_size,
        'total_books': total_books,
        'total_pages': (total_books + page_size - 1) // page_size,
    }

    # Execute the query to fetch books with pagination
    cursor.execute(query, params)
    # Fetch all books based on the query

    books = cursor.fetchall()
    # Convert the books data to a list of dictionaries
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return { 'books': book_list, 'pagination_metadata': pagination_metadata }

def get_books_by_author_name(author_slug):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all books by the given author
    cursor.execute(
        'SELECT * FROM book WHERE author_slug = ?;', (author_slug,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
            'authors': book[5],
            'publisher': book[12],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list

def get_books_by_subject():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all subjects, and the slug from the table subject
    cursor.execute("SELECT subjects FROM book;")
    subjects = cursor.fetchall()

    conn.close()

    return subjects

def get_books_by_subject_slug(subject):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    query = '''
    SELECT title, author, author_slug, author_bio, authors, publisher, synopsis
    FROM book
    WHERE subjects = ?
    '''

    # Execute a SELECT query to fetch all books by the given subject
    cursor.execute(query, (subject,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'title': book[0],
            'author': book[1],
            'slug': book[2],
            'biography': book[3],
            'authors': book[4],
            'publisher': book[5],
            'synopsis': book[6],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list

def create_new_book(book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Get the book data from the request body
    title = book_data['title']
    author = book_data['author']
    author_slug = book_data['author_slug']
    author_bio = book_data['author_bio']
    authors = book_data['authors']
    publisher = book_data['publisher']
    synopsis = book_data['synopsis']

    # Execute a query to create a new book
    cursor.execute('INSERT INTO book (title, author, author_slug, author_bio, authors, publisher, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?);',
                   (title, author, author_slug, author_bio, authors, publisher, synopsis))

    # Commit the changes to the database
    conn.commit()

    # Close the database connection
    conn.close()

    # Return a message to the user
    return {'message': 'Book created successfully.'}, 201
