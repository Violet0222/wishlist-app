import os
from flask import Flask, render_template, request, session, flash, redirect, url_for, abort
from flask_session import Session
from werkzeug.utils import redirect, secure_filename
from flask_bcrypt import Bcrypt
import pycountry
import uuid

import database

currencies = list(pycountry.currencies)

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
bcrypt = Bcrypt(app)
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
        session["user_name"] = response["user_name"]
        session["email"] = response["email"]
    
        # redirect to the main page
        return redirect("/")
    return render_template("login.html")

@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")

@app.route("/settings", methods=["GET", "POST"])
def settings():
    user_id = session.get("user_id")
    if not user_id:
        return redirect("/login")

    if request.method == "POST":
        new_user_name = request.form.get("user_name")
        new_user_email = request.form.get("email")
        data_to_update = {}

        if new_user_name:
            data_to_update["user_name"] = new_user_name
        if new_user_email:
            data_to_update["email"] = new_user_email

        if data_to_update:
            response = db.update_user_details(user_id, data_to_update)
            if response is None:
                return render_template("settings.html", error="User details were not updated")

            flash("Updated!")
            if new_user_name:
                session["user_name"] = new_user_name
            if new_user_email:
                session["email"] = new_user_email

        return redirect("/settings")

    user_name = session.get("user_name", "")
    email = session.get("email", "")
    return render_template("settings.html", user_name=user_name, email=email)





@app.route("/create_wishlist", methods=["GET", "POST"])
def create_wishlist():
    user_id = session["user_id"]
    if request.method == "POST":
        category_name = request.form.get("category_name")
        if not category_name or not category_name.strip():
            print("please enter a valid category")
            return render_template("create_wishlist.html", error="Please enter a valid category")
        public_token = str(uuid.uuid4())
        response = db.create_wishlist_category(category_name, public_token, user_id)
        if response is None:
            return render_template("create_wishlist.html", error="Category wasn't created")
        flash("Created!")
        return redirect("/wishlist")
    return render_template("create_wishlist.html")


@app.route("/wishlist", methods=["GET", "POST"])
def wishlist():
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")
    if request.method == "POST":
        category_id = request.form.get('id')
       
        delete_category=request.form.get("delete")
        card_background= request.form.get("card_color")
        name = request.form.get("name", "").strip()
        emoji = request.form.get("emoji", "").strip()
        data_to_update = {}
       
        if category_id:
            if delete_category:
                response = db.delete_category(category_id)
                if response is None:
                    return render_template("wishlist_item.html", error="Category wasn't found")
                flash("Deleted!")
                return redirect(f"/wishlist")
            if card_background:
                data_to_update['card_background'] = card_background
                response = db.update_category(category_id, data_to_update)                            
                if response is None:
                    return render_template("wishlist_item.html", error="Category wasn't found")
                return redirect(f"/wishlist")
            if name:
                data_to_update['name'] = name
                response = db.update_category(category_id, data_to_update)                            
                if response is None:
                    return render_template("wishlist_item.html", error="Category wasn't found")
                return redirect(f"/wishlist")
            if emoji:
                data_to_update['emoji'] = emoji
                response = db.update_category(category_id, data_to_update)                            
                if response is None:
                    return render_template("wishlist_item.html", error="Category wasn't found")
                return redirect(f"/wishlist")
    else:
        wishlist_categories = db.get_wishlist_categories(user_id)
        if wishlist_categories is None:
            return render_template("wishlist.html", error="Categories weren't found")
        return render_template("wishlist.html", wishlist_categories=wishlist_categories)



@app.route("/wishlist/<int:category_id>", methods=["GET", "POST"])
def wishlist_items(category_id):
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")
    category = db.get_category_by_id(category_id)
    print(category)
    if not category:
        return None
    
    if request.method == "POST":
        item_id = request.form.get('id')
        title = request.form.get('title')
        image = request.files.get('image')
        description = request.form.get("description")
        url = request.form.get("url")
        price = request.form.get("price")
        currency = request.form.get("currency")
        priority = request.form.get("priority")
        hide = request.form.get("hide")
        delete_wish=request.form.get("delete")
        data_to_update = {}
        if title:
            data_to_update['title'] = title
        if image and allowed_file(image.filename):
            print("here")
            filename = secure_filename(image.filename)
            print(filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            print(filepath)
            image.save(filepath)
            data_to_update['image'] = filename
        if description:
            data_to_update['description'] = description
        if url:
            data_to_update['url'] = url
        if price:
            data_to_update['price'] = price
        if currency:
            data_to_update['currency'] = price
        if priority:
            data_to_update['priority'] = priority
        
        if item_id:
            if delete_wish:
                response = db.delete_wishlist_item(item_id)
                if response is None:
                    return render_template("wishlist_item.html", error="Item wasn't found")
                flash("Deleted!")
                return redirect(f"/wishlist/{category_id}")
            else:
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
                    category_name=category,
                )
            if not description or not description.strip():
                description = ""

            if not url or not url.strip():
                url = ''

            response = db.create_wishlist_item(title, description, url, user_id, price, currency,  priority, category_id)
            if response is None:
                return render_template("wishlist_items.html", error="Item wasn't created")

            flash("Created!")
            return redirect(f"/wishlist/{category_id}")
    else:
        items = db.get_wishlist_items(user_id, category_id)
        if items is None:
            items = []
        return render_template("wishlist_items.html", items=items, category_id=category_id, category=category, currencies=currencies)

@app.route("/wishlist/<int:category_id>/private_<int:item_id>", methods=["GET","POST"])
def private_items(category_id, item_id):
    if request.method == "POST":
        private = request.form.get('private') == 'true'
        data_to_update = {}
        data_to_update = {'private': int(private)}
        response = db.update_wishlist_item(item_id, data_to_update)
        if response is None:
            return render_template("wishlist_items.html", error="Item wasn't updated")
        flash("Updated!")
        return redirect(f"/wishlist/{category_id}")
    
    
    
    
# view category by token    
@app.route("/public/wishlist/<int:category_id>/<public_token>")
def view_wishlist(category_id, public_token):
    category_response = db.get_wishlist_category_by_token(category_id, public_token)
    if category_response is None:
        abort(404, description="Category is not found")
    wishes_response = db.get_wishlist_items_by_token(category_id)
    if wishes_response is None:
        abort(404, description="Wishes are not found")
    return render_template("public_wishlist.html", category = category_response, wishes = wishes_response)
    

@app.route("/reserve/<int:wish_id>", methods=["POST"])
def reserve_wish( wish_id):
    email = request.form.get("email")
    if not email:
        flash("Введите email", "error")
        return redirect(request.referrer)
    reserved = 1
    reserved_token = str(uuid.uuid4())
    data_to_update = {}
    data_to_update['reserved_by_email'] = email
    data_to_update['reserved'] = reserved
    data_to_update['reserved_token'] = reserved_token
    data_to_update
    wish_response = db.wish_reservation(wish_id, data_to_update)
    if wish_response is None:
        abort(404, description="Wish is not reserved")
    return render_template("reservation_message.html")

    
 
    
    
    
if __name__ == '__main__':
    app.run(debug=True)