import type { ButtonHTMLAttributes } from 'react';
import type { ComponentSlot } from '../../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small' | 'full';
  variant?: 'text' | 'plain' | 'solid' | 'soft' | 'outline';
  slots?: Partial<{ leftIcon: ComponentSlot; rightIcon: ComponentSlot }>;
}
