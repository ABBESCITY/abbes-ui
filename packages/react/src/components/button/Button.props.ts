import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'medium' | 'small' | 'full';
  variant?: 'text' | 'plain' | 'solid' | 'soft' | 'outline';
  slots?: Partial<{ leftIcon: ReactNode; rightIcon: ReactNode }>;
  loading?: boolean;
}
