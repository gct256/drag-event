let dragTarget = null;
let installed = false;

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
  window.addEventListener(
    'mousemove',
    (ev) => {
      if (dragTarget === null) return;
      updateCoord(ev);
      if (dragTarget.drag) {
        call(ev, 'drag');
      } else {
        const dx = dragTarget.coords.startX - dragTarget.coords.x;
        const dy = dragTarget.coords.startY - dragTarget.coords.y;
        if (dx * dx + dy * dy >= dragTarget.threshold) {
          dragTarget.drag = true;
          call(ev, 'dragstart');
        }
      }
    },
    false,
  );

  window.addEventListener(
    'mouseup',
    (ev) => {
      if (dragTarget === null) return;
      if (dragTarget.drag) {
        call(ev, 'dragend');
      } else {
        call(ev, 'click');
      }
      call(ev, 'mouseup');
      dragTarget = null;
    },
    false,
  );
}

export function subscribe(element, listener, threshold = 5) {
  installWindowEvent();
  element.addEventListener(
    'mousedown',
    (ev) => {
      const x = ev.screenX;
      const y = ev.screenY;
      dragTarget = {
        listener,
        threshold: threshold * threshold,
        drag: false,
        coords: {
          button: ev.button,
          x,
          y,
          startX: x,
          startY: y,
          beforeX: x,
          beforeY: y,
        },
      };
      call(ev, 'mousedown');
    },
    false,
  );
  element.addEventListener('dblclick', (ev) => {
    const x = ev.screenX;
    const y = ev.screenY;
    listener(ev, 'dblclick', {
      x,
      y,
      startX: x,
      startY: y,
      beforeX: x,
      beforeY: y,
    });
  });
}
