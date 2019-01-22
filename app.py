import os
import sqlite3
from PIL import Image
from flask import Flask, request, render_template, redirect, jsonify

class User():
    folder = 1
    reload = False
    pics = {'1': 0, '2': 0, '3': 90, '4': 0, '5': 0, '6': 0}
    max_folder = 1;

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
        foo.save('static/edit/' + name + '.jpg', format="JPEG")

    def callback():
        print('Загрузка завершена')

    work()
    callback()


def save_image_rotation(path, name, angle):
    foo = Image.open(path)
    foo.rotate(angle).save(f"static/min/{User.folder}/{name}.jpg", format="JPEG", quality=70)
    print('Обработка завершена')


@app.route("/", methods=["POST", "GET"])
def index():
    print(User.folder);
    return render_template("index.html")

@app.route( "/save/<id>", methods=["POST", "GET"] )
def save(id):
    if request.method == "POST":
        file = request.files['file']
        save_image(file, id)
    return redirect('/')

@app.route( "/folder", methods=["POST", "GET"] )
def folder_i():
    if request.method == "POST":
        User.folder = request.form['folder']
    return redirect('/')

@app.route('/edit', methods=["POST", "GET"])
def summary():
    if request.method == "POST":
        User.pics['1'] = int(request.form['1'])
        User.pics['2'] = int(request.form['2'])
        User.pics['3'] = int(request.form['3'])
        User.pics['4'] = int(request.form['4'])
        User.pics['5'] = int(request.form['5'])
        User.pics['6'] = int(request.form['6'])
        print(User.pics)
    d = {'max_folder': User.max_folder }
    return jsonify(d)

@app.route("/list")
def b_list():
    return render_template("list.html")


def read_files_box_tru():
    read = True
    for n in range(6):
        path = "static/edit/%(id)s.jpg" % {"id": n + 1 }
        print(path)
        if os.path.exists(path):
            print('попал')
            print(os.path.getsize(path))
        else:
            read = False
            print('Отсутсвует %(id)s файл' % {'id': n + 1})
    return read



@app.route("/add")
def add_l():
    if read_files_box_tru():
        path = f"static/min/{User.folder}"
        if os.path.exists(path):
            print('Папка уже существует')
        else:
            os.makedirs(path)

        for n in range(6):
            save_image_rotation(f"static/edit/{n + 1}.jpg", f"{n + 1}", User.pics[f"{n + 1}"])
            os.remove(f"static/edit/{n + 1}.jpg")

        print('Всё успешно загружено')


    else:
        print('Не все объекты есть')

    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)