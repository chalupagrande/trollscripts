function roll(){
  var parent = document.createElement('div')
  parent.setAttribute('class','player')
  parent.style.position = 'fixed'
  parent.style.zIndex = 5000;
  parent.style.right = 0;
  parent.style.top = 0

  var dragon = document.createElement('div')
  dragon.setAttribute('id','player')
  document.body.appendChild(parent)

  var tag = document.createElement('scrip t')
  tag.src = "https://www.youtube.com/iframe_api"
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  var player;
  function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
      height: window.innerHeight,
      width: window.innerWidth,
      videoId: "4OAm2LkrrLg",
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  }

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady



  function onPlayerReady(event){
    console.log('ready')
    event.target.playVideo()
  }
  function onPlayerStateChange(event){
    console.log(event)
  }
}

function addGoku(parent){
  var g1 = document.createElement('img')
  g1.setAttribute('src','https://media.giphy.com/media/raiL1MZeFhsoU/giphy.gif')
  g1.style.position = 'absolute'
  g1.style.zIndex = 5001
  parent.appendChild(g1)

}