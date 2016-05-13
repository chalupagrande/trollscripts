(function(){
  [].forEach.call($$('*'), function(el, i){
    el.style.outline = "1px solid hsl(" + (i % 360)+", 50%, 50%)";
  })
})()

