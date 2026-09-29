'use client';

import * as React from 'react';
import { LanguagesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const locales = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'zh-CN', label: '简体中文', short: 'ZH' },
  { value: 'ja', label: '日本語', short: 'JA' },
] as const;

type Locale = (typeof locales)[number]['value'];

type LocaleSwitcherProps = {
  className?: string;
  defaultLocale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
};

export function LocaleSwitcher({ className, defaultLocale = 'en', onLocaleChange }: LocaleSwitcherProps) {
  const [locale, setLocale] = React.useState<Locale>(defaultLocale);
  const active = locales.find((item) => item.value === locale) ?? locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" className={className} aria-label="Language" />}
      >
        <LanguagesIcon />
        <span className="sr-only">{active.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => {
            const next = value as Locale;

            setLocale(next);
            onLocaleChange?.(next);
          }}
        >
          {locales.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              <span className="w-4 text-xs text-muted-foreground">{item.short}</span>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
