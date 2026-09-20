import clsx from 'clsx';

import { useMemo } from 'react';
import { Button as BaseButton } from '@base-ui/react';

import styles from './Button.module.scss';
import '@abbes-ui/token/css/components/button';

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
  variant = 'solid',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClasses = useMemo(
    () => [styles[`Button_Variant_${variant}`], styles[`Button_Size_${size}`]],
    [size, color, variant],
  );

  return (
    <BaseButton
      className={clsx('AbbesButtonToken', styles.ButtonContainer, variantClasses, className)}
      disabled={disabled}
      {...props}
    >
      {renderSlot(slots?.leftIcon, { className: styles.Button_Slot_Left })}
      <span className={styles.ButtonLabel}>{children}</span>
      {renderSlot(slots?.rightIcon, { className: styles.Button_Slot_Right })}
    </BaseButton>
  );
}
