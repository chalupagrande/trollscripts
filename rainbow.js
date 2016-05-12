(function(){
  var body = document.body
  var i = 0
  var a = setInterval(function(){
    body.style['background-color'] = 'rgb('+(i+10)+', 255, 255)'
    i += 10
  },1000)
})