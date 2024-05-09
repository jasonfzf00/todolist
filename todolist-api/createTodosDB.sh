#!/bin/bash

# Scripts
DB_FILE="todolist.db"
SQL_STATEMENT="CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    completed BOOLEAN NOT NULL
);"
INSERT_DUMMY_ENTRY=(
    "INSERT INTO todos (name, completed) VALUES ('eat', 1);
    INSERT INTO todos (name, completed) VALUES ('sleep', 0);
    INSERT INTO todos (name, completed) VALUES ('work', 0);"
)

# Check if the database already exists
if [ -f "$DB_FILE" ]; then
    echo "Database file '$DB_FILE' already exists. Aborting."
    exit 1
fi

# Execute scripts
sqlite3 "$DB_FILE" <<EOF
$SQL_STATEMENT
$INSERT_DUMMY_ENTRY
EOF

# Check if the creation was successful
if [ $? -eq 0 ]; then
    echo "SQLite database '$DB_FILE' created successfully."
else
    echo "Error creating SQLite database '$DB_FILE'."
fi