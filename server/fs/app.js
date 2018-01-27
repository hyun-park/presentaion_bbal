var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var multer = require('multer');
var upload = multer({ dest: 'data/' })

//페이지 라우팅
app.get('/upload', function(req, res) {
    fs.readFile('upload.html', function(error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    });
});

app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded! : '+req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

app.use('/users', express.static('uploads'));

//웹서버 생성
var server = http.createServer(app).listen(8010, function(){
    console.log('Server Running . ')
});

var multer = require('multer'); // multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  }
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })
