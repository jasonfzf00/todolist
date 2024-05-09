# This is a simple example web app that is meant to illustrate the basics.
from flask import Flask, g, request, jsonify
from flask_cors import CORS, cross_origin
import urllib
import sqlite3

DATABASE = 'todolist.db'

app = Flask(__name__)
app.config.from_object(__name__)
cors = CORS(app)


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = sqlite3.connect(app.config['DATABASE'])
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Close the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()


@app.route("/api/items")
@cross_origin()
def get_items():
    db = get_db()
    cur = db.execute('SELECT id, name, completed FROM todos')
    entries = cur.fetchall()
    tdlist = [dict(id=row[0], name=row[1], completed=row[2])
              for row in entries]
    return jsonify(tdlist)


@app.route("/api/add", methods=['POST'])
@cross_origin()
def add_entry():
    db = get_db()
    data = request.json
    db.execute('insert into todos (name,completed) values (?, 0)',
               [data['name']])
    db.commit()
    return jsonify({"result": True})


@app.route("/api/delete/<item>", methods=['DELETE'])
@cross_origin()
def delete_entry(item):
    item = urllib.parse.unquote(item)
    db = get_db()
    db.execute("DELETE FROM todos WHERE id='"+item+"'")
    db.commit()
    return jsonify({"result": True})


@app.route("/api/item/<item>", methods=['PUT'])
@cross_origin()
def mark_as_done(item):
    item = urllib.parse.unquote(item)
    db = get_db()
    result = db.execute("SELECT completed FROM todos WHERE id=?", (item,)).fetchone()
    completed = not result[0]
    db.execute("UPDATE todos SET completed=? WHERE id=?", (completed, item))
    db.commit()
    return jsonify({"result": True, "completed": completed})

if __name__ == "__main__":
    app.run("0.0.0.0", port=8080)
