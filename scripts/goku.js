'use strict';

(function () {
  var parent = document.createElement('div');
  parent.setAttribute('class', 'dragonball');
  parent.style.position = 'fixed';
  parent.style.zIndex = 9001;
  parent.style.top = 0;
  parent.style.left = 0;

  var video = document.createElement('div');
  video.setAttribute('id', 'player');

  var kids = document.createElement('div');
  kids.setAttribute('class', 'gokus');
  kids.style.position = 'absolute';
  kids.style.top = 0;
  kids.style.left = 0;

  parent.appendChild(kids);
  parent.appendChild(video);
  document.body.appendChild(parent);

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  var w = window.innerWidth;
  var h = window.innerHeight;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: h,
      width: w,

      videoId: "4OAm2LkrrLg",
      events: {
        'onReady': onPlayerReady
      },
      playerVars: {
        controls: 0,
        start: 18,
        showinfo: 0,
        autoplay: 1
      }
    });
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  var gokus;
  var index = 0;

  function onPlayerReady(event) {
    var sources = ['https://media.giphy.com/media/raiL1MZeFhsoU/giphy.gif', 'https://media.giphy.com/media/1nbhuPKT92SeA/giphy.gif', 'http://66.media.tumblr.com/tumblr_luw3ww7smF1qeh39oo1_500.gif', 'http://home.insightbb.com/~pnacc/Anime%20Video%20Game%20Stuff/Animations/Dragonball%20Z/Goku%204.gif'];
    gokus = makeGokus(sources);

    var animationId = requestAnimationFrame(draw);
  }

  function draw() {
    setTimeout(function () {
      if (index == gokus.length) index = 0;
      animateGoku(gokus[index]);
      index += 1;
      requestAnimationFrame(draw);
    }, 500); //10 frames/sec
  }

  function animateGoku(goku) {
    var cords = newPosition();
    var rotation = Math.random() * 360;

    goku.style.transform = 'translate(' + cords[0] + 'px,' + cords[1] + 'px) rotate(' + rotation + 'deg)';
  }

  function newPosition() {
    var x = Math.random() * w - 300;
    var y = Math.random() * h;
    return [x, y];
  }

  function makeGokus(sources) {
    var result = [];
    for (var i = 0; i < sources.length; i++) {
      temp = document.createElement('img');
      temp.setAttribute('width', '300');
      temp.style['position'] = 'absolute';
      temp.style['top'] = -300;
      temp.style['left'] = -300;
      temp.setAttribute('src', sources[i]);
      temp.style.transition = 'transform 2.5s linear';
      kids.appendChild(temp);
      result.push(temp);
    }
    return result;
  }
})();