'use client';

import { useTranslations } from 'next-intl';

import { cn } from 'cn';
import { useLocalNav } from '@/hooks/useLocalNav';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { getNavItems, isNavSectionActive } from '@/lib/utils';

type DocsNavProps = {
  className?: string;
};

export function DocsNav({ className }: DocsNavProps) {
  const pathname = usePathname();
  const t = useTranslations('site');
  const nav = getNavItems(useLocalNav('site.docs'));

  return (
    <nav aria-label={t('ariaLabel.nav')} data-slot="docs-nav" className={cn('flex items-center gap-1', className)}>
      {nav.map((item) =>
        item.href ? (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isNavSectionActive(pathname, item.href) ? 'page' : undefined}
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
          >
            {item.title}
          </Link>
        ) : null,
      )}
    </nav>
  );
}
