import type { NavSection } from '@/types';

export const docsNav: NavSection[] = [
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
export const componentsNav: NavSection[] = [
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
export const themeNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Introduction',
        href: '/theme',
        description: 'How tokens, themes and the theme provider fit together.',
      },
      {
        title: 'Design kit',
        href: '/theme/design-kit',
        description: 'The shared foundations, assets and rules behind every component.',
      },
    ],
  },
  {
    title: 'Foundations',
    items: [
      {
        title: 'Color',
        href: '/theme/color',
        description: 'Color roles, palettes and the CSS variable mapping.',
      },
      {
        title: 'Space',
        href: '/theme/space',
        description: 'The spacing scale, radius and sizing utilities.',
      },
      {
        title: 'Typography',
        href: '/theme/typography',
        description: 'Font families, type scale and heading styles.',
      },
    ],
  },
];
