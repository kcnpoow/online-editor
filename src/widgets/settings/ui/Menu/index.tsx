import cn from 'classnames';

import style from './style.module.css';
import { Tabs } from '../../model';

type Props = {
  currentTab: Tabs;
  setCurrentTab: (tab: Tabs) => void;
};

export const Menu = ({ currentTab, setCurrentTab }: Props) => {
  return (
    <nav className='flex py-4 md:block'>
      <div
        className={cn(style.menuItem, {
          [style.menuItemActive]: currentTab === 'behavior',
        })}
        onClick={() => setCurrentTab('behavior')}
      >
        Behavior
      </div>
      <div
        className={cn(style.menuItem, {
          [style.menuItemActive]: currentTab === 'privacy',
        })}
        onClick={() => setCurrentTab('privacy')}
      >
        Privacy
      </div>
    </nav>
  );
};
