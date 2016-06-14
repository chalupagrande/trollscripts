(function(){
  var parent = document.createElement('div')
  parent.setAttribute('class','dragonball')
  parent.style.position = 'fixed'
  parent.style.zIndex = 9001;
  parent.style.top = 0

  var video = document.createElement('div')
  video.setAttribute('id','player')

  var kids = document.createElement('div')
  kids.setAttribute('class','gokus')
  kids.style.position = 'absolute'
  kids.style.top = 10


  parent.appendChild(kids)
  parent.appendChild(video)
  document.body.appendChild(parent)

  var tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  var player;
  var w = window.innerWidth;
  var h = window.innerHeight;
  function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
      height: h,
      width: w,

      videoId: "4OAm2LkrrLg",
      events: {
        'onReady': onPlayerReady
      },
      playerVars: {
        controls:0,
        start: 18,
        showinfo: 0,
        autoplay:1
      }
    })
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;


  function onPlayerReady(event){
    console.log('ready')
    addGokus()
  }

  var g1,g2,g3,g4,g5,g6,g7;
  var gokus;

  function addGokus(){
    g1 = document.createElement('img')
    g1.setAttribute('width','300')
    g1.style.transition = 'transform 2.5s linear'
    g2 = g1.cloneNode(false)
    g3 = g1.cloneNode(false)
    g4 = g1.cloneNode(false)
    g5 = g1.cloneNode(false)
    g6 = g1.cloneNode(false)


    g1.setAttribute('src','https://media.giphy.com/media/raiL1MZeFhsoU/giphy.gif')
    g2.setAttribute('src', 'https://media.giphy.com/media/1nbhuPKT92SeA/giphy.gif')
    g3.setAttribute('src', 'http://66.media.tumblr.com/tumblr_luw3ww7smF1qeh39oo1_500.gif')
    g4.setAttribute('src', 'http://home.insightbb.com/~pnacc/Anime%20Video%20Game%20Stuff/Animations/Dragonball%20Z/Goku%204.gif')

    kids.appendChild(g1)
    kids.appendChild(g2)
    kids.appendChild(g3)
    kids.appendChild(g4)
    gokus = [g1,g2,g3,g4]

    var animationId = requestAnimationFrame(draw)

  }
  var index = 0
  function draw(){
    setTimeout(function(){
      if(index == gokus.length) index = 0
      animateGoku(gokus[index])
      index+=1
      requestAnimationFrame(draw)
    }, 500)//10 frames/sec
  }

  function animateGoku(goku){
    var cords = newPosition()
    var rotation = Math.random()*360

    goku.style.transform = 'translate('+cords[0]+'px,'+cords[1]+'px) rotate('+rotation+'deg)'
  }

  function newPosition(){
    var x = Math.random()*w-300
    var y = Math.random()*h-300
    return [x,y]
  }
})()