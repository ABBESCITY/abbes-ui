'use client';

import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useLocalNav } from '@/hooks/useLocalNav';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { getNavItems, isNavSectionActive } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeading,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type MobileNavProps = {
  className?: string;
};

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const t = useTranslations('site');
  const nav = getNavItems(useLocalNav('site.docs'));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" className={className} aria-label={t('ariaLabel.menu')} />}
      >
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuHeading>{t('docs.title')}</DropdownMenuHeading>
        {nav.map((item) =>
          item.href ? (
            <DropdownMenuItem
              key={item.key}
              render={<Link href={item.href} />}
              aria-current={isNavSectionActive(pathname, item.href) ? 'page' : undefined}
              className="aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
            >
              {item.title}
            </DropdownMenuItem>
          ) : null,
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
