exports.nowtime = nowtime;
exports.setLogStream = setLogStream;
exports.log = log;

var accessLogStream;

function setLogStream(Stream) {
	accessLogStream = Stream;
}

function nowtime(){
  now = new Date();
  year = now.getFullYear();
  month= now.getMonth() + 1;
  if(month < 10){
    month = '0' + month;
  }
  date = now.getDate();
  if(date<10){
    date = '0' + date;
  }
  hour = now.getHours();
  if(hour<10){
    hour = '0' + hour;
  }
  min = now.getMinutes();
  if(min<10){
    min = '0' + min;
  }
  sec = now.getSeconds();
  if(sec<10){
    sec = '0' + sec;
  }

  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function nowdate() {
	now = new Date();
	year = now.getFullYear();
	month= now.getMonth() + 1;
	if(month < 10){
		month = '0' + month;
	}
	date = now.getDate();
	if(date<10){
		date = '0' + date;
	}
	return year+'-'+month+'-'+date;
}

function log(msg) {
	//accessLogStream.write(nowtime() + ' - ' + msg+'\n');
	console.log(nowtime() + ' - ' + msg);
}
