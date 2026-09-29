export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavSectionActive(pathname: string, href: string): boolean {
  const root = href.split('/').filter(Boolean)[0];

  if (!root) return pathname === href;

  return pathname === `/${root}` || pathname.startsWith(`/${root}/`);
}

export type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: 'theme' | 'components' | 'utils' | 'guide';
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNav: DocsNavSection[] = [
  {
    title: 'React',
    items: [
      {
        title: 'Theme',
        href: '/theme',
        description: 'Design tokens, theme provider and color modes',
        icon: 'theme',
      },
      {
        title: 'Components',
        href: '/components/overview/quick-start',
        description: 'Component APIs, props and examples',
        icon: 'components',
      },
    ],
  },
];

export const docsNavItems: DocsNavItem[] = docsNav.flatMap((section) => section.items);

export type DocsSearchItem = DocsNavItem & { section: string };

export const docsSearchItems: DocsSearchItem[] = docsNav.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

export type ComponentsNavItem = {
  title: string;
  href: string;
  description: string;
};

export type ComponentsNavSection = {
  title: string;
  items: ComponentsNavItem[];
};

export const componentsNav: ComponentsNavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Quick start',
        href: '/components/overview/quick-start',
        description: 'Install, load tokens and render your first component.',
      },
    ],
  },
  {
    title: 'General',
    items: [
      {
        title: 'Button',
        href: '/components/general/button',
        description: 'Actions and form submits with token-driven variants.',
      },
      {
        title: 'Tag',
        href: '/components/general/tag',
        description: 'Compact labels for status, metadata and categories.',
      },
    ],
  },
];

export const componentsNavItems: ComponentsNavItem[] = componentsNav.flatMap((section) => section.items);
