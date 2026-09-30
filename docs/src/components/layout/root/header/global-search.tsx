'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { CornerDownLeftIcon, FileTextIcon, SearchIcon } from 'lucide-react';

import { cn } from 'cn';
import { getNavItems } from '@/lib/utils';
import { useLocalNav } from '@/hooks/useLocalNav';
import { useRouter } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type GlobalSearchContextValue = {
  open: () => void;
};

const GlobalSearchContext = React.createContext<GlobalSearchContextValue | null>(null);

function useGlobalSearch() {
  const context = React.useContext(GlobalSearchContext);

  if (!context) {
    throw new Error('useGlobalSearch must be used within <GlobalSearchProvider>');
  }

  return context;
}

function GlobalSearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const nav = getNavItems(useLocalNav('site.docs'));
  const t = useTranslations('site');
  const [query, setQuery] = React.useState('');

  function handleSelect(target: string) {
    onOpenChange(false);
    setQuery('');
    router.push(target);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>{t('search.title')}</DialogTitle>
        <DialogDescription>{t('search.description')}</DialogDescription>
      </DialogHeader>
      <DialogContent showCloseButton={false} className="top-1/4 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl">
        <Command shouldFilter label={t('ariaLabel.nav')}>
          <CommandInput value={query} onValueChange={setQuery} placeholder={t('search.placeholder')} />
          <CommandList className="max-h-80">
            <CommandEmpty className="text-muted-foreground">{t('search.empty', { query })}</CommandEmpty>
            {nav.map((item) =>
              item.href ? (
                <CommandGroup key={item.key} heading={t('docs.title')}>
                  <CommandItem
                    key={item.key}
                    value={`${item.title} ${item.description ?? ''}`}
                    onSelect={() => handleSelect(item.href as string)}
                  >
                    <FileTextIcon className="size-4 text-muted-foreground" />
                    <span className="truncate">{item.title}</span>
                    {item.description ? (
                      <span className="ml-auto truncate text-xs text-muted-foreground">{item.description}</span>
                    ) : null}
                  </CommandItem>
                </CommandGroup>
              ) : null,
            )}
          </CommandList>
        </Command>
        <div className="flex items-center justify-between gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
          <span className="truncate">{t('search.indexed', { count: nav.length })}</span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              {t('search.toNavigate')}
            </span>
            <span className="flex items-center gap-1">
              <Kbd>
                <CornerDownLeftIcon />
              </Kbd>
              {t('search.toOpen')}
            </span>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GlobalSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      setOpen((prev) => !prev);
    }

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const value = React.useMemo<GlobalSearchContextValue>(() => ({ open: () => setOpen(true) }), []);

  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
      <GlobalSearchDialog open={open} onOpenChange={setOpen} />
    </GlobalSearchContext.Provider>
  );
}

type SearchTriggerProps = {
  className?: string;
  variant?: 'field' | 'icon';
};

export function SearchTrigger({ className, variant = 'field' }: SearchTriggerProps) {
  const { open } = useGlobalSearch();
  const t = useTranslations('site');

  if (variant === 'icon') {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={open}
        aria-label={t('ariaLabel.search')}
        className={className}
      >
        <SearchIcon />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={open}
      className={cn('h-8 w-full max-w-64 justify-between gap-2 px-2.5 font-normal text-muted-foreground', className)}
    >
      <span className="flex min-w-0 items-center gap-2">
        <SearchIcon />
        <span className="truncate">{t('search.placeholder')}</span>
      </span>
      <Kbd className="hidden lg:inline-flex">⌘K</Kbd>
    </Button>
  );
}
