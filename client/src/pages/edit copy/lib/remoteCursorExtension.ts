import {
  ViewPlugin,
  Decoration,
  DecorationSet,
  EditorView,
  ViewUpdate,
} from '@codemirror/view';
import { RangeSetBuilder } from '@codemirror/state';
import { CursorWidget } from './CursorWidget';

import { Cursor } from '../model/types';

export function remoteCursorExtension(initialCursors: Cursor[]) {
  return ViewPlugin.fromClass(
    class {
      cursors: Cursor[];
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.cursors = initialCursors;
        this.decorations = this.buildDecorations(view, this.cursors);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view, this.cursors);
        }
      }

      buildDecorations(view: EditorView, cursors: Cursor[]) {
        const builder = new RangeSetBuilder<Decoration>();
        const docLength = view.state.doc.length;

        cursors.forEach((cursor) => {
          let pos = Math.max(0, Math.min(cursor.selection.head, docLength));

          builder.add(
            pos,
            pos,
            Decoration.widget({
              widget: new CursorWidget(cursor.user, cursor.color || 'red'),
              side: 1,
            })
          );
        });

        return builder.finish();
      }

      updateCursors(newCursors: Cursor[]) {
        this.cursors = newCursors;
      }
    },
    {
      decorations: (v) => v.decorations,
      eventHandlers: {},
      provide: (plugin) => plugin,
    }
  );
}
