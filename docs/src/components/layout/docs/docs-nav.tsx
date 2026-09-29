'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from 'cn';
import { docsNav } from '@/lib/docs-nav';
import { getNavItems, isNavSectionActive } from '@/lib/utils';

type DocsNavProps = {
  className?: string;
};

export function DocsNav({ className }: DocsNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" data-slot="docs-nav" className={cn('flex items-center gap-1', className)}>
      {getNavItems(docsNav).map((item) => {
        const isActive = isNavSectionActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
