var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();

app.set('view engine', 'ejs');

function ReadDB(){
    
    let db = new sqlite3.Database('database.db');  
      
    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
        console.log(row.id + ': ' + row.info);
    });

    db.close();
}

app.get('/n/:id', function (req, res) {
    res.render('index', { name:req.params.id });
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
