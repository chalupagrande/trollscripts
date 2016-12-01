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

//CHECKBOX NIGHTMARE -------------

var numberPatterns = [["r1c2", "r1c3", "r2c1", "r2c4", "r3c1", "r3c4", "r4c1", "r4c4", "r5c1", "r5c4", "r6c1", "r6c4", "r7c2", "r7c3"], //0
["r1c3", "r2c2", "r2c3", "r3c3", "r4c3", "r5c3", "r6c3", "r7c3"], //1
["r1c2", "r1c3", "r2c1", "r2c4", "r3c4", "r4c3", "r5c2", "r6c1", "r7c1", "r7c2", "r7c3", "r7c4"], //2
["r1c2", "r1c3", "r2c1", "r2c4", "r3c4", "r4c2", "r4c3", "r5c4", "r6c1", "r6c4", "r7c2", "r7c3"], //3
["r1c4", "r2c3", "r2c4", "r3c2", "r3c4", "r4c1", "r4c4", "r5c1", "r5c2", "r5c3", "r5c4", "r6c4", "r7c4"], //4
["r1c1", "r1c2", "r1c3", "r1c4", "r2c1", "r3c1", "r4c1", "r4c2", "r4c3", "r5c4", "r6c1", "r6c4", "r7c2", "r7c3"], //5
["r1c2", "r1c3", "r2c1", "r2c4", "r3c1", "r4c1", "r4c2", "r4c3", "r5c1", "r5c4", "r6c1", "r6c4", "r7c2", "r7c3"], //6
["r1c1", "r1c2", "r1c3", "r1c4", "r2c1", "r2c4", "r3c4", "r4c3", "r5c3", "r6c2", "r7c2"], //7
["r1c2", "r1c3", "r2c1", "r2c4", "r3c1", "r3c4", "r4c2", "r4c3", "r5c1", "r5c4", "r6c1", "r6c4", "r7c2", "r7c3"], //8
["r1c2", "r1c3", "r2c1", "r2c4", "r3c1", "r3c4", "r4c2", "r4c3", "r4c4", "r5c4", "r6c1", "r6c4", "r7c2", "r7c3"] //9
];

function drawNumbers() {
  var numberGroups = [].concat(_toConsumableArray(document.querySelectorAll('.checkbox--number')));
  numberGroups.forEach(function (g, i) {
    var pattern = numberPatterns[i];
    var allInputs = [].concat(_toConsumableArray(g.querySelectorAll('input[type=checkbox]')));
    var patternIndex = 0;
    for (var k = 0; k < allInputs.length; k++) {
      if (pattern[patternIndex] == allInputs[k].getAttribute('name')) {
        allInputs[k].checked = true;
        patternIndex += 1;
      } else {
        allInputs[k].checked = false;
      }
    }
  });
  document.querySelector('.checkbox-nightmare .number').innerText = formatNumber(getNumber());
}
function getNumber() {
  var result = '';
  [].concat(_toConsumableArray(document.querySelectorAll('.checkbox--number'))).forEach(function (digit) {
    result += getCheckboxNumber(digit).toString();
  });
  return result;
}
function getCheckboxNumber(group) {
  for (var k = 0; k < numberPatterns.length; k++) {
    if (checkPattern(numberPatterns[k], group)) return k;
  }
  return '_';
}

function checkPattern(pattern, group) {
  var inputs = [].concat(_toConsumableArray(group.querySelectorAll('input[type=checkbox]')));
  for (var i = 0; i < inputs.length; i++) {
    var id = inputs[i].getAttribute('name');
    if (inputs[i].checked && pattern.indexOf(id) < 0) return false;
    if (!inputs[i].checked && pattern.indexOf(id) >= 0) return false;
  }
  return true;
}

function addCheckboxListeners() {
  var result = document.querySelector('.checkbox-nightmare .number');
  [].concat(_toConsumableArray(document.querySelectorAll('.checkbox-field input[type=checkbox]'))).map(function (el) {
    el.addEventListener('change', function (e) {
      result.innerText = formatNumber(getNumber());
    });
  });
}

//Pi -------------
var index = -1;
function forward() {
  var piAll = document.getElementById('pi-all');
  if (index < piAll.innerText.length) index += 1;
  var number = piAll.innerText.slice(index, index + 10);
  var span = '<span class="pi-selection">' + number + '</span>';
  piAll.innerHTML = piAll.innerText.replace(number, span);
}
function backward() {
  if (index > 0) index -= 1;
  var piAll = document.getElementById('pi-all');
  var number = piAll.innerText.slice(index, index + 10);
  var span = '<span class="pi-selection">' + number + '</span>';
  piAll.innerHTML = piAll.innerText.replace(number, span);
}