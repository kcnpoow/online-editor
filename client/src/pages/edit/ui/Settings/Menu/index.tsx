import { useSettings } from '@pages/edit/model/SettingsContext';
import { MenuItem } from './MenuItem';
import { SettingsTab } from '@pages/edit/model/types';
import { useCollab } from '@pages/edit/model/CollabContext';

type Props = {
  currentTab: SettingsTab;
  setCurrentTab: (tab: SettingsTab) => void;
};

export const Menu = ({ currentTab, setCurrentTab }: Props) => {
  const { settingsValues } = useSettings();
  const { collabValues } = useCollab();

  return (
    <nav className='py-4 max-md:mx-4  max-md:border-b-2 max-md:border-secondary'>
      <ul className='flex gap-x-4 md:block'>
        <MenuItem
          isActive={currentTab === SettingsTab.Behavior}
          onClick={() => setCurrentTab(SettingsTab.Behavior)}
        >
          Behavior
        </MenuItem>

        <MenuItem
          isActive={currentTab === SettingsTab.Privacy}
          onClick={() => setCurrentTab(SettingsTab.Privacy)}
        >
          Privacy
        </MenuItem>

        {!(settingsValues.collabMode && !collabValues.isCreator) && (
          <MenuItem
            isActive={currentTab === SettingsTab.Collab}
            onClick={() => setCurrentTab(SettingsTab.Collab)}
          >
            Collab
          </MenuItem>
        )}
      </ul>
    </nav>
  );
};
