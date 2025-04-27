import { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';

import { useEditor } from '../model/EditorContext';
import { useCollab } from '../model/CollabContext';
import { useSettings } from '../model/SettingsContext';
import { Cursor } from '../model/types';
import { useDebounce } from '@shared/hooks/useDebounce';
import { socket } from '@shared/config/socket';
import { useSearchParams } from 'react-router';

const DEBOUNCE_TIME = 250;

export const useCollabSync = () => {
  const [searchParams] = useSearchParams();

  const { editorValues, setEditorValue } = useEditor();
  const { settingsValues, setSettingsValue } = useSettings();
  const { collabValues, setCollabValue } = useCollab();

  const yDocRef = useRef(new Y.Doc());
  const yHtmlRef = useRef(yDocRef.current.getText('html'));
  const yCssRef = useRef(yDocRef.current.getText('css'));
  const yJsRef = useRef(yDocRef.current.getText('js'));

  const isApplyingRemoteUpdate = useRef(false);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const roomId = searchParams.get('roomId');
    if (roomId) {
      socket.emit('join-room', roomId);
    }
  }, []);

  useEffect(() => {
    const handleCreateRoom = (roomId: string) => {
      setCollabValue('isCreator', true);
      setCollabValue('roomId', roomId);
      setSettingsValue('collabMode', true);
      setIsSynced(true);
    };

    const handleJoinRoom = (roomId: string, buffer: ArrayBuffer) => {
      setSettingsValue('collabMode', true);
      setCollabValue('roomId', roomId);

      isApplyingRemoteUpdate.current = true;
      Y.applyUpdate(yDocRef.current, new Uint8Array(buffer));
      isApplyingRemoteUpdate.current = false;

      setIsSynced(true);
    };

    const handleUpdate = (update: ArrayBuffer) => {
      isApplyingRemoteUpdate.current = true;
      Y.applyUpdate(yDocRef.current, new Uint8Array(update));
      isApplyingRemoteUpdate.current = false;
    };

    const handleCursorMove = (cursors: Cursor[]) => {
      setCollabValue('cursors', cursors);
    };

    socket.on('create-room', handleCreateRoom);
    socket.on('join-room', handleJoinRoom);
    socket.on('update', handleUpdate);
    socket.on('cursor-move', handleCursorMove);

    return () => {
      socket.off('create-room', handleCreateRoom);
      socket.off('join-room', handleJoinRoom);
      socket.off('update', handleUpdate);
      socket.off('cursor-move', handleCursorMove);
    };
  }, []);

  useEffect(() => {
    if (!isSynced) return;

    const yhtml = yHtmlRef.current;
    const ycss = yCssRef.current;
    const yjs = yJsRef.current;

    const htmlObserver = () => {
      setEditorValue('html', yhtml.toString());
    };
    const cssObserver = () => {
      setEditorValue('css', ycss.toString());
    };
    const jsObserver = () => {
      setEditorValue('js', yjs.toString());
    };

    yhtml.observe(htmlObserver);
    ycss.observe(cssObserver);
    yjs.observe(jsObserver);

    return () => {
      yhtml.unobserve(htmlObserver);
      ycss.unobserve(cssObserver);
      yjs.unobserve(jsObserver);
    };
  }, [isSynced]);

  const handleUpdateDebounced = useDebounce(() => {
    if (!settingsValues.collabMode || isApplyingRemoteUpdate.current) return;

    const { html, css, js } = editorValues;

    const yhtml = yHtmlRef.current;
    const ycss = yCssRef.current;
    const yjs = yJsRef.current;

    let hasChanged = false;

    if (html !== yhtml.toString()) {
      yhtml.delete(0, yhtml.length);
      yhtml.insert(0, html);
      hasChanged = true;
    }

    if (css !== ycss.toString()) {
      ycss.delete(0, ycss.length);
      ycss.insert(0, css);
      hasChanged = true;
    }

    if (js !== yjs.toString()) {
      yjs.delete(0, yjs.length);
      yjs.insert(0, js);
      hasChanged = true;
    }

    if (hasChanged) {
      const update = Y.encodeStateAsUpdate(yDocRef.current);
      socket.emit('update', update);
    }
  }, DEBOUNCE_TIME);

  const handleCursorMoveDebounced = useDebounce(() => {
    if (!settingsValues.collabMode) return;
    socket.emit('cursor-move', collabValues.userCursor);
  }, DEBOUNCE_TIME);

  useEffect(handleUpdateDebounced, [
    editorValues.html,
    editorValues.css,
    editorValues.js,
  ]);

  useEffect(handleCursorMoveDebounced, [collabValues.userCursor]);

  return {
    yDoc: yDocRef.current,
    yHtml: yHtmlRef.current,
    cssHtml: yCssRef.current,
    js: yJsRef.current,
  };
};
