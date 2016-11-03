"use strict";

function rainbow() {
  var elements = Array.prototype.slice.call(document.querySelectorAll('*'));
  Array.prototype.forEach.call(elements, function (el, i) {
    el.style.outline = "1px solid hsl(" + i % 360 + ", 50%, 50%)";
  });

  var stats = document.createElement('div');
  document.body.appendChild(stats);
  stats.setAttribute('class', 'stats');
  stats.style.position = 'fixed';
  stats.style.bottom = 0;
  stats.style.right = 0;
  stats.style['min-width'] = '100px';
  stats.style['min-height'] = '32px';
  stats.style['background-color'] = '#666';
  stats.style.color = '#fff';
  stats.style.padding = '16px';
  stats.style.display = 'flex';
  stats.style['flex-flow'] = 'column nowrap';

  var node = document.createElement('div');
  node.setAttribute('class', 'node');
  node.innerText = "hover on an element to get box sizing.";

  var sizing = document.createElement('div');
  sizing.innerText = "size will appear here.";

  stats.appendChild(node);
  stats.appendChild(sizing);

  elements.forEach(function (el) {
    el.addEventListener('mouseover', function (event) {
      event.stopPropagation();
      console.log(this);
      var box = this.getBoundingClientRect();
      node.innerText = this.nodeName + ": " + this.className;
      sizing.innerHTML = "h: " + box.height + "&nbsp;&nbsp;&nbsp;" + "w: " + box.width;
    });
  });
}