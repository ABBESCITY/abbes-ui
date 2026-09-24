import type { ThemeTokenValue } from '@abbes-ui/react';

export const darkToken: ThemeTokenValue = {
  color: {
    primary: {
      base: '#97D945', // primary
      onBase: '#1F3700', // onPrimary
      baseContainer: '#64A104', // primaryContainer
      onBaseContainer: '#192F00', // onPrimaryContainer
    },
    secondary: {
      base: '#B1D188', // secondary
      onBase: '#1F3700', // onSecondary
      baseContainer: '#365016', // secondaryContainer
      onBaseContainer: '#A3C37B', // onSecondaryContainer
    },
    tertiary: {
      base: '#5DDCB0', // tertiary
      onBase: '#003828', // onTertiary
      baseContainer: '#05A47C', // tertiaryContainer
      onBaseContainer: '#002F21', // onTertiaryContainer
    },
    danger: {
      base: '#FFB4AB', // error
      onBase: '#690005', // onError
      baseContainer: '#93000A', // errorContainer
      onBaseContainer: '#FFDAD6', // onErrorContainer
    },
    // 未提供，保留原值
    success: {
      base: '#A5D6A7',
      onBase: '#00390A',
      baseContainer: '#005312',
      onBaseContainer: '#C8E6C9',
    },
    warn: {
      base: '#FFCC80',
      onBase: '#4A2800',
      baseContainer: '#6B3C00',
      onBaseContainer: '#FFE0B2',
    },
    info: {
      base: '#90CAF9',
      onBase: '#003258',
      baseContainer: '#004A77',
      onBaseContainer: '#CFE5FF',
    },
    // 未提供，暂用 primary 同值
    brand: {
      base: '#97D945',
      onBase: '#1F3700',
      baseContainer: '#64A104',
      onBaseContainer: '#192F00',
    },
    surface: {
      surface: '#11150B', // surface
      surfaceDim: '#11150B', // surfaceDim
      surfaceBright: '#363B2F', // surfaceBright
      surfaceContainerLowest: '#0B0F07', // surfaceContainerLowest
      surfaceContainerLow: '#191D13', // surfaceContainerLow
      surfaceContainer: '#1D2117', // surfaceContainer
      surfaceContainerHigh: '#272B21', // surfaceContainerHigh
      surfaceContainerHighest: '#32362B', // surfaceContainerHighest
      onSurface: '#E0E4D4', // onSurface
      onSurfaceVariant: '#C2CAB2', // onSurfaceVariant
      outline: '#8C947E', // outline
      outlineVariant: '#424937', // outlineVariant
    },
    inverse: {
      inverseSurface: '#E0E4D4', // inverseSurface
      inverseOnSurface: '#2E3227', // inverseOnSurface
      inversePrimary: '#3F6900', // inversePrimary
    },
    elevated: {
      scrim: '#000000', // scrim
      shadow: '#000000', // shadow
    },
  },

  typography: {
    display: {
      large: { fontSize: '57px', fontWeight: 400 },
      medium: { fontSize: '45px', fontWeight: 400 },
      small: { fontSize: '36px', fontWeight: 400 },
    },
    headline: {
      large: { fontSize: '32px', fontWeight: 400 },
      medium: { fontSize: '28px', fontWeight: 400 },
      small: { fontSize: '24px', fontWeight: 400 },
    },
    title: {
      large: { fontSize: '22px', fontWeight: 400 },
      medium: { fontSize: '16px', fontWeight: 500 },
      small: { fontSize: '14px', fontWeight: 500 },
    },
    body: {
      large: { fontSize: '16px', fontWeight: 400 },
      medium: { fontSize: '14px', fontWeight: 400 },
      small: { fontSize: '12px', fontWeight: 400 },
    },
    label: {
      large: { fontSize: '14px', fontWeight: 500 },
      medium: { fontSize: '12px', fontWeight: 500 },
      small: { fontSize: '11px', fontWeight: 500 },
    },
  },

  space: {
    none: '0px',
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  state: {
    hovered: '0.08',
    focused: '0.10',
    pressed: '0.12',
    dragged: '0.16',
  },

  elevation: {
    level0: 'none',
    level1: '0 1px 2px 0 rgba(0,0,0,.60), 0 1px 3px 1px rgba(0,0,0,.30)',
    level2: '0 1px 2px 0 rgba(0,0,0,.60), 0 2px 6px 2px rgba(0,0,0,.30)',
    level3: '0 1px 3px 0 rgba(0,0,0,.60), 0 4px 8px 3px rgba(0,0,0,.30)',
    level4: '0 2px 3px 0 rgba(0,0,0,.60), 0 6px 10px 4px rgba(0,0,0,.30)',
    level5: '0 4px 4px 0 rgba(0,0,0,.60), 0 8px 12px 6px rgba(0,0,0,.30)',
  },
};
