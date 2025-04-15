import { WidgetType } from '@codemirror/view';

export class CursorWidget extends WidgetType {
  constructor(private user: string, private color: string = 'red') {
    super();
  }

  toDOM(): HTMLElement {
    // Create a container for the cursor and the username
    const container = document.createElement('span');
    container.style.position = 'relative'; // To position the username next to the cursor

    // Create the cursor element
    const cursor = document.createElement('span');
    cursor.style.borderLeft = `2px solid ${this.color}`;
    cursor.style.marginLeft = '-1px';
    cursor.style.height = '1rem';
    cursor.style.position = 'relative'; // Instead of 'absolute'
    cursor.style.display = 'inline-block'; // Helps it behave more like normal text
    cursor.style.verticalAlign = 'text-bottom'; // Aligns it with the text baseline
    cursor.style.bottom = '0.5px';
    cursor.style.zIndex = '10';
    cursor.style.whiteSpace = 'nowrap';

    // Add the cursor to the container
    container.appendChild(cursor);

    // Create the username element (after the cursor)
    const username = document.createElement('span');
    username.textContent = this.user;
    username.style.position = 'absolute';
    username.style.zIndex = '100';
    username.style.top = '-15px';
    username.style.left = '-1px';
    username.style.fontSize = '0.8em';
    username.style.color = 'white';
    username.style.whiteSpace = 'nowrap'; // Prevent wrapping of the username
    username.style.backgroundColor = this.color;

    // Add the username to the container
    container.appendChild(username);

    // Optional tooltip with username
    container.title = this.user;

    return container;
  }
}
