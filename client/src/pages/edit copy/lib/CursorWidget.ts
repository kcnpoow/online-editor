import { WidgetType } from '@codemirror/view';

export class CursorWidget extends WidgetType {
  constructor(private user: string, private color: string = 'red') {
    super();
  }

  toDOM(): HTMLElement {
    const cursor = document.createElement('span');
    cursor.style.borderLeft = `2px solid ${this.color}`;
    cursor.style.marginLeft = '-1px';
    cursor.style.height = '1em';
    cursor.style.position = 'absolute';
    cursor.style.zIndex = '10';
    cursor.textContent = this.user;

    // Optional tooltip with username
    cursor.title = this.user;

    return cursor;
  }
}
