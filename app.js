const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const gm = require('gm').subClass({imageMagick: true});

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
})



const upload = multer({ storage: storage });

const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', function(req, res) {
    let img = ReadFiles('/assets/uploads/hello.JPG');
    let data_cube = SearchFrameCube();
    console.log('dsf', data_cube);
    res.render('edit', { img: 'assets/uploads/hello.JPG'});
});


app.get('/inf', function(req, res) {
    JsonInfoPack();
    return res.json({ "key" : "hello" });
});

function JsonInfoPack(){

    let json = {};

    json.ignore_img = SearchFrameCube();

    console.log(json);

}

function SearchFrameCube(){

    let ignore_frame = [];

    for (let i = 1; i < 7; i++) {

        let path = 'public/uploads/' + i + '.jpg';

        fs.readFile(path, function(err, data){

            if(err){
                ignore_frame.push(i);
            }
            
        });

    }

    console.log(ignore_frame);

    return ignore_frame;

}


function ReadFiles( path ){
        fs.readFile(path, function(err, data){
            if(err){
                //console.error(err);
                return false;
            }else{
                return true;
            }
        });
}
  

let arr_imgload = [{name: 'avatar', maxCount: 1}, {name: 'image', maxCount: 1}];

app.post('/', upload.fields(arr_imgload), function (req, res, next) {

   
    /*
    let h = 512;

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
    */

   res.redirect('/');
   next();
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
