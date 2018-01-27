const app = require('express')()
const http = require('http').Server(app)
const util = require('./route/util')
const io = require('socket.io')(http)

http.listen(8008)

//스크립트 저장
var scriptA = [] //전체 스크립트
var scriptS = [] //배열 스크립트
var Bmsg = [] //단어 단위 이전 스크립트

var Bpos = 0 //단어 단위 이전 포지션

var Apos = 0 //전체 스크립트 중간 판별 포지션
var Spos = 0 //배열 스크립트 중간 판별 포지션
var nSpos = 0 //최종 판별 포지션

//상수값들
const spl = 10 //배열 스크립트 나눌 단위
const verify = 0.7 //스크립트 판별 일치율


var email = "zkxns38@naver.com"
var msg = "자신의 기준에 자신은 구태여 맞춰볼 생각조차 하지 않는다. 예를 들어 공중 도덕을 중요하게 여기는 사람이 자신이 무단으로 버리는 쓰레기에 대해서 무감각한 것처럼. 자신의 기준을 바꿀 생각을 갖지 않는다. 기준을 바꾸려면 새로운 것을 알아야 하고 이해해야 하며 참 거짓을 따져야 한다. 그런 일괄의 행위를 싫어한다. 간추려서 나열해보니 매우 단순한 문제인 듯 하다. 그러면서 자신에게 해당되는 것을 당장에 찾을 수는 없지만, 사회적인 이슈들을 보면 이러한 문제들이 방방곡곡에서 일어나고 있다. 단순히 이 글의 서두만 읽는다면 당신은 그저 이 글로 하여금 타인의 흠집에 대한 적개심만 얻어가리라. 이 글에서 지적하려는 것은 주변에 보이는 잘못된 타인이 아닌 바로 그 과정은 감정이 개입해서 이성을 흔들어놓을 수도 있고, 때로는 복잡해서 멈추고 머리를 쉬어주고 싶은 때도 있을 것이다."


function scriptSort(s,callback) {
  r = s.replace(/(?:\r\n|\r|\n| |\.|,|)/g,'')
  list = r.split('')
  console.log(list)
  callback(list)
}

function MakeScript() {
  scriptSort(msg,function(sc) {
    var p = 0
    scriptS[0] = []
    for(i = 0 ; i < sc.length; i++) {
      sp = i % spl
      if(i != 0 && sp == 0) {
        p++
        scriptS[p] = []
      }
      //scriptA[i] = []
      //scriptS[p][sp] = []

      scriptA[i] = scriptS[p][sp] = sc[i]
      //scriptA[i][1] = scriptS[p][sp][1] = 0
    }
  })
}

function analogyP(msg,callback) {
  Bscript = [] //문자열 단위
  Bsl = 0

  Bmsg[Bpos] = msg
  if(Bpos == 0) {

  } else {
    Bsplit = Bmsg[Bpos-1].split(' ')
    msgSplit = msg.split(' ')
    check = false
    for(i = 0 ; i < msgSplit.length ; i++) {
      if(!check && msgSplit[i] != Bsplit[i]) {
        check = true
        Bscript = Bscript.concat(msgSplit[i].split(''))
      } else if(check) {
        Bscript = Bscript.concat(msgSplit[i].split(''))
      }
    }
  }
  CompareAS(Bscript,function(pos) {
    callback(pos)
  })
  Bpos++
  //CompareSS()
}
//
// function CompareAS(script) {
//   turelist = new Array()
//   tcount = 0
//   lastT = 0
//   for(i = 0; i < script.length; i++) {
//     turelist[i] = (scriptA[i+Apos][1] != 1 && scriptA[i][0] == script[i])
//     if(turelist[i]) {
//       lastT = i
//       tcount++
//     }
//   }
//   if(tcount/script.length >= verify) Apos = lastT //보완 필요
//   console.log("Apos : ",Apos)
// }

function CompareAS(script,callback) {
  if(script.length > 0) {
    console.log(script)
    confirm = 0;
    lastT = 0
    for(i = 0 ; i < scriptA.length ; i++) {
      if(script[0] == scriptA[i]) {
        count = 0
        k = 0
        lastp = 0
        for(j = i; j < i + script.length ; j++) {
          if(script[k] == scriptA[j]) {
            count++
            lastp = j
          }
          if(count/script.length > confirm && count > 1) {
            confirm = count/script.length
            lastT = lastp
          }
          k++
        }
      }
      if(i == scriptA.length - 1) {
        callback(lastT)
      }
    }
  }
}

function CompareSS(script) {

}

MakeScript()

io.on('connection',function(socket) {
  util.log(socket.id)

  socket.on(email,function(msg) {
    analogyP(msg,function(result) {
      console.log("result",result)
    })
  })
})
