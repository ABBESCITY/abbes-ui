import { nested } from './utils.css';

import type { StyleRule } from '@vanilla-extract/css';

// === Flex ===
export interface FlexOptions {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  gap?: string;
  inline?: boolean;
}

export const flex = (options: FlexOptions = {}): StyleRule => {
  const { direction = 'row', justify, align, gap, inline = false } = options;

  return {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(gap && { gap }),
  };
};

// === Hover ===
export function hover(
  rules: Record<string, unknown>,
  options: {
    media?: boolean;
  } = {},
): StyleRule {
  const { media = true } = options;
  const selector = '&:hover:not(:active)';
  if (!media) {
    return nested({ [selector]: rules } as never);
  }

  return nested({
    '@media': {
      '(hover: hover)': {
        [selector]: rules,
      },
    },
  } as never);
}

// === Focus ===
export function focus(
  rules: Record<string, unknown>,
  options: {
    visible?: boolean;
    within?: boolean;
  } = {},
): StyleRule {
  const { visible = true, within = false } = options;

  const selector = within ? '&:focus-within' : visible ? '&:focus-visible' : '&:focus';

  return nested({ [selector]: rules } as never);
}

// === Press ===
export function press(
  rules: Record<string, unknown>,
  options: {
    active?: boolean;
    selector?: string;
  } = {},
): StyleRule {
  const { active = true, selector } = options;

  const pseudo = selector ?? (active ? '&:active' : '&:active');

  return nested({ [pseudo]: rules } as never);
}
