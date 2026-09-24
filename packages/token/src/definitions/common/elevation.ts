export const ElevationContract = {
  level0: null,
  level1: null,
  level2: null,
  level3: null,
  level4: null,
  level5: null,
};

export type ElevationScheme<T> = Record<keyof typeof ElevationContract, T>;
