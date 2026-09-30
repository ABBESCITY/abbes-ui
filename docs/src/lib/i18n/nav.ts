import { getTranslations } from 'next-intl/server';

import { buildNav } from '@/lib/nav/docs-nav';
import type { NavItem, TranslateFn } from '@/types';

type BuildOptions = { withDescription?: boolean };

/**
 * Server counterpart of `useLocalNav`. `pathKey` locates a node in `navRoutes`
 * (e.g. `'site.docs'`, `'docs.theme'`); its first segment is the next-intl
 * namespace and the result is that node's children.
 */
export async function getLocalNav(pathKey: string, options: BuildOptions = {}): Promise<NavItem[]> {
  const namespace = pathKey.split('.').filter(Boolean)[0];

  if (!namespace) return [];

  const t = (await getTranslations(namespace)) as TranslateFn;

  return buildNav(pathKey, t, { withDescription: true, ...options });
}
