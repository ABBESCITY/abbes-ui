import type { NavItem, NavRoute, NavRouteItem, TranslateFn } from '@/types';

type BuildOptions = { withDescription?: boolean };

export const navRoutes: NavRoute = {
  site: {
    children: {
      docs: {
        children: {
          theme: { href: '/theme/introduction', icon: 'theme', children: {} },
          components: { href: '/components/quick-start', icon: 'components', children: {} },
        },
      },
    },
  },
  docs: {
    children: {
      components: {
        children: {
          overview: {
            children: {
              quickStart: { href: '/components/quick-start', children: {} },
            },
          },
          general: {
            children: {
              button: { href: '/components/button', children: {} },
              tag: { href: '/components/tag', children: {} },
            },
          },
        },
      },
      theme: {
        children: {
          overview: {
            children: {
              introduction: { href: '/theme/introduction', children: {} },
              designKit: { href: '/theme/design-kit', children: {} },
            },
          },
          foundations: {
            children: {
              color: { href: '/theme/color', children: {} },
              space: { href: '/theme/space', children: {} },
              typography: { href: '/theme/typography', children: {} },
            },
          },
        },
      },
    },
  },
};

export function buildNav(pathKey: string, t: TranslateFn, options: BuildOptions = {}): NavItem[] {
  const resolved = resolvePath(pathKey);

  if (!resolved) return [];

  return buildNodes(resolved.node.children, t, options, resolved.prefix);
}

function resolvePath(pathKey: string): { node: NavRouteItem; prefix: string } | undefined {
  const [namespace, ...rest] = pathKey.split('.').filter(Boolean);
  const root = namespace ? navRoutes[namespace] : undefined;

  if (!root) return undefined;

  let node = root;

  for (const segment of rest) {
    const next = node.children?.[segment];

    if (!next) return undefined;

    node = next;
  }

  return { node, prefix: rest.join('.') };
}

function buildNodes(
  children: NavRouteItem['children'],
  t: TranslateFn,
  options: BuildOptions,
  parentPath?: string,
): NavItem[] {
  return Object.entries(children).map(([key, item]) => {
    const path = parentPath ? `${parentPath}.children.${key}` : key;

    return {
      key,
      title: t(`${path}.title`),
      ...(options.withDescription && item.href ? { description: t(`${path}.description`) } : {}),
      ...(item.href ? { href: item.href } : {}),
      ...(item.icon ? { icon: item.icon } : {}),
      items: buildNodes(item.children, t, options, path),
    };
  });
}
