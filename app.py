import os
import sqlite3
from PIL import Image
from flask import Flask, request, render_template, redirect, jsonify

class User():
    folder = 1
    reload = False

def read_data_base():
    conn = sqlite3.connect('app.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users")
    diet_advices = list(c.fetchall())
    print(diet_advices)

##os.makedirs('./files/min')



app = Flask(__name__)
MAX_FILE_SIZE = 1024 * 1024 + 1

def save_image(file, name):

    def work():
        foo = Image.open(file)
        foo.save('files/' + name + '.jpg', format="JPEG")

    def callback():
        print('Загрузка завершена')

    work()
    callback()


def save_image_rotation(file, name):
    foo = Image.open(file)
    foo.rotate(90).save('files/min/' + name + '.jpg', format="JPEG", quality=70)
    print('Обработка завершена')


@app.route("/", methods=["POST", "GET"])
def index():
    return render_template("index.html")

@app.route( "/save/<id>", methods=["POST", "GET"] )
def save(id):
    if request.method == "POST":
        file = request.files['file']
        save_image(file, id)
    return redirect('/')

@app.route('/edit')
def summary():
    d = {'hello': 'world'}
    return jsonify(d)

@app.route("/list")
def b_list():
    return render_template("list.html")

def read_files_box_tru():
    read = True
    for n in range(6):
        print(n)
        path = 'files/%(id)s.jpg,' % {'id': n + 1 }
        print(path)
        if os.path.exists(path):
            print(os.path.getsize(path))
        else:
            read = False
            print('Отсутсвует %(id)s файл' % {'id': n + 1})
    return read

@app.route("/add")
def add_l():
    if read_files_box_tru():
        print('Всё успешно загружено')
    else:
        print('Не все объекты есть')
    return render_template("list.html")

if __name__ == "__main__":
    app.run(debug=True)