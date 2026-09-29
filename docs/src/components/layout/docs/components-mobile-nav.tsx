'use client';

import { cn } from 'cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, LayoutGridIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { componentsNav, componentsNavItems, isNavItemActive } from '@/lib/docs-nav';

type ComponentsMobileNavProps = {
  className?: string;
};

export function ComponentsMobileNav({ className }: ComponentsMobileNavProps) {
  const pathname = usePathname();

  const activeItem = componentsNavItems.find((item) => isNavItemActive(pathname, item.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className={cn('w-full justify-between', className)} aria-label="Browse components" />
        }
      >
        <span className="flex items-center gap-2">
          <LayoutGridIcon aria-hidden className="size-4 text-muted-foreground" />
          {activeItem?.title ?? 'Browse components'}
        </span>
        <ChevronDownIcon aria-hidden className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--anchor-width)">
        {componentsNav.map((section) => (
          <DropdownMenuGroup key={section.title}>
            <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
            {section.items.map((item) => (
              <DropdownMenuItem
                key={item.href}
                render={<Link href={item.href} />}
                aria-current={isNavItemActive(pathname, item.href) ? 'page' : undefined}
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
