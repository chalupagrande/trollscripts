function roll(){
  var parent = document.createElement('div')
  parent.setAttribute('class','player')
  parent.style.position = 'fixed'
  parent.style.zIndex = 5000;
  parent.style.right = 0;
  parent.style.top = 0

  var dragon = document.createElement('div')
  dragon.setAttribute('id','player')
  parent.appendChild(dragon)
  document.body.appendChild(parent)

  var tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  var player;
  function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
      height: "390",
      width: "640",
      videoId: "OwTH5sysquk",
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  }



  function onPlayerReady(event){
    console.log('ready')
    event.target.playVideo()
  }
  function onPlayerStateChange(event){
    console.log(event)
  }
}