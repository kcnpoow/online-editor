import { SettingsTabs } from '@pages/edit/model';
import { MenuItem } from './MenuItem';

type Props = {
  currentTab: SettingsTabs;
  setCurrentTab: (tab: SettingsTabs) => void;
};

export const Menu = ({ currentTab, setCurrentTab }: Props) => {
  return (
    <nav className='py-4 max-md:mx-4  max-md:border-b-2 max-md:border-secondary'>
      <ul className='flex gap-x-4 md:block'>
        <MenuItem
          isActive={currentTab === 'behavior'}
          onClick={() => setCurrentTab('behavior')}
        >
          Behavior
        </MenuItem>

        <MenuItem
          isActive={currentTab === 'privacy'}
          onClick={() => setCurrentTab('privacy')}
        >
          Privacy
        </MenuItem>
      </ul>
    </nav>
  );
};
