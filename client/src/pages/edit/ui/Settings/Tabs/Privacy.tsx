import { SettingsArticle } from './SettingsArticle';
import { useEditor } from '@pages/edit/model/EditorContext';
import { Clipper } from '@shared/ui/Clipper';
import { Switch } from '@shared/ui/Switch';

export const Privacy = () => {
  const { editorValues, setEditorValue, handleSave } = useEditor();

  const handlePrivateFlagChange = () => {
    const newPrivateFlag = !editorValues.privateFlag;
    setEditorValue('privateFlag', newPrivateFlag);
    handleSave({ privateFlag: newPrivateFlag });
  };

  return (
    <section>
      <SettingsArticle
        title='Privacy Mode'
        hint="When enabled, your activity remains private and won't be shared or logged. Disable it if you want full interaction tracking."
      >
        <Switch
          checked={editorValues.privateFlag}
          onChange={handlePrivateFlagChange}
        />

        {editorValues.privateFlag && editorValues.draftInfo?.key && (
          <Clipper className='mt-2'>{`localhost:5173/edit?key=${editorValues.draftInfo.key}&draftId=${editorValues.draftInfo.id}`}</Clipper>
        )}
      </SettingsArticle>
    </section>
  );
};
