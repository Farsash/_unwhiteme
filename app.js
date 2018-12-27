const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const gm = require('gm').subClass({imageMagick: true});

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, 'hello.jpg');
    }
})
  
const upload = multer({ storage: storage }).single('avatar');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    res.render('index')
});

app.post('/', upload, function (req, res, next) {
    let h = 512;
    console.log('path', path.resolve(__dirname, './uploads/hello.jpg'));
    gm(path.resolve(__dirname, './uploads/hello.jpg'))
    .resize(h, h, '^')
    .gravity('Center')
    .extent(h, h)
    .noProfile()
    .write(path.resolve(__dirname, './uploads/min.jpg'), function (err) {
        if (!err) {
            console.log('ok');
            res.redirect('/');
        } else {
            console.log(err);
            res.redirect('/');
        }
    });
});


/*
app.post('/upload', upload.single('avatar'), function (req, res, next) {
    console.log('res');
});


app.get('/test/:id', function (req, res) {
    res.render('index', { name:req.params.id });
});
*/


function ReadDB(){
    
    let db = new sqlite3.Database('database.db');  
      
    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
        console.log(row.id + ': ' + row.info);
    });

    db.close();
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
