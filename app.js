var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
var upload = multer({ storage: storage });

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

app.get('/', function (req, res) {
    res.render('index', { name:req.params.id });
});

app.post('/upload', upload.single('avatar'), function (req, res, next) {
    console.log('res');
});





app.get('/test/:id', function (req, res) {
    res.render('index', { name:req.params.id });
});


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
