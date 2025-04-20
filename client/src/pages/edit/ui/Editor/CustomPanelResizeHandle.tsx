import {
  PanelResizeHandle,
  PanelResizeHandleProps,
} from 'react-resizable-panels';
import cn from 'classnames';

type Props = {
  direction: 'vertical' | 'horizontal';
} & PanelResizeHandleProps;

export const CustomPanelResizeHandle = ({ direction, ...props }: Props) => {
  return (
    <PanelResizeHandle
      className={cn(
        'bg-black transition-colors border-tertiary data-[resize-handle-active=pointer]:bg-white data-[resize-handle-active=pointer]:border-gray-300 max-md:hidden',
        {
          ['w-4 border-x-1']: direction === 'vertical',
          ['h-4 border-y-1']: direction === 'horizontal',
        }
      )}
      {...props}
    />
  );
};
