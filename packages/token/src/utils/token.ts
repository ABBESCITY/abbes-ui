import type { ThemeTokenContract, VarRef, VarsFromToken } from '../types/theme';
import type { TokenPrimitive } from '../types/token';

export interface CreateOptions {
  prefix?: string;
  mapName?: (path: string[]) => string;
}

interface TokenObject {
  [k: string]: TokenObject | TokenPrimitive;
}

export function createGlobalThemeContract<T extends TokenObject>(
  contract: T,
  options: CreateOptions = {},
): VarsFromToken {
  const { prefix = '', mapName } = options;
  const varPrefix = prefix ? `--${prefix}-` : '--';

  const getVarName = mapName
    ? (path: string[]) => `--${mapName([...path])}`
    : (path: string[]) => `${varPrefix}${path.join('-')}`;

  const vars: VarsFromToken = {};
  const path: string[] = [];

  const walk = (node: T, target: Record<string, unknown>): void => {
    for (const key of Object.keys(node)) {
      const value = node[key];
      path.push(key);
      if (value !== null && typeof value === 'object') {
        const child: Record<string, unknown> = {};
        target[key] = child;
        walk(value as T, child);
      } else {
        target[key] = `var(${getVarName(path)})` as VarRef;
      }
      path.pop();
    }
  };

  walk(contract, vars);
  return vars;
}
