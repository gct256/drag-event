export = DragEvent;

declare namespace DragEvent {
  export interface Coords {
    button: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
    beforeX: number;
    beforeY: number;
  }

  export type EventType =
    | 'mousedown'
    | 'mouseup'
    | 'click'
    | 'dblclick'
    | 'dragstart'
    | 'drag'
    | 'dragend';

  type DragEventListener = (
    event: MouseEvent,
    eventType: DragEvent.EventType,
    coords: DragEvent.Coords,
  ) => void;

  export function subscribe(
    element: HTMLElement | null,
    listener: DragEvent.DragEventListener,
    threshold?: number,
  ): void;
}
