import type { BaseColorScheme } from '@abbes-ui/react';

declare module '@abbes-ui/react' {
  interface ColorTokenSchemaExtensions<T> {
    brand: BaseColorScheme<T>;
  }
}
