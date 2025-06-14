import os
from flask import Flask, render_template, request, session, flash, redirect, url_for, abort
from flask_session import Session
from werkzeug.utils import redirect, secure_filename
from flask_bcrypt import Bcrypt
import pycountry
import uuid
import json
from datetime import datetime

import database

from data import PREDEFINED_LISTS

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


@app.route('/change_password', methods=['POST'])
def change_password():
    current_password = request.form['current_password']
    new_password = request.form['new_password']
    confirm_password = request.form['confirm_password']

    user_id = session.get('user_id')
    user = db.get_user_by_id(user_id) 

    if not bcrypt.check_password_hash (user['password'], current_password):
        flash('Current password is incorrect.', 'error')
    elif new_password != confirm_password:
        flash('New passwords do not match.', 'error')
    else:
        password = bcrypt.generate_password_hash(new_password)
        data_to_update = {}
        data_to_update["password"] = password
        response = db.update_user_details(user_id, data_to_update)
        if response is None:
            return render_template("settings.html", error="User details were not updated")
        flash('Password updated successfully.', 'success')

    return redirect(url_for('settings')) 



@app.route("/")
def index():
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")
    items = db.get_wishlist_items(user_id)
    
    if items is None:
        items = []
        
    all_user_lists = db.get_user_lists(user_id)
    if all_user_lists is None:
        all_user_lists = []
    
    shareable_lists = db.get_shareable_lists(user_id)
    if shareable_lists is None:
        shareable_lists = []
    has_shareable_lists = bool(shareable_lists)
    predefined_lists = PREDEFINED_LISTS
    return render_template("index.html", items=items, currencies=currencies, lists=all_user_lists, shareable_lists=shareable_lists, has_shareable_lists=has_shareable_lists, predefined_lists = predefined_lists)


@app.route("/new_wishlist", methods=["GET", "POST"])
def wishlist_items():
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")
    if request.method == "POST":
       
        title = request.form.get('title')
        image = request.files.get('image')
        description = request.form.get("description")
        url = request.form.get("url")
        price = request.form.get("price")
        currency = request.form.get("currency")
        priority = request.form.get("priority")
        private = 1 if request.form.get("private") else 0
        wanted_by = request.form.get("wanted_by")
        
        list_name_form = request.form.get('list_name')
        list_emoji_form = request.form.get('emoji')
        
        
        list_name_id_to_pass = None
        list_name_to_pass = None
        list_emoji_to_pass = None
        
        if not title or not title.strip():
            return render_template(
                "index.html",
                error="Please enter a valid title",
            )
        if not description or not description.strip():
            description = ""

        if not url or not url.strip():
            url = ''
        if list_name_form:
            list_name_id_to_pass = db.get_or_create_list_name(user_id, list_name_form, list_emoji_form)
            list_name_to_pass = list_name_form
            list_emoji_to_pass = list_emoji_form    
            if list_name_id_to_pass is None:
                flash("Could not associate with a list. Item not created.", "error")
                return redirect(url_for('index'))
            
        if wanted_by:
            try:
                wanted_by = datetime.strptime(wanted_by, "%Y-%m-%d").date()
            except ValueError:
                # можна записати помилку або просто ігнорувати
                pass 

        response = db.create_wishlist_item(list_name_id_to_pass, list_name_to_pass,  list_emoji_to_pass, image, title, description, url, user_id, price, currency,  priority, private, wanted_by)
        if response is None:
            return render_template("index.html", error="Item wasn't created")
        flash("Created!")
        return redirect(f"/")


@app.route("/update_wishlist_item", methods=["GET", "POST"])

def wishlist_item_update():
    user_id = session["user_id"]
    if not user_id:
        return redirect("/login")
    if request.method == "POST":
        item_id = request.form.get('id')
        title = request.form.get('title')
        image = request.files.get('image')
        description = request.form.get("description")
        url = request.form.get("url")
        price = request.form.get("price")
        currency = request.form.get("currency")
        priority = request.form.get("priority")
        private = request.form.get("private")
        delete_wish=request.form.get("delete")
        list_name = request.form.get("list_name")
        list_emoji = request.form.get("emoji")
        wanted_by = request.form.get("wanted_by")
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
            data_to_update['currency'] = currency
        if priority:
            data_to_update['priority'] = priority
        if private is not None:
            data_to_update['private'] = True
        else:
            data_to_update['private'] = False
        if list_name:
            list_id = db.get_or_create_list_name(user_id, list_name, list_emoji)
            data_to_update['list_id'] = list_id
            data_to_update['list_name'] = list_name
            data_to_update['list_emoji'] = list_emoji
        if wanted_by:
            try:
                wanted_by = datetime.strptime(wanted_by, "%Y-%m-%d").date()
                data_to_update['wanted_by'] = wanted_by
            except ValueError:
                # можна записати помилку або просто ігнорувати
                pass 
            
        if item_id:
            if delete_wish:
                response = db.delete_wishlist_item(item_id)
                if response is None:
                    return render_template("index.html", error="Item wasn't found")
                flash("Deleted!")
                return redirect(f"/")
            else:
                response = db.update_wishlist_item(item_id, data_to_update)
                if response is None:
                    return render_template("index.html", error="Item wasn't updated")
                flash("Updated!")
                return redirect(f"/")

# @app.route("/wishlist/<int:category_id>")
# def wishlist(category_id):
#     with open("examples.json", "r", encoding="utf-8") as f:
#         examples = json.load(f)

#     items = get_items_for_category(category_id)  # your DB query
#     return render_template("wishlist.html", items=items, category_id=category_id, examples=examples)


# @app.route("/wishlist/<int:category_id>/private_<int:item_id>", methods=["GET","POST"])
# def private_items(category_id, item_id):
#     if request.method == "POST":
#         private = request.form.get('private') == 'true'
#         data_to_update = {}
#         data_to_update = {'private': int(private)}
#         response = db.update_wishlist_item(item_id, data_to_update)
#         if response is None:
#             return render_template("wishlist_items.html", error="Item wasn't updated")
#         flash("Updated!")
#         return redirect(f"/wishlist/{category_id}")
    
    
    
    
# view list by token    
@app.route("/public/wishlist/<int:list_id>")
def view_wishlist(list_id):
    token = request.args.get("token")
    if not token:
        abort(400, description="Token is missing")
    wishes_by_list = db.get_wishlist_by_token(token)
    if wishes_by_list is None:
        abort(404, description="List is not found")
        
    print("Wishes:", wishes_by_list)
    return render_template("public_wishlist.html",  wishes = wishes_by_list, public_token=token)
    

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
    wish_reserved = db.wish_reservation(wish_id, data_to_update)
    if wish_reserved is None:
        abort(404, description="Wish is not reserved")
    
    return render_template("reservation_message.html", wish_reserved = True, reserved_token=reserved_token, wish_id = wish_id)

    
@app.route("/cancel_reservation/<int:wish_id>/<reserved_token>", methods=["POST"])
def cancel_reservation(wish_id, reserved_token):
    # Get the wish
    wish = db.get_wish_by_id(wish_id)
    if wish is None or wish["reserved_token"] != reserved_token:
        abort(403, description="You are not allowed to cancel this reservation.")
    
    # Reset reservation fields
    data_to_update = {
        "reserved_by_email": None,
        "reserved": 0,
        "reserved_token": None
    }
    cancel_response = db.wish_reservation(wish_id, data_to_update)
    if cancel_response is None:
        abort(500, description="Failed to cancel reservation.")
    
    flash("Reservation cancelled.")
    return render_template("reservation_message.html", reservation_cancelled=True, )
    
    
if __name__ == '__main__':
    app.run(debug=True)