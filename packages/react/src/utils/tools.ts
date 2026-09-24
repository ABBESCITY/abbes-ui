type KeySource = object | readonly string[];
type KeysFrom<S extends KeySource> = S extends readonly (infer K extends string)[] ? K : keyof S & string;

const isStringArray = (v: unknown): v is readonly string[] => Array.isArray(v);

function toKeySet(source: KeySource): Set<string> {
  return isStringArray(source) ? new Set(source) : new Set(Object.keys(source));
}

export function intersect<T extends object, U extends KeySource>(a: T, b: U): Pick<T, Extract<keyof T, KeysFrom<U>>> {
  const keys = toKeySet(b);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(a)) {
    if (keys.has(key)) {
      result[key] = (a as Record<string, unknown>)[key];
    }
  }
  return result as Pick<T, Extract<keyof T, KeysFrom<U>>>;
}

export function difference<T extends object, U extends KeySource>(a: T, b: U): Omit<T, Extract<keyof T, KeysFrom<U>>> {
  const keys = toKeySet(b);
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(a)) {
    if (!keys.has(key)) {
      result[key] = (a as Record<string, unknown>)[key];
    }
  }
  return result as Omit<T, Extract<keyof T, KeysFrom<U>>>;
}
