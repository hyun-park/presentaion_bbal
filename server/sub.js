const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const util = require('./route/util');
const bodyParser = require('body-parser');
const request = require('request');
const session = require('express-session');

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


http.listen(8010,function() {
  util.log("서버 시작")
})


//-------------------web_naver-------------------
var path = require('path');
var ejs = require('ejs');
var key = require('./key.json');

var rows = [{title: "제목1", content:"내용1"},{title: "제목2", content:"내용2"}];
app.set('view engine', 'ejs');
app.set('views', 'views');

 app.get('/list', function(req, res) {
   res.render('web_list', {result : rows});

 });

app.all('*', function(req, res) {
  res.sendStatus(404)
})
