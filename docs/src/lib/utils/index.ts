import type { NavItem } from '@/types';

export { cn } from 'cn';

/** Flattens a nav tree to its leaf items, i.e. the entries that carry an `href`. */
export function getNavItems(nav: NavItem[]): NavItem[] {
  return nav.flatMap((node) => (node.items?.length ? getNavItems(node.items) : [node]));
}

/** Finds a node anywhere in a nav tree by key. */
export function findNavItem(nav: NavItem[], key: string): NavItem | undefined {
  for (const node of nav) {
    if (node.key === key) return node;

    const found = node.items ? findNavItem(node.items, key) : undefined;

    if (found) return found;
  }

  return undefined;
}

export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavEntryActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;

  return href.split('/').filter(Boolean).length > 1 && pathname.startsWith(`${href}/`);
}

export function isNavSectionActive(pathname: string, href: string): boolean {
  const root = href.split('/').filter(Boolean)[0];

  if (!root) return pathname === href;

  return pathname === `/${root}` || pathname.startsWith(`/${root}/`);
}
