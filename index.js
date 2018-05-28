'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dragTarget = null;
var installed = false;

function updateCoord(ev) {
  dragTarget.coords.beforeX = dragTarget.coords.x;
  dragTarget.coords.beforeY = dragTarget.coords.y;
  dragTarget.coords.x = ev.screenX;
  dragTarget.coords.y = ev.screenY;
}

function call(ev, type) {
  dragTarget.listener(ev, type, dragTarget.coords);
}

function installWindowEvent() {
  if (installed) return;

  installed = true;
  window.addEventListener('mousemove', function (ev) {
    if (dragTarget === null) return;
    updateCoord(ev);
    if (dragTarget.drag) {
      call(ev, 'drag');
    } else {
      var dx = dragTarget.coords.startX - dragTarget.coords.x;
      var dy = dragTarget.coords.startY - dragTarget.coords.y;
      if (dx * dx + dy * dy >= dragTarget.threshold) {
        dragTarget.drag = true;
        call(ev, 'dragstart');
      }
    }
  }, false);

  window.addEventListener('mouseup', function (ev) {
    if (dragTarget === null) return;
    if (dragTarget.drag) {
      call(ev, 'dragend');
    } else {
      call(ev, 'click');
    }
    call(ev, 'mouseup');
    dragTarget = null;
  }, false);
}

function subscribe(element, listener) {
  var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

  installWindowEvent();
  element.addEventListener('mousedown', function (ev) {
    var x = ev.screenX;
    var y = ev.screenY;
    dragTarget = {
      listener: listener,
      threshold: threshold * threshold,
      drag: false,
      coords: {
        button: ev.button,
        x: x,
        y: y,
        startX: x,
        startY: y,
        beforeX: x,
        beforeY: y
      }
    };
    call(ev, 'mousedown');
  }, false);
  element.addEventListener('dblclick', function (ev) {
    var x = ev.screenX;
    var y = ev.screenY;
    listener(ev, 'dblclick', {
      x: x,
      y: y,
      startX: x,
      startY: y,
      beforeX: x,
      beforeY: y
    });
  });
}

exports.subscribe = subscribe;
