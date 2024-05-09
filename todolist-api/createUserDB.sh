#!/bin/bash

DB_FILE="user.db"
SQL_STATEMENT="CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
);"
INSERT_DUMMY_ENTRY="INSERT INTO todos (email, password) VALUES ('zf@fordham.edu', 123);"

if [ -f "$DB_FILE" ]; then
    echo "Database file '$DB_FILE' already exists. Aborting."
    exit 1
fi

sqlite3 "$DB_FILE" <<EOF
$SQL_STATEMENT
$INSERT_DUMMY_ENTRY
EOF

if [ $? -eq 0 ]; then
    echo "SQLite database '$DB_FILE' created successfully."
else
    echo "Error creating SQLite database '$DB_FILE'."
fi
