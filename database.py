import sqlite3
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
        title TEXT(150) NOT NULL,
        description TEXT,
        url TEXT(500),
        price REAL CHECK (price > 0), 
        reserved INTEGER DEFAULT 0,  -- 0 = false, 1 = true
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );"""
]


database = 'wishlist.db'
# Connect to the database
try:
    with sqlite3.connect(database) as conn:
        print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
        pass
except sqlite3.OperationalError as e:
    print("Failed to open database:", e)

# Execute SQL statements
try:
    with sqlite3.connect(database) as conn:
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
    print("Failed to create tables:", e)

