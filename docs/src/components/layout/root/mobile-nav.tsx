'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { docsNav, isNavSectionActive } from '@/lib/docs-nav';

type MobileNavProps = {
  className?: string;
};

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" className={className} aria-label="Navigation" />}
      >
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {docsNav.map((section, index) => (
          <React.Fragment key={section.title}>
            {index > 0 ? <DropdownMenuSeparator /> : null}
            <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
            {section.items.map((item) => (
              <DropdownMenuItem
                key={item.href}
                render={<Link href={item.href} />}
                aria-current={isNavSectionActive(pathname, item.href) ? 'page' : undefined}
                className="aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
              >
                {item.title}
              </DropdownMenuItem>
            ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
