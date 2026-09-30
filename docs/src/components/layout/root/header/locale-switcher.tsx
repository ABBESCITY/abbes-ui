'use client';

import { CheckIcon, LanguagesIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { routing, Link, usePathname } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeading,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LocaleSwitcherProps = {
  className?: string;
};

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('site');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" className={className} aria-label={t('ariaLabel.language')} />}
      >
        <LanguagesIcon />
        <span className="sr-only">{t(`language.items.${locale}`)}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuHeading>{t('language.label')}</DropdownMenuHeading>
        <DropdownMenuSeparator />
        {routing.locales.map((item) => (
          <DropdownMenuItem
            key={item}
            render={<Link href={pathname} locale={item} scroll={false} />}
            aria-current={item === locale ? 'true' : undefined}
            className="aria-[current=true]:bg-accent aria-[current=true]:text-accent-foreground"
          >
            <span className="w-4 text-xs text-muted-foreground">{t(`language.short.${item}`)}</span>
            {t(`language.items.${item}`)}
            {item === locale ? <CheckIcon className="ml-auto size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
