'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ----------------------------
// GLOBALS
// ----------------------------
function formatNumber(num, limit, format) {
  var zeros = ['0', '00', '000', '0000', '00000', '000000', '0000000', '00000000', '000000000'];
  var index = 10 - num.toString().length - 1;
  var string = index > 0 ? zeros[index] + num.toString() : num.toString();
  return '(' + string.slice(0, 3) + ') ' + string.slice(3, 6) + ' - ' + string.slice(6, 10);
}

function confirm() {
  alert('congrats!!!');
}

function numberzeros(num) {
  var zeros = ['0', '00', '000'];
  var index = 4 - num.toString().length - 1;
  return index >= 0 ? zeros[index] + num.toString() : num.toString();
}

// SLIDER --------------------
function getSlider() {
  var num = document.querySelector("input[type='range']").value;
  document.querySelector('.number.slider').innerText = formatNumber(num);
}

// RANDOMIZE --------------------
function randomize() {
  document.querySelector('.number.randomize').innerText = formatNumber(Math.round(Math.random() * 9999999999));
}

// ADDER --------------------
var adderNumber = 0;
function add() {
  document.querySelector('.number.adder').innerText = formatNumber(adderNumber += 1);
}

// LISTENING -------------------------

var listening = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.onstart = function () {
  listening = true;
  document.querySelector('.number.listen').innerText = 'Listening...';
};
recognition.onresult = function (event) {
  if (event.results[0].isFinal) {
    document.querySelector('.number.listen').innerText = event.results[0][0].transcript;
  }
};
recognition.onerror = function (event) {
  console.log(event);
};
recognition.onend = function () {
  listening = !listening;
};
function listen() {
  var transcript = '';
  listening = !listening;
  if (listening) {
    recognition.start();
  } else {
    recognition.stop();
  }
}

var pullAnimations = [];
//SLOT MACHINE -------------
function pull() {
  var nums = document.querySelectorAll('.slot[type=text]');
  nums = Array.prototype.slice.call(nums);

  var _loop = function _loop(i) {
    pullAnimations.push([0, 0]);
    var update = function (index) {
      nums[index].value = Math.round(Math.random() * 9);
      pullAnimations[index][0] = setTimeout(function () {
        pullAnimations[index][1] = window.requestAnimationFrame(update);
        pullAnimations[index];
      }, Math.random() * 2000 + 200);
    }.bind(null, i);
    update();
  };

  for (var i = 0; i < nums.length; i++) {
    _loop(i);
  }
}

function slotListeners() {
  [].concat(_toConsumableArray(document.querySelectorAll('.slot[type=checkbox]'))).forEach(function (el, i) {
    el.addEventListener('change', function (e) {
      var index = e.target.getAttribute('is');
      if (e.target.checked) {
        window.clearTimeout(pullAnimations[index][0]);
        window.cancelAnimationFrame(pullAnimations[index][1]);
      } else {
        (function () {
          var update = function (index) {
            document.querySelector('.slot.digit-' + index).value = Math.round(Math.random() * 9);
            pullAnimations[index][0] = setTimeout(function () {
              pullAnimations[index][1] = window.requestAnimationFrame(update);
              pullAnimations[index];
            }, Math.random() * 2000 + 200);
          }.bind(null, index);
          update();
        })();
      }
    });
  });
}