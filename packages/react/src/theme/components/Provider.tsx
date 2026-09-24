import { useEffect, useMemo } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { createGlobalThemeContract, injectStyle, Token } from '@abbes-ui/token';

import { difference, intersect, kebab, varsTokenFormat } from '../../utils';

import { ThemeContext } from '../context';
import { ColorTokenVars, TokenVars } from '../token/index.css';

import type { ReactNode } from 'react';
import type { ThemeTokenValue } from '@abbes-ui/token';

interface ThemeProviderProps {
  token: ThemeTokenValue;
  children?: ReactNode;
}

const NonAccentColor = ['surface', 'inverse', 'elevated'];

export function ThemeProvider({ token, children }: ThemeProviderProps) {
  const cusColors = useMemo(() => difference(token.color, Token.color), [token.color]);
  const presetColors = useMemo(() => intersect(token.color, Token.color), [token.color]);
  const accentColors = useMemo(() => difference(token.color, NonAccentColor), [token.color]);

  const colorsVars = useMemo(
    () =>
      createGlobalThemeContract(
        { color: cusColors },
        {
          mapName: (path) => {
            if (path[0] === 'color') {
              const accent = path.splice(1, 1)[0];
              path[1] = kebab(path[1], { pattern: /\bbase\b/g, str: accent });
            }
            return varsTokenFormat(path, 'ref');
          },
        },
      ),
    [],
  );
  const allColorVars = useMemo(() => ({ ...(colorsVars.color as any), ...TokenVars.color }), [TokenVars, colorsVars]);

  useEffect(() => {
    const cusStyle = assignInlineVars(colorsVars, { color: cusColors } as any);
    const presetStyle = assignInlineVars(TokenVars, { ...token, color: presetColors } as any);

    const colorDynamicStyle = Object.keys(accentColors).reduce((css, key: string) => {
      css[`[data-color="${key}"]`] = assignInlineVars(ColorTokenVars, allColorVars[key]);
      return css;
    }, {} as any);

    const cleanUpOne = injectStyle({ ...cusStyle, ...presetStyle }, { selector: ':root' });
    const cleanUpTwo = injectStyle(colorDynamicStyle, { attrs: { 'data-color-tokens': '' } });

    return () => {
      cleanUpOne();
      cleanUpTwo();
    };
  }, [token, colorsVars, cusColors, presetColors]);

  return <ThemeContext.Provider value={{ token: token }}>{children}</ThemeContext.Provider>;
}
