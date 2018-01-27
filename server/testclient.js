const io = require('socket.io-client')

var socket = io('http://localhost:8008')

var isconnect = false

var msg = "자신의 기준에 자신은 구태여 맞춰볼 생각조차 하지 않는다 예를 들어 공중 도덕을 중요하게 여기는 사람이 자신이 무단으로 버리는 쓰레기에 대해서 무감각한 것처럼 자신의 기준을 바꿀 생각을 갖지 않는다 기준을 바꾸려면 새로운 것을 알아야 하고 이해해야 하며 참 거짓을 따져야 한다 그런 일괄의 행위를 싫어한다 간추려서 나열해보니 매우 단순한 문제인 듯 하다 그러면서 자신에게 해당되는 것을 당장에 찾을 수는 없지만 사회적인 이슈들을 보면 이러한 문제들이 방방곡곡에서 일어나고 있다 단순히 이 글의 서두만 읽는다면 당신은 그저 이 글로 하여금 타인의 흠집에 대한 적개심만 얻어가리라 이 글에서 지적하려는 것은 주변에 보이는 잘못된 타인이 아닌 바로 그 과정은 감정이 개입해서 이성을 흔들어놓을 수도 있고 때로는 복잡해서 멈추고 머리를 쉬어주고 싶은 때도 있을 것이다"

var r = msg.split(' ')
var s = ""

var p = r.length
var n = 0

socket.on('connect',function() {
  console.log('connect')
  isconnect = true
  socket.emit('WebConnect',"zkxns38@naver.com")
  socket.emit('WebJoin',[1,"zkxns38@naver.com"])
})

socket.on('disconnect', function() {
  console.log('disconnect')
  isconnect = false
})

// setInterval(function() {
//   if(isconnect && n < p) {
//     if(n % 5 == 0) s = ""
//     s += r[n]
//     socket.emit('zkxns38@naver.com',s)
//     n++
//   }
// },1000)
