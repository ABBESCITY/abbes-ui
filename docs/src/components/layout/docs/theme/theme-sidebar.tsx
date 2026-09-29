'use client';

import { cn } from 'cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { themeNav } from '@/lib/docs-nav';
import { isNavEntryActive } from '@/lib/utils';

type ThemeSidebarProps = {
  className?: string;
};

export function ThemeSidebar({ className }: ThemeSidebarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Theme" data-slot="theme-sidebar" className={cn('flex flex-col gap-6', className)}>
      {themeNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <h2 className="px-2 pb-1 text-xs font-medium text-muted-foreground">{section.title}</h2>
          {section.items.map((item) => {
            const isActive = isNavEntryActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="rounded-lg px-2 py-1.5 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
