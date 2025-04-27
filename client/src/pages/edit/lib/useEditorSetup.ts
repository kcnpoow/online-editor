import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { useEditor } from '../model/EditorContext';
import { useSettings } from '../model/SettingsContext';
import { draftApi } from '@entities/draft';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useAuth } from '@shared/hooks/useAuth';

export const useEditorSetup = () => {
  const [searchParams] = useSearchParams();

  const { editorValues, setEditorValue, handleExecute, handleSave } =
    useEditor();
  const { settingsValues } = useSettings();

  const { user } = useAuth();

  const handleExecuteDebounced = useDebounce(() => {
    if (settingsValues.autoUpdate) handleExecute();
  }, 1000);

  const handleSaveDebounced = useDebounce(() => {
    if (settingsValues.autoSave) handleSave();
  }, 3000);

  useEffect(() => {
    handleExecuteDebounced();
    handleSaveDebounced();
  }, [editorValues.html, editorValues.css, editorValues.js]);

  useEffect(() => {
    const loadDraft = async () => {
      const draftId = searchParams.get('draftId');
      const key = searchParams.get('key');

      if (!draftId) return;

      const result = await draftApi.getDraft(draftId, key);

      setEditorValue('projectName', result.projectName);
      setEditorValue('html', result.html);
      setEditorValue('css', result.css);
      setEditorValue('js', result.js);
      setEditorValue('privateFlag', result.privateFlag);

      if (user?.id === result.user.id) {
        setEditorValue('draftInfo', result);
      }
    };

    loadDraft();
  }, []);
};
