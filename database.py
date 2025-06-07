import sqlite3

from flask_bcrypt import Bcrypt
import uuid

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
"""CREATE TABLE IF NOT EXISTS list_name (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    emoji TEXT,
    public_token TEXT UNIQUE,
    UNIQUE(user_id, name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE      
);
""",
"""CREATE TABLE IF NOT EXISTS wish (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    list_id INTEGER,
    list_emoji TEXT,
    list_name TEXT,
    title TEXT(150) NOT NULL,
    image TEXT,
    description TEXT,
    url TEXT(500),
    price REAL, 
    currency TEXT(10),
    priority INTEGER DEFAULT 0,
    reserved INTEGER DEFAULT 0,  -- 0 = false, 1 = true
    reserved_by_email TEXT,
    reserved_token TEXT,
    reserved_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    private BOOLEAN NOT NULL CHECK (private IN (0, 1)) DEFAULT 0,
    received BOOLEAN DEFAULT 0,
    wanted_by DATE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (list_id) REFERENCES list_name(id) ON DELETE SET NULL
);"""
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

def get_user_by_id (user_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        # Query database for username
        user = cursor.execute("""SELECT * FROM users WHERE id=?""", (user_id,)).fetchone()
        # Ensure username exists and password is correct
        if not user:
            return None
        return user
    except sqlite3.OperationalError as e:
        print("Failed to get user:", e)
        return None


    


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


    

def create_wishlist_item(list_name_id, list_name, list_emoji, image, title, description, url, user_id, price, currency,  priority, private, wanted_by):
    conn = get_db()
    if conn is None:
        print("Database connection failesd")
        return None
    try:
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO wish (user_id, list_id, list_name, list_emoji, title, image, description, url, price, currency, priority, wanted_by, private, reserved) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (user_id, list_name_id, list_name, list_emoji, title, image, description, url, price, currency, priority, wanted_by, private, 0))
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        print("Failed to create a wishlist item:", e)
        return None


def get_wishlist_items(user_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        wishlist_items = cursor.execute("""SELECT * FROM wish WHERE user_id=?""",
                                        (user_id,)).fetchall()
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


def get_wishlist_by_token(public_token):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()

        # Step 1: Get list_id using the public_token
        cursor.execute("SELECT id FROM list_name WHERE public_token = ?", (public_token,))
        list_info = cursor.fetchone()

        if not list_info:
            print("No list found with that token")
            return None

        list_id = list_info["id"]

        # Step 2: Fetch all wishes that belong to that list
        cursor.execute("""
            SELECT *
            FROM wish
            WHERE list_id = ? AND private = 0
            ORDER BY priority DESC, created_at DESC;
        """, (list_id,))

        wishes = cursor.fetchall()
        wishes = [dict(row) for row in wishes]

        return  wishes  
    except sqlite3.OperationalError as e:
        print("Failed to get categories:", e)
        return None
    
def get_wishlist_items_by_token(category_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        
        wishlist_items = cursor.execute("""SELECT * FROM wish WHERE category_id=?""", (category_id,)).fetchall()
        if not wishlist_items:
            return None
        return wishlist_items
    except sqlite3.OperationalError as e:
        print("Failed to get a wishlist:", e)
        return None
    
def wish_reservation(record_id, data):
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
        return True
    except sqlite3.OperationalError as e:
        print("Failed to get a wishlist:", e)
        return None
    
def get_wish_by_id(wish_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        wishes = cursor.execute("""SELECT * FROM wish WHERE id = ?""",(wish_id,)).fetchone()
        if not wishes:
            return None
        return wishes
    except sqlite3.OperationalError as e:
        print("Failed to get categories:", e)
        return None
    
    




def get_or_create_list_name(user_id, list_name, emoji):
    print(list_name)
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return None
    try:
        cursor = conn.cursor()
        # Check if list_name exists
        row = cursor.execute(
            "SELECT id, emoji FROM list_name WHERE user_id = ? AND name = ?",
            (user_id, list_name)
        ).fetchone()
        if row:
            list_id, current_emoji = row
            # Update emoji if it's different
            if emoji != current_emoji:
                cursor.execute(
                    "UPDATE list_name SET emoji = ? WHERE id = ?",
                    (emoji, list_id)
                )
                conn.commit()
            return list_id

        # Generate a unique public token
        public_token = str(uuid.uuid4())[:8]
        print(public_token)
        # Insert new list_name with emoji and token
        cursor.execute(
            "INSERT INTO list_name (user_id, name, emoji, public_token) VALUES (?, ?, ?, ?)",
            (user_id, list_name, emoji, public_token)
        )
        conn.commit()
        return cursor.lastrowid
    except sqlite3.OperationalError as e:
        print("Failed to get or create list_name:", e)
        return None


def get_user_lists(user_id):
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return []
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, name, emoji, public_token
            FROM list_name
            WHERE user_id = ?
            ORDER BY id DESC
        """, (user_id,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    except sqlite3.OperationalError as e:
        print("Failed to fetch user lists:", e)
        return []


    
    
# to delete
def drop_table():
    conn = get_db()
    if conn is None:
        print("Database connection failed")
        return

    try:
        cursor = conn.cursor()


        cursor.execute("DROP TABLE IF EXISTS list_name")
        conn.commit()
        print("Table 'wish' has been deleted.")

    except sqlite3.OperationalError as e:
        print("Failed to delete table:", e)
    finally:
        conn.close()

if __name__ == "__main__":
    init_db()

