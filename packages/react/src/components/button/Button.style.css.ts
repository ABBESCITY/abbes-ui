import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { nested } from '../../styles/utils.css';
import { flex, hover, focus, press } from '../../styles/mixin.css';

import { CompTokenVars } from './Button.token.css';
import { ColorTokenVars, TokenVars } from '../../theme/token/index.css';

export const ButtonLabel = style(
  {
    color: CompTokenVars.content.textColor,
    fontSize: CompTokenVars.content.fontSize,
  },
  'ButtonLabel',
);

export const Button_Slot = style(
  {
    color: CompTokenVars.content.iconColor,
    fontSize: CompTokenVars.content.fontSize,
  },
  'ButtonSlot',
);

export const ButtonContainer = recipe({
  base: [
    flex({ justify: 'center', align: 'center', gap: '8px', inline: true }),
    {
      position: 'relative',
      cursor: 'pointer',
      font: 'inherit',
      lineHeight: 1,
      outline: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      border: `1px solid ${CompTokenVars.container.borderColor}`,
      borderRadius: CompTokenVars.container.radius,
      backgroundColor: CompTokenVars.container.backgroundColor,
      paddingInline: CompTokenVars.container.paddingX,
      paddingBlock: CompTokenVars.container.paddingY,
    },
    nested({
      '&::after': {
        content: '',
        inset: 0,
        position: 'absolute',
        opacity: CompTokenVars.layer.opacity,
        backgroundColor: CompTokenVars.layer.backgroundColor,
      },
    }),
    // State
    press({
      vars: {
        [CompTokenVars.layer.opacity]: TokenVars.state.pressed,
        [CompTokenVars.layer.backgroundColor]: CompTokenVars.content.textColor,
      },
      transform: '',
    }),
    focus({
      vars: {
        [CompTokenVars.layer.opacity]: TokenVars.state.focused,
        [CompTokenVars.layer.backgroundColor]: CompTokenVars.content.textColor,
      },
    }),
    hover({
      vars: {
        [CompTokenVars.layer.opacity]: TokenVars.state.hovered,
        [CompTokenVars.layer.backgroundColor]: CompTokenVars.content.textColor,
      },
    }),
  ],
  variants: {
    size: {
      small: {
        vars: {
          [CompTokenVars.content.fontSize]: '14px',
          [CompTokenVars.container.paddingX]: '6px',
          [CompTokenVars.container.paddingY]: '3px',
        },
      },
      medium: {
        vars: {
          [CompTokenVars.content.fontSize]: '16px',
          [CompTokenVars.container.paddingX]: '10px',
          [CompTokenVars.container.paddingY]: '6px',
        },
      },
      large: {
        vars: {
          [CompTokenVars.content.fontSize]: '18px',
          [CompTokenVars.container.paddingX]: '12px',
          [CompTokenVars.container.paddingY]: '8px',
        },
      },
    },
    shape: {
      square: {
        vars: { [CompTokenVars.container.radius]: '5px' },
      },
      round: {
        vars: { [CompTokenVars.container.radius]: '999px' },
      },
      circle: {
        vars: { [CompTokenVars.container.radius]: '50%' },
        minWidth: 36,
        padding: 0,
        aspectRatio: '1 / 1',
        overflow: 'hidden',
      },
    },
    variant: {
      vars: {
        [CompTokenVars.layer.backgroundColor]: CompTokenVars.content.textColor,
      },
      fill: {
        vars: {
          [CompTokenVars.content.textColor]: ColorTokenVars.onBase,
          [CompTokenVars.container.backgroundColor]: ColorTokenVars.base,
        },
      },
      elevated: {
        vars: {
          [CompTokenVars.content.textColor]: ColorTokenVars.base,
          [CompTokenVars.container.backgroundColor]: TokenVars.color.surface.surfaceContainerLow,
        },
        shadow: TokenVars.elevation.level1,
      },
      text: {
        vars: {
          [CompTokenVars.content.textColor]: ColorTokenVars.base,
          [CompTokenVars.layer.backgroundColor]: ColorTokenVars.base,
        },
      },
      tonal: {
        vars: {
          [CompTokenVars.content.textColor]: TokenVars.color.secondary.onBaseContainer,
          [CompTokenVars.container.backgroundColor]: TokenVars.color.secondary.baseContainer,
        },
      },
      outline: {
        vars: {
          [CompTokenVars.content.textColor]: TokenVars.color.surface.onSurfaceVariant,
          [CompTokenVars.container.borderColor]: TokenVars.color.surface.outlineVariant,
        },
      },
    },
  },
});
