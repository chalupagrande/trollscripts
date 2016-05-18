function roll(){
  var parent = document.createElement('div')
  parent.setAttribute('class','player')
  parent.style.position = 'fixed'
  parent.style.zIndex = 9001;
  parent.style.top = 0

  var video = document.createElement('div')
  video.setAttribute('id','player')

  var kids = document.createElement('div')
  kids.setAttribute('class','gokus')
  kids.style.position = 'absolute'


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
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      },
      playerVars: {
        controls:0,
        start: 18,
        showinfo: 0,
        // autoplay:1
      }
    })
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;



  function onPlayerReady(event){
    console.log('ready')
    // event.target.playVideo()
    addGokus()
  }
  function onPlayerStateChange(event){
    console.log(event)
  }

  var g1,g2,g3,g4,g5,g6,g7;
  var deg=0;

  function addGokus(){
    g1 = document.createElement('img')
    g1.setAttribute('width','300')
    g1.style.position = "absolute"
    g1.style.transition = 'transform 5s linear'

    g2 = g1.cloneNode(false)
    g3 = g1.cloneNode(false)
    g4 = g1.cloneNode(false)
    g5 = g1.cloneNode(false)
    g6 = g1.cloneNode(false)

    g1.setAttribute('src','https://media.giphy.com/media/raiL1MZeFhsoU/giphy.gif')

    g2.setAttribute('src','https://media.giphy.com/media/T1YF688zHcq6Q/giphy.gif')
    g3.setAttribute('src','http://rs1047.pbsrc.com/albums/b477/jujuboy614/DBZ%20Animations/goku3Danim.gif~c200')
    g4.setAttribute('src','http://www.oocities.org/vegetto797/GokuSuperKamehameha2.gif')


    kids.appendChild(g1)
    kids.appendChild(g2)
    kids.appendChild(g3)
    kids.appendChild(g4)

    var animationId = requestAnimationFrame(draw)

  }
  function draw(){
    deg+=360
    setTimeout(function(){
      animateGokus(deg)
      requestAnimationFrame(draw)
    }, 5000)
  }

  function animateGokus(deg){
    console.log(deg)
    g1.style.transform = 'rotate('+deg+'deg)'
    g2.style.transform = 'rotate('+deg+'deg)'
  }

}