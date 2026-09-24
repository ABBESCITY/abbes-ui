import type { StyleRule } from '@vanilla-extract/css';

const NESTED_AT_RULES = new Set(['@media', '@supports', '@container', '@layer']);

type NestedObject = {
  [key: string]: StyleRule | NestedObject;
};

interface RuleOutput {
  properties: Record<string, unknown>;
  selectors: Record<string, StyleRule>;
  atRules: Record<string, Record<string, StyleRule>>;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isAtRule(key: string): boolean {
  return key.length > 0 && key.charCodeAt(0) === 64; // '@'
}

function isSelector(key: string): boolean {
  if (key.length === 0) return false;
  const c = key.charCodeAt(0);
  return (
    c === 38 || // &
    c === 58 || // :
    c === 91 || // [
    c === 62 || // >
    c === 43 || // +
    c === 126 || // ~
    c === 46 || // .
    c === 35 || // #
    c === 42 // *
  );
}

function joinSelector(parent: string, child: string): string {
  if (!parent) {
    return child.startsWith('&') ? child : `&${child}`;
  }
  if (child.startsWith('&')) {
    return parent + child.slice(1);
  }
  if (child.startsWith(':') || child.startsWith('[')) {
    return parent + child;
  }
  return `${parent} ${child}`;
}

function processRule(obj: Record<string, unknown>, parentSelector: string): RuleOutput {
  const properties: Record<string, unknown> = {};
  const selectors: Record<string, StyleRule> = {};
  const atRules: Record<string, Record<string, StyleRule>> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (!isPlainObject(value)) {
      properties[key] = value;
      continue;
    }

    if (isAtRule(key)) {
      if (!NESTED_AT_RULES.has(key)) {
        properties[key] = value;
        continue;
      }

      if (!atRules[key]) atRules[key] = {};

      for (const [query, queryValue] of Object.entries(value)) {
        if (!isPlainObject(queryValue)) {
          atRules[key][query] = queryValue as StyleRule;
          continue;
        }

        const inner = processRule(queryValue, parentSelector);

        if (parentSelector) {
          // 在选择器上下文中遇到 at-rule：属性要挂到 selectors[parentSelector]
          atRules[key][query] = {
            selectors: {
              [parentSelector]: inner.properties as StyleRule,
              ...inner.selectors,
            },
          };
        } else {
          const rule: StyleRule = { ...inner.properties } as StyleRule;
          if (Object.keys(inner.selectors).length > 0) {
            rule.selectors = inner.selectors;
          }
          atRules[key][query] = rule;
        }
      }
      continue;
    }

    if (isSelector(key)) {
      const childSelector = joinSelector(parentSelector, key);
      const child = processRule(value, childSelector);

      if (Object.keys(child.properties).length > 0) {
        selectors[childSelector] = {
          ...(selectors[childSelector] || {}),
          ...child.properties,
        } as StyleRule;
      }
      for (const [sel, rule] of Object.entries(child.selectors)) {
        selectors[sel] = {
          ...(selectors[sel] || {}),
          ...rule,
        } as StyleRule;
      }

      for (const [atRule, queries] of Object.entries(child.atRules)) {
        if (!atRules[atRule]) atRules[atRule] = {};
        Object.assign(atRules[atRule], queries);
      }
      continue;
    }

    properties[key] = value;
  }

  return { properties, selectors, atRules };
}

export function nested<T extends NestedObject>(rule: T): StyleRule {
  const root = processRule(rule as Record<string, unknown>, '');
  const result: Record<string, unknown> = { ...root.properties };

  if (Object.keys(root.selectors).length > 0) {
    result.selectors = root.selectors;
  }
  for (const [atRule, queries] of Object.entries(root.atRules)) {
    result[atRule] = queries;
  }

  return result as StyleRule;
}
