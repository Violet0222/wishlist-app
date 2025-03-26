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
    description TEXT,
    url TEXT(500),
    price REAL CHECK (price > 0), 
    reserved INTEGER DEFAULT 0,  -- 0 = false, 1 = true
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);""",
    """CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
"""
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
            conn.close() #close the connection

# create a new user

def create_user(user_name, email, hashed_password):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return False
    try:
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO users (user_name, email, password) VALUES (?,?,?);""", (user_name, email, hashed_password))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to create user:", e)
        return False
    finally:
        if conn:
            conn.close() #close the connection

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
            conn.close() #close the connection


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


# to delete
def drop_table():
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return

    try:
        cursor = conn.cursor()

        # Видаляємо таблицю "wish", якщо вона існує
        cursor.execute("DROP TABLE IF EXISTS wish;")
        conn.commit()
        print("Table 'wish' has been deleted.")

    except sqlite3.OperationalError as e:
        print("Failed to delete table:", e)
    finally:
        conn.close()

# if __name__ == "__main__":
#     init_db()


