# Import sqlite3 module (in standart library - do not need to install)
import sqlite3

# Connect ot Database - in local file app.db
conn = sqlite3.connect('app.db')
# Create a cursor - a
c = conn.cursor()

c.execute('''
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT
)
''')

conn.commit()