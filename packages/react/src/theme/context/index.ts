import type { ThemeTokenValue } from '@abbes-ui/token';
import { createContext } from 'react';

export const ThemeContext = createContext<{
  token: ThemeTokenValue | null;
}>({
  token: null,
});
