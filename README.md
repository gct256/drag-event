# drag-event

* Drag the event handling of the DOM Element.
* **Event handling only.** It does not include move, resize, etc.

## install

```
npm install drag-event
```

or

```
yarn add drag-event
```

## usage

```js
// ECMAScript

import { subscribe } from 'drag-event';

subscribe(document.getElementById('target'), (ev, type, coords) => {
  //
});
```

```typescript
// Typescript

import * as DragEvent from 'drag-event';

function listener(
  ev: MouseEvent,
  type: DragEvent.Type,
  coords: DragEvent.Coords,
): void {
  //
}

DragEvent.subscribe(document.getElementById('target'), listener);
```
