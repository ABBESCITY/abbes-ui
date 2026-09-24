import type { ButtonHTMLAttributes } from 'react';

import type { ComponentSlot } from '../../types';
import type { ComponentColor, ComponentCusColor } from '../../types/registry';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ComponentColor | ComponentCusColor;
  cusColor?: string;
  shape?: 'square' | 'circle' | 'round';
  size?: 'large' | 'medium' | 'small';
  variant?: 'text' | 'tonal' | 'fill' | 'elevated' | 'outline';
  slots?: Partial<{ leftIcon: ComponentSlot; rightIcon: ComponentSlot }>;
}
