export type NavIcon = 'theme' | 'components' | 'utils' | 'guide';

export interface NavItem {
  key: string;
  title: string;
  href?: string;
  description?: string;
  icon?: NavIcon;
  items?: NavItem[];
}

export interface NavRouteItem {
  href?: string;
  icon?: NavIcon;
  children: Record<string, NavRouteItem>;
}

export type NavRoute = Record<string, NavRouteItem>;

export type TranslateFn = (key: string) => string;
