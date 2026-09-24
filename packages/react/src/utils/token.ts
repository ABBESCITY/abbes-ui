import { createGlobalThemeContract, createTheme } from '@vanilla-extract/css';

export type LeafVars<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? LeafVars<T[K]> : string;
};

export function kebab(str: string, replace?: { pattern: string | RegExp; str: string }) {
  const resultStr = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  if (replace) {
    return resultStr.replace(replace.pattern, replace.str);
  }
  return resultStr;
}

export function varsTokenFormat(path: string[], component: string) {
  return `${kebab(component)}-${path.map((item) => kebab(item)).join('-')}`;
}

export function definedToken<T extends Record<string, any>>(prefix: string, token: T): [string, LeafVars<T>] {
  const vars = createGlobalThemeContract(token, (_, path) => {
    return varsTokenFormat(path, prefix);
  });
  const className = createTheme(vars, token as any);
  return [className, vars as LeafVars<T>];
}
