import type { BaseColorScheme, ColorTokenSchema, ColorTokenSchemaExtensions, ThemeTokenValue } from '@abbes-ui/token';

export type ComponentColor = keyof ColorTokenSchema<null>;

export type ComponentCusColor = Exclude<keyof ThemeTokenValue['color'], keyof ColorTokenSchema<null>>;

export type { BaseColorScheme, ColorTokenSchemaExtensions, ThemeTokenValue };
