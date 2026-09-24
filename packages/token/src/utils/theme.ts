export type StyleValue = string | number;

export type StyleObject = Record<string, StyleValue | Record<string, StyleValue>>;

export function injectStyle(
  input: string | StyleObject,
  options: {
    target?: HTMLElement;
    attrs?: Record<string, string>;
    selector?: string;
  } = {},
): () => void {
  const { target = document.head, attrs, selector = ':root' } = options;

  const css = typeof input === 'string' ? input : objectToCss(input, selector);

  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-abbes-style', '');

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      styleEl.setAttribute(key, value);
    }
  }

  styleEl.textContent = css;
  target.appendChild(styleEl);

  return () => {
    if (styleEl.parentNode === target) {
      target.removeChild(styleEl);
    }
  };
}

function isSelectorBlock(value: unknown): value is Record<string, StyleValue> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function objectToCss(obj: StyleObject, defaultSelector: string): string {
  const entries = Object.entries(obj);

  if (entries.length === 0) return '';

  const hasNested = entries.some(([, v]) => isSelectorBlock(v));

  if (!hasNested) {
    return ruleToString(defaultSelector, obj as Record<string, StyleValue>);
  }

  return entries
    .map(([selector, vars]) => {
      if (!isSelectorBlock(vars)) {
        throw new Error(
          `[injectStyle] 混合结构：选择器 "${selector}" 的值必须是对象，` +
            `但收到了 ${typeof vars}。要么全是原始值（扁平），要么全是对象（嵌套）。`,
        );
      }
      return ruleToString(selector, vars);
    })
    .join('\n\n');
}
function ruleToString(selector: string, vars: Record<string, StyleValue>): string {
  const lines = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `${selector} {\n${lines}\n}`;
}
