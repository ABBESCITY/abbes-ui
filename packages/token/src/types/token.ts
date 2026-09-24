import type {
  SurfaceColorScheme,
  InverseColorScheme,
  ElevatedColorScheme,
  BaseColorScheme,
} from '../definitions/common/color';

import type {
  LabelTypographyScheme,
  BodyTypographyScheme,
  DisplayTypographyScheme,
  HeadlineTypographyScheme,
  TitleTypographyScheme,
} from '../definitions/common/typography';

export type TokenPrimitive = string | number;
export type TokenContractPrimitive = null;

export interface TokenObject {
  [k: string]: TokenObject | TokenPrimitive;
}
export interface TokenContract {
  [k: string]: TokenContractPrimitive | TokenContract;
}

export interface ColorTokenSchema<T> {
  primary: BaseColorScheme<T>;
  secondary: BaseColorScheme<T>;
  tertiary: BaseColorScheme<T>;
  warn: BaseColorScheme<T>;
  danger: BaseColorScheme<T>;
  success: BaseColorScheme<T>;
  info: BaseColorScheme<T>;
  surface: SurfaceColorScheme<T>;
  inverse: InverseColorScheme<T>;
  elevated: ElevatedColorScheme<T>;
}

export interface TypographyScheme<T> {
  display: DisplayTypographyScheme<T>;
  headline: HeadlineTypographyScheme<T>;
  title: TitleTypographyScheme<T>;
  body: BodyTypographyScheme<T>;
  label: LabelTypographyScheme<T>;
}

interface InvalidColorGroup<K extends string> {
  readonly __error: `Color group "${K}" must extend BaseColorScheme<T>`;
}

type ValidateExtensions<T, TValue> = {
  [K in keyof T]: T[K] extends BaseColorScheme<TValue> ? T[K] : InvalidColorGroup<K & string>;
};

export interface ColorTokenSchemaExtensions<T> {}

export type ResolvedColorTokenSchema<T> = ColorTokenSchema<T> & ValidateExtensions<ColorTokenSchemaExtensions<T>, T>;
