import sqlite3

from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# add reservation table
sql_statements = [
    """CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        user_name TEXT(100) NOT NULL,
        email TEXT(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );""",
    """CREATE TABLE IF NOT EXISTS wish (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    title TEXT(150) NOT NULL,
    image TEXT,
    description TEXT,
    url TEXT(500),
    price REAL, 
    currency TEXT(3),
    priority INTEGER DEFAULT 0,
    public_token TEXT UNIQUE,
    reserved INTEGER DEFAULT 0,  -- 0 = false, 1 = true
    reserved_by_email TEXT,
    reserved_token TEXT,
    reserved_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    private BOOLEAN NOT NULL CHECK (private IN (0, 1)) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);""",
    """CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT(100) NOT NULL UNIQUE,
    emoji TEXT,
    public_token TEXT UNIQUE,
    card_background TEXT DEFAULT '#f5f5f5',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
""",


]

DATABASE = 'wishlist.db'


# Connect to the database

def get_db():
    try:
        db = sqlite3.connect(DATABASE)  # Open the connection
        db.row_factory = sqlite3.Row  # This allows accessing columns by name
        return db
    except sqlite3.OperationalError as e:
        print("Failed to connect to db:", e)
        return None  # Return None if connection fails


# Create tables

def init_db():
    conn = get_db()
    if conn is None:
        print("Database connection failed. Tables will not be created.")
        return
    try:
        # create a cursor
        cursor = conn.cursor()
        # Enable foreign keys
        cursor.execute("PRAGMA foreign_keys = ON;")
        # execute statements
        for statement in sql_statements:
            cursor.execute(statement)

        # commit the changes
        conn.commit()

        print("Tables created successfully.")
    except sqlite3.OperationalError as e:
        print("Failed to create table:", e)
    finally:
        if conn:
            conn.close()  #close the connection


# create a new user

def create_user(user_name, email, hashed_password):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return False
    try:
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO users (user_name, email, password) VALUES (?,?,?);""",
                       (user_name, email, hashed_password))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to create user:", e)
        return False
    finally:
        if conn:
            conn.close()  #close the connection


def get_user(user_name, password):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        # Query database for username
        user = cursor.execute("""SELECT * FROM users WHERE user_name=?""", (user_name,)).fetchone()
        # Ensure username exists and password is correct
        if not user or not bcrypt.check_password_hash(user['password'], password):
            return None
        return user
    except sqlite3.OperationalError as e:
        print("Failed to get user:", e)
        return None
    finally:
        if conn:
            conn.close()  #close the connection

def update_user_details (user_id, data):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        # Build the SET clause of the SQL query using named parameters
        set_clause = ", ".join([f"{col} = :{col}" for col in data.keys()])

        # Construct the SQL query
        sql = f"""
          UPDATE users
          SET {set_clause}
          WHERE id = :user_id
          """

        # Prepare the values for the update, including the record_id
        values = data.copy()  # Create a copy to avoid modifying the original
        values["user_id"] = user_id
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        if cursor.rowcount == 0:
            print("No item was updated (check if item exists)")
            return None  # No row was updated
        return True
    except sqlite3.OperationalError as e:
        print("Failed to update a wishlist:", e)
        return None

def create_wishlist_category(category, user_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO category (name, user_id) VALUES (?,?)""", (category, user_id))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to create a wishlist category:", e)
        return None


def get_wishlist_categories(user_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        categories = cursor.execute("""SELECT * FROM category WHERE user_id = ?""", (user_id,)).fetchall()

        if not categories:
            return None
        return categories
    except sqlite3.OperationalError as e:
        print("Failed to get categories:", e)
        return None


def get_category_by_id(category_id, user_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        category = cursor.execute("""SELECT * FROM category WHERE id = ? AND user_id =?""",(category_id, user_id)).fetchone()
        if not category:
            return None
        return category
    except sqlite3.OperationalError as e:
        print("Failed to get categories:", e)
        return None

def delete_category(category_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        cursor.execute("""DELETE FROM category WHERE id = ?""", (category_id,))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to delete category:", e)
        return None
    
    
 
def update_category(record_id, data):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        print(data)
        # Build the SET clause of the SQL query using named parameters
        set_clause = ", ".join([f"{col} = :{col}" for col in data.keys()])

        # Construct the SQL query
        sql = f"""
          UPDATE category
          SET {set_clause}
          WHERE id = :record_id
          """

        # Prepare the values for the update, including the record_id
        values = data.copy()  # Create a copy to avoid modifying the original
        values["record_id"] = record_id
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        if cursor.rowcount == 0:
            print("No item was updated (check if item exists)")
            return None  # No row was updated
        return True
    except sqlite3.OperationalError as e:
        print("Failed to update a wishlist:", e)
        return None
    

def create_wishlist_item(title, description, url, user_id, price, currency, priority, category_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO wish (title, description, url, price, currency, priority, user_id, category_id, reserved) VALUES (?,?,?,?,?,?,?,?,?)""",
            (title, description, url, price, currency, priority, user_id, category_id, 0))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to create a wishlist item:", e)
        return None


def get_wishlist_items(user_id, category_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        wishlist_items = cursor.execute("""SELECT * FROM wish WHERE user_id=? AND category_id=?""",
                                        (user_id, category_id)).fetchall()

        # Debugging: Print fetched results
        print(f"Query result for user_id={user_id}, category_id={category_id}: {wishlist_items}")
        if not wishlist_items:
            return None
        return wishlist_items
    except sqlite3.OperationalError as e:
        print("Failed to get a wishlist:", e)
        return None


def update_wishlist_item(record_id, data):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        # Build the SET clause of the SQL query using named parameters
        set_clause = ", ".join([f"{col} = :{col}" for col in data.keys()])

        # Construct the SQL query
        sql = f"""
          UPDATE wish
          SET {set_clause}
          WHERE id = :record_id
          """

        # Prepare the values for the update, including the record_id
        values = data.copy()  # Create a copy to avoid modifying the original
        values["record_id"] = record_id
        cursor = conn.cursor()
        cursor.execute(sql, values)
        conn.commit()
        if cursor.rowcount == 0:
            print("No item was updated (check if item exists)")
            return None  # No row was updated
        return True
    except sqlite3.OperationalError as e:
        print("Failed to update a wishlist:", e)
        return None

def delete_wishlist_item(wish_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        cursor.execute("""DELETE FROM wish WHERE id = ?""", (wish_id,))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to delete a wishlist:", e)
        return None


# to delete
def drop_table():
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return

    try:
        cursor = conn.cursor()


        cursor.execute("DROP TABLE IF EXISTS wish")
        conn.commit()
        print("Table 'wish' has been deleted.")

    except sqlite3.OperationalError as e:
        print("Failed to delete table:", e)
    finally:
        conn.close()

if __name__ == "__main__":
    init_db()
