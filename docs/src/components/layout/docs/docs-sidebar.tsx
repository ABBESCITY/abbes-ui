'use client';

import { useTranslations } from 'next-intl';

import { cn } from 'cn';
import { useLocalNav } from '@/hooks/useLocalNav';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { isNavEntryActive } from '@/lib/utils';

type DocsSidebarProps = {
  /** Locates the nav in `navRoutes`, e.g. `'docs.components'` or `'docs.theme'`. */
  pathKey: string;
  className?: string;
};

export function DocsSidebar({ pathKey, className }: DocsSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('site');
  const nav = useLocalNav(pathKey, { withDescription: false });
  const label = t(`ariaLabel.${pathKey.split('.').pop()}`);

  return (
    <nav aria-label={label} data-slot="docs-sidebar" className={cn('flex flex-col gap-6', className)}>
      {nav.map((section) => (
        <div key={section.key} className="flex flex-col gap-1">
          <h2 className="px-2 pb-1 text-xs font-medium text-muted-foreground">{section.title}</h2>
          {(section.items ?? []).map((item) =>
            item.href ? (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isNavEntryActive(pathname, item.href) ? 'page' : undefined}
                className="rounded-lg px-2 py-1.5 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
              >
                {item.title}
              </Link>
            ) : null,
          )}
        </div>
      ))}
    </nav>
  );
}
