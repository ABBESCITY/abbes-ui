import type { StateScheme } from '../definitions/common/state';
import type { SpaceScheme } from '../definitions/common/space';
import type { ElevationScheme } from '../definitions/common/elevation';

import type { ResolvedColorTokenSchema, TokenPrimitive, TypographyScheme } from './token';

// Vars
export type VarRef = `var(--${string})`;
export interface VarsFromToken {
  [k: string]: VarRef | VarsFromToken;
}
export type VarsFromShape<T> = T extends TokenPrimitive | null | undefined
  ? VarRef
  : T extends (...args: any) => any
    ? never
    : T extends readonly (infer U)[]
      ? VarsFromShape<U>[]
      : { readonly [K in keyof T]: VarsFromShape<T[K]> };

// Theme
export type ThemeTokenContract = {
  color: ResolvedColorTokenSchema<null>;
  typography: TypographyScheme<null>;
  space: SpaceScheme<null>;
  state: StateScheme<null>;
  elevation: ElevationScheme<null>;
};

export type ThemeTokenValue = {
  color: ResolvedColorTokenSchema<string>;
  typography: TypographyScheme<string | number>;
  space: SpaceScheme<string | number>;
  state: StateScheme<string | number>;
  elevation: ElevationScheme<string>;
};

export type ThemeTokenVars = {
  color: ResolvedColorTokenSchema<VarRef>;
  typography: TypographyScheme<VarRef>;
  space: SpaceScheme<VarRef>;
  state: StateScheme<VarRef>;
  elevation: ElevationScheme<VarRef>;
};
