import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from '@codemirror/view';

import { EditorField, Cursor } from '../model/types';
import { RangeSetBuilder } from '@uiw/react-codemirror';

class CursorWidget extends WidgetType {
  constructor(private cursor: Cursor) {
    super();
  }

  toDOM(): HTMLElement {
    const caret = document.createElement('span');
    caret.style.position = 'absolute';
    caret.style.zIndex = '100';
    caret.style.width = '2px';
    caret.style.height = '1.2em';
    caret.style.backgroundColor = this.cursor.color || 'red';
    caret.style.pointerEvents = 'none';

    const label = document.createElement('span');
    label.style.position = 'absolute';
    label.style.top = '-1.4em';
    label.style.zIndex = '100';
    label.style.paddingLeft = '2px';
    label.style.paddingRight = '2px';
    label.style.color = 'white';
    label.style.fontSize = '12px';
    label.style.backgroundColor = this.cursor.color || 'red';
    label.textContent = this.cursor.user;

    caret.appendChild(label);

    return caret;
  }

  ignoreEvent() {
    return true;
  }
}

export const createCursorPlugin = (cursors: Cursor[], field: EditorField) =>
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view);
        }
      }

      buildDecorations(view: EditorView) {
        const builder = new RangeSetBuilder<Decoration>();
        const decorations: {
          from: number;
          to: number;
          deco: Decoration;
        }[] = [];

        cursors.forEach((cursor) => {
          if (cursor.field !== field || !cursor.selection) return;

          const { anchor, head } = cursor.selection;

          if (anchor !== head) {
            const from = Math.min(anchor, head);
            const to = Math.max(anchor, head);

            decorations.push({
              from,
              to,
              deco: Decoration.mark({
                attributes: {
                  style: `background-color: ${cursor.color || 'red'};`,
                },
              }),
            });
          }

          decorations.push({
            from: head,
            to: head,
            deco: Decoration.widget({
              widget: new CursorWidget(cursor),
              side: 1,
            }),
          });
        });

        decorations.sort((a, b) => {
          if (a.from !== b.from) return a.from - b.from;

          return a.to - b.to;
        });

        decorations.forEach(({ from, to, deco }) =>
          builder.add(from, to, deco)
        );

        return builder.finish();
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
