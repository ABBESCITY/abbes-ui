export type NavIcon = 'theme' | 'components' | 'utils' | 'guide';

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: NavIcon;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
