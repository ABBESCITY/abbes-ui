'use client';

import { ChevronDownIcon, PaletteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from 'cn';
import { useLocalNav } from '@/hooks/useLocalNav';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { getNavItems, isNavEntryActive } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuHeading,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ThemeMobileNavProps = {
  className?: string;
};

export function ThemeMobileNav({ className }: ThemeMobileNavProps) {
  const pathname = usePathname();
  const t = useTranslations('site');
  const nav = useLocalNav('docs.theme', { withDescription: false });
  const activeItem = getNavItems(nav).find((item) => item.href && isNavEntryActive(pathname, item.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className={cn('w-full justify-between', className)}
            aria-label={t('ariaLabel.browseTheme')}
          />
        }
      >
        <span className="flex items-center gap-2">
          <PaletteIcon aria-hidden className="size-4 text-muted-foreground" />
          {activeItem?.title ?? t('ariaLabel.browseTheme')}
        </span>
        <ChevronDownIcon aria-hidden className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--anchor-width)">
        {nav.map((section) => (
          <DropdownMenuGroup key={section.key}>
            <DropdownMenuHeading>{section.title}</DropdownMenuHeading>
            {(section.items ?? []).map((item) =>
              item.href ? (
                <DropdownMenuItem
                  key={item.key}
                  render={<Link href={item.href} />}
                  aria-current={isNavEntryActive(pathname, item.href) ? 'page' : undefined}
                  className="aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
                >
                  {item.title}
                </DropdownMenuItem>
              ) : null,
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
