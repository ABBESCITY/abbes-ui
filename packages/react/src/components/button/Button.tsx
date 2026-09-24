import clsx from 'clsx';

import { useMemo } from 'react';
import { Button as BaseButton } from '@base-ui/react';

import { CompTokenClass } from './Button.token.css';
import { ButtonContainer, ButtonLabel, Button_Slot } from './Button.style.css';

import type { ComponentProps } from 'react';
import type { ButtonProps } from './Button.props';
import type { ComponentSlot } from '../../types';

function renderSlot(slot: ComponentSlot | undefined, slotProps: ComponentProps<any>) {
  if (typeof slot === 'function') {
    return slot(slotProps);
  }
  return slot;
}

export function Button({
  slots,
  size = 'medium',
  color = 'primary',
  shape = 'square',
  variant = 'fill',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const componentClass = useMemo(() => ButtonContainer({ size, variant, shape }), [size, variant, ButtonContainer]);

  return (
    <BaseButton
      className={clsx(CompTokenClass, componentClass, className)}
      disabled={disabled}
      data-color={color}
      {...props}
    >
      {renderSlot(slots?.leftIcon, { className: Button_Slot })}
      <span className={ButtonLabel}>{children}</span>
      {renderSlot(slots?.rightIcon, { className: Button_Slot })}
    </BaseButton>
  );
}
