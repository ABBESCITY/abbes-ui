'use client';

import { cn } from 'cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, PaletteIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { themeNav } from '@/lib/docs-nav';
import { getNavItems, isNavEntryActive } from '@/lib/utils';

type ThemeMobileNavProps = {
  className?: string;
};

export function ThemeMobileNav({ className }: ThemeMobileNavProps) {
  const pathname = usePathname();

  const activeItem = getNavItems(themeNav).find((item) => isNavEntryActive(pathname, item.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className={cn('w-full justify-between', className)} aria-label="Browse theme" />
        }
      >
        <span className="flex items-center gap-2">
          <PaletteIcon aria-hidden className="size-4 text-muted-foreground" />
          {activeItem?.title ?? 'Browse theme'}
        </span>
        <ChevronDownIcon aria-hidden className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--anchor-width)">
        {themeNav.map((section) => (
          <DropdownMenuGroup key={section.title}>
            <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
            {section.items.map((item) => (
              <DropdownMenuItem
                key={item.href}
                render={<Link href={item.href} />}
                aria-current={isNavEntryActive(pathname, item.href) ? 'page' : undefined}
                className="aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
              >
                {item.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
