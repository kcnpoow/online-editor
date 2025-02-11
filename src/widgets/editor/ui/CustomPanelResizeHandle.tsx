import { PanelResizeHandle } from 'react-resizable-panels';
import cn from 'classnames';

type Props = {
  direction: 'vertical' | 'horizontal';
};

export const CustomPanelResizeHandle = ({ direction }: Props) => {
  return (
    <PanelResizeHandle
      className={cn(
        'bg-black transition-colors border-tertiary data-[resize-handle-active=pointer]:bg-white data-[resize-handle-active=pointer]:border-gray-300 max-md:hidden',
        {
          ['w-5 border-x-2']: direction === 'vertical',
          ['h-5 border-y-2']: direction === 'horizontal',
        }
      )}
    />
  );
};
