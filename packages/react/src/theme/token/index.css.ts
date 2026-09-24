import { BaseContract, Token, type BaseColorScheme, type ThemeTokenVars, type VarRef } from '@abbes-ui/token';
import { createGlobalThemeContract } from '@vanilla-extract/css';

import { kebab, varsTokenFormat } from '../../utils/token';

export const TokenVars = createGlobalThemeContract(Token as any, (_, path) => {
  if (path[0] === 'color') {
    const accent = path.splice(1, 1)[0];
    path[1] = kebab(path[1], { pattern: /\bbase\b/g, str: accent });
  }
  return varsTokenFormat(path, 'ref');
}) as unknown as ThemeTokenVars;

export const ColorTokenVars = createGlobalThemeContract(BaseContract as any, (_, path) =>
  varsTokenFormat(path, 'comp'),
) as BaseColorScheme<VarRef>;
