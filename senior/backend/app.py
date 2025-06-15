import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.books_route import books_bp
from routes.authors_route import authors_bp

app = Flask(__name__)
app.register_blueprint(books_bp)
app.register_blueprint(authors_bp)


## Enable CORS for all routes
CORS(app)

@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, Murabei!"