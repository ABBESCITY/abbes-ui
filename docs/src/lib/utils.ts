import { NavItem, NavSection } from '@/types';

export { cn } from 'cn';

export function getNavItems(nav: NavSection[]): NavItem[] {
  return nav.flatMap((section) => section.items);
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
