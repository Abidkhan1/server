var app   = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'asd',
    });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/fetchdata',function(req,res){
    var data = {
        "Data":""
    };
connection.query("SELECT * from login",function(err, rows, fields){
        if(rows.length != 0){
            data["Data"] = rows;
            res.json(data);
        }else{
            data["Data"] = 'No data Found..';
            res.json(data);
        }
    });
});
app.post('/login',function(req,res){
    var name = req.body.name;
    var pass = req.body.password;
    var data = {
        "Data":""
    };
    var ins = [{name:req.body.name, password :req.body.password}];
    var sql = "INSERT INTO login (name , password) values ?";
    connection.query('INSERT INTO login SET ?',ins,function(err, rows, fields){
        if(!err){
            data["Data"] = "Successfully inserted..";
            res.json(data);
        }else{
            data["Data"] = "incorrect.";
            res.json(data);
        }
    });
});
app.listen(2000);
