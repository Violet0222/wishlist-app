from flask import Flask, render_template, request, session, flash, redirect, url_for, jsonify
from flask_session import Session
from werkzeug.utils import redirect
from flask_bcrypt import Bcrypt

import database

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
bcrypt = Bcrypt(app)

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    return render_template("index.html")

db = database

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]
        confirmation = request.form["confirm_password"]
        if password != confirmation:
            return render_template("register.html", error="Passwords must match")
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        db.create_user(username, email, hashed_password)
        return redirect("/login")
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    # if form is submited
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        response = db.get_user(username, password)

        if response is None:
            return render_template("login.html", error="User not found")

        # record the user name
        session["user_id"] = response["id"]

        # redirect to the main page
        return redirect("/")
    return render_template("login.html")

@app.route("/create_wishlist", methods=["GET", "POST"])
def create_wishlist():
    user_id = session["user_id"]
    print(user_id)
    if request.method == "POST":
        category = request.form["category_name"]
        if not category or not category.strip():
            print("please enter a valid category")
            return render_template("create_wishlist.html", error="Please enter a valid category")
        response = db.create_wishlist_category(category, user_id)
        if response is None:
            return render_template("create_wishlist.html", error="Category wasn't created")
        flash("Created!")
        return redirect("/")
    return render_template("create_wishlist.html")


if __name__ == '__main__':
    app.run(debug=True)