import { Button as BaseButton } from '@base-ui/react';

import styles from './Button.module.scss';

import type { ButtonProps } from './Button.props';

function cx(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function Button({
  children,
  className,
  disabled,
  loading,
  size = 'medium',
  slots,
  type = 'button',
  variant = 'solid',
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cx(
        styles.button,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
        loading && styles.loading,
        className,
      )}
      data-loading={loading ? '' : undefined}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : slots?.leftIcon}
      <span className={styles.label}>{children}</span>
      {slots?.rightIcon}
    </BaseButton>
  );
}
