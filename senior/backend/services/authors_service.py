import sqlite3

def get_authors():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all authors
    cursor.execute('SELECT * FROM author;')
    authors = cursor.fetchall()

    author_list = []

    for author in authors:
        author_dict = {
            'id': author[0],
            'title': author[1],
            'slug': author[2],
            'biography': author[3]
        }
        author_list.append(author_dict)

    # Close the database connection
    conn.close()

    # Return the authors as a JSON response
    return author_list
