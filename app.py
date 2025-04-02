from flask import Flask, render_template, request, session, flash, redirect
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
    if request.method == "POST":
        category = request.form["category_name"]
        if not category or not category.strip():
            print("please enter a valid category")
            return render_template("create_wishlist.html", error="Please enter a valid category")
        response = db.create_wishlist_category(category, user_id)
        if response is None:
            return render_template("create_wishlist.html", error="Category wasn't created")
        flash("Created!")
        return redirect("/wishlist")
    return render_template("create_wishlist.html")


@app.route("/wishlist", methods=["GET"])
def wishlist():
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")

    wishlist_categories = db.get_wishlist_categories(user_id)
    if wishlist_categories is None:
        return render_template("index.html", error="Categories weren't found")

    return render_template("wishlist.html", wishlist_categories=wishlist_categories)


@app.route("/wishlist/<int:category_id>", methods=["GET", "POST"])
def wishlist_items(category_id):
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")
    category_name = db.get_category_by_id(category_id, user_id)
    print(category_name)
    if not category_name:
        return None

    if request.method == "POST":
        item_id = request.form.get('id')
        title = request.form.get('title')
        print(item_id, title)

        print('item_id', item_id)
        description = request.form.get("description")
        url = request.form.get("url")
        price = request.form.get("price")
        delete_wish=request.form.get("delete")
        data_to_update = {}
        if title:
            data_to_update['title'] = title
        if description:
            data_to_update['description'] = description
        if url:
            data_to_update['url'] = url
        if price:
            data_to_update['price'] = price
        print(data_to_update)
        if item_id:
            if delete_wish:
                response = db.delete_wishlist_item(item_id)
                if response is None:
                    return render_template("wishlist_item.html", error="Item wasn't found")
                flash("Deleted!")
                return redirect(f"/wishlist/{category_id}")
            else:
                print('item_id', item_id)
                response = db.update_wishlist_item(item_id, data_to_update)
                if response is None:
                    return render_template("wishlist_items.html", error="Item wasn't updated")
                flash("Updated!")
                return redirect(f"/wishlist/{category_id}")
        else:
            if not title or not title.strip():
                return render_template(
                    "wishlist_items.html",
                    error="Please enter a valid title",
                    category_id=category_id,
                    category_name=category_name,
                )
            if not description or not description.strip():
                description = ""

            if not url or not url.strip():
                url = ''

            response = db.create_wishlist_item(title, description, url, user_id, price, category_id)
            if response is None:
                return render_template("wishlist_items.html", error="Item wasn't created")

            flash("Created!")
            return redirect(f"/wishlist/{category_id}")
    else:
        items = db.get_wishlist_items(user_id, category_id)
        if items is None:
            items = []
        print(items)
        return render_template("wishlist_items.html", items=items, category_id=category_id, category_name=category_name)



if __name__ == '__main__':
    app.run(debug=True)