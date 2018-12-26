const express = require('express');
const app = express();
    app.set('view engine', 'ejs');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, 'hello' + path.extname(file.originalname));
    }
})
  
const upload = multer({ storage: storage });

const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use('/assets', express.static('public'));

app.get('/', function (req, res) {
    res.render('index', { name:req.params.id });
});

app.get('/3D', function (req, res) {
    res.render('view');
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
