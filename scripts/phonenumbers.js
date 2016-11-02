// ----------------------------
// GLOBALS
// ----------------------------
function setup(){
  if(!webkitSpeechRecognition){
    document.querySelector('.speech-recognition').style.display = 'none'
  }
}
setup()


function formatNumber(num, limit, format){
  var zeros = ['0','00','000','0000','00000','000000','0000000','00000000', '000000000']
  var index = 10 - num.toString().length - 1
  var string = index > 0 ? zeros[index] + num.toString() : num.toString()
  return '(' + string.slice(0,3) + ') ' + string.slice(3,6) + ' - ' + string.slice(6,10)
}

function confirm(){
  alert('congrats!!!')
}

function numberzeros(num){
  var zeros = ['0','00','000']
  var index = 4 - num.toString().length - 1
  return index >= 0 ? zeros[index] + num.toString() : num.toString()
}


// SLIDER --------------------
function getSlider(){
  var num = document.querySelector("input[type='range']").value
  document.querySelector('.number.slider').innerText = formatNumber(num)
}
getSlider()

// RANDOMIZE --------------------
function randomize(){
  document.querySelector('.number.randomize').innerText = formatNumber(Math.round(Math.random()*9999999999))
}
randomize()


// ADDER --------------------
var adderNumber = 0
function add(){
  document.querySelector('.number.adder').innerText = formatNumber(adderNumber +=1)
}



// LISTENING -------------------------

var listening = false
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.onstart = function() {
    listening = true
    document.querySelector('.number.listen').innerText = 'Listening...'
}
recognition.onresult = function(event) {
  if(event.results[0].isFinal){
    document.querySelector('.number.listen').innerText = event.results[0][0].transcript
  }
}
recognition.onerror = function(event) { console.log(event)  }
recognition.onend = function() { listening = !listening }
function listen(){
  var transcript = ''
  listening = !listening
  if(listening){
    recognition.start()
  } else {
    recognition.stop()
  }
}

//SLOT MACHINE -------------
function pull(){
  var nums = document.querySelectorAll('.slot')
  nums = Array.prototype.slice.call(nums)
  var animations = []
  for(var i = 0; i  < nums.length; i++){
    var update = (function(index){
      nums[index].value = Math.round(Math.random() * 9)
      animations[index] = window.requestAnimationFrame(update)
    }).bind(null, i)
    update()
  }
}