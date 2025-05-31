Wishlist Web App
Welcome to the Wishlist Web App! This app lets you create, organize, and share your personal wishlist items in a beautifully designed and easy-to-use interface.

Features
Create, edit, and delete wishlist items

Add detailed information to each wish: title, description, image, price, currency, priority, and due date

Mark items as reserved or not reserved

Organize items into different lists (e.g., birthday, holidays)

Inline editing with modals for a smooth UX

Image upload and preview for each wishlist item

Sorting and filtering of wishlist items

Responsive design with user-friendly controls

Technologies Used
Backend templating with Flask

JavaScript for interactive features (wishlist-items.js, modal_window.js, menu_dropdown.js, sort.js, filter.js)

CSS for styling (styles.css, menu_dropdown.css, modal_window.css)

Installation & Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Violet0222/wishlist-app.git
cd wishlist-webapp
Set up a Python environment (optional but recommended):

bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`
Install dependencies:

(Assuming Flask and other required packages are listed in requirements.txt)

bash
Copy
Edit
pip install -r requirements.txt
Run the app:

bash
Copy
Edit
flask run
Open your browser and navigate to http://127.0.0.1:5000 to see the wishlist app.

Usage
Click the + New button to add a new wishlist item.

Click on any field (title, description, price, etc.) to edit it inline or via modal dialogs.

Upload images to visually enhance your wishes.

Project Structure
templates/ — HTML templates

static/ — Static files (JS, CSS, images)

app.py Main Flask application file

requirements.txt — Python dependencies

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the app.

License
This project is licensed under the MIT License.
