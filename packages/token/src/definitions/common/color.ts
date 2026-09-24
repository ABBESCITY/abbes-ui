export const BaseContract = {
  base: null,
  onBase: null,
  baseContainer: null,
  onBaseContainer: null,
};

export const SurfaceContract = {
  surface: null,
  surfaceDim: null,
  surfaceBright: null,
  surfaceContainer: null,
  surfaceContainerLow: null,
  surfaceContainerHigh: null,
  surfaceContainerLowest: null,
  surfaceContainerHighest: null,
  onSurface: null,
  onSurfaceVariant: null,
  outline: null,
  outlineVariant: null,
};

export const InverseContract = {
  inverseSurface: null,
  inverseOnSurface: null,
  inversePrimary: null,
};
export const ElevatedContract = {
  scrim: null,
  shadow: null,
};

export type BaseColorScheme<T> = Record<keyof typeof BaseContract, T>;
export type SurfaceColorScheme<T> = Record<keyof typeof SurfaceContract, T>;
export type InverseColorScheme<T> = Record<keyof typeof InverseContract, T>;
export type ElevatedColorScheme<T> = Record<keyof typeof ElevatedContract, T>;
