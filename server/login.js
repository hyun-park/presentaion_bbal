var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var NaverStrategy = require('passport-naver').Strategy;
var app = express();

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  // key: 'sid',
  secret: 'sdafdsav',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: 'unithon',
    database: 'unithon',
    checkExpirationInterval: 60 * 1000 //1분
  }),
  cookie: { maxAge: 60 * 1000}  //1분
}));

var mysql = require('mysql');
var db = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'unithon',
  database        : 'unithon'
});

// 안드로이드 네이버 토큰받기
app.post('/member', function (req, res) {
  console.log('access');
  var token = req.body.token;
  var header = "Bearer " + token; // Bearer 다음에 공백 추가. 고정

  var api_url = 'https://openapi.naver.com/v1/nid/me';
  var request = require('request');
  var options = {
       url: api_url,
       headers: {'Authorization': header}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       var email = response.email;
           name = response.name;
       consloe.log(email + " : " + name + "등록");
       var sql = 'INSERT INTO users (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?, email = ?;';
       db.query(sql, [email, name, email, name], function(err, rows, fields) {
         if (err) return res.status(400).send(''+err);
         else {
           console.log('성공');
           return res.sendstatus(200);
         }
       });
     } else {
       console.log('error');
       if(response != null) {
         res.status(response.statusCode).end();
         console.log('error = ' + response.statusCode);
       }
     }
   });
 });

//host,port
app.listen(8010, function(){
  console.log('Sever On!');
});
