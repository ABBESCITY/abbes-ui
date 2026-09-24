export const SpaceContract = {
  none: null,
  xxs: null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  xxl: null,
  xxxl: null,
};

export type SpaceScheme<T> = Record<keyof typeof SpaceContract, T>;
