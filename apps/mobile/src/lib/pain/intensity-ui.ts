import type { PainIntensityId } from '@painlink/shared';

import BlueDrop from '@/assets/painlink-drop/blue-drop.svg';
import GreyDrop from '@/assets/painlink-drop/grey-drop.svg';
import OrangeDrop from '@/assets/painlink-drop/orange-drop.svg';
import RedDrop from '@/assets/painlink-drop/red-drop.svg';

export const PAIN_INTENSITY_UI: Record<
  PainIntensityId,
  {
    bg: string;
    DropIcon: React.ComponentType<{ width?: number; height?: number }>;
  }
> = {
  LIGHT: {
    bg: '#E9FBFB',
    DropIcon: BlueDrop,
  },
  MODERATE: {
    bg: '#F3F5F7',
    DropIcon: GreyDrop,
  },
  STRONG: {
    bg: '#FFF3E8',
    DropIcon: OrangeDrop,
  },
  VERY_STRONG: {
    bg: '#FFECEF',
    DropIcon: RedDrop,
  },
};
