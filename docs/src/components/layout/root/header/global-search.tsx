'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CornerDownLeftIcon, FileTextIcon, SearchIcon } from 'lucide-react';

import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { docsNav } from '@/lib/docs-nav';

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
  const [query, setQuery] = React.useState('');

  function handleSelect(href: string) {
    onOpenChange(false);
    setQuery('');
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle>Search documentation</DialogTitle>
        <DialogDescription>Search the Abbes UI documentation by page title or description.</DialogDescription>
      </DialogHeader>
      <DialogContent showCloseButton={false} className="top-1/4 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl">
        <Command shouldFilter label="Documentation">
          <CommandInput value={query} onValueChange={setQuery} placeholder="Search documentation..." />
          <CommandList className="max-h-80">
            <CommandEmpty className="text-muted-foreground">No results found for &ldquo;{query}&rdquo;.</CommandEmpty>
            {docsNav.map((section) => (
              <CommandGroup key={section.title} heading={section.title}>
                {section.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.title} ${item.description ?? ''}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <FileTextIcon className="size-4 text-muted-foreground" />
                    <span className="truncate">{item.title}</span>
                    {item.description ? (
                      <span className="ml-auto truncate text-xs text-muted-foreground">{item.description}</span>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="flex items-center justify-between gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
          {/* <span className="truncate">{docsSearchItems.length} pages indexed</span> */}
          <span className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <Kbd>
                <CornerDownLeftIcon />
              </Kbd>
              to open
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

  if (variant === 'icon') {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={open}
        aria-label="Search documentation"
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
        <span className="truncate">Search documentation...</span>
      </span>
      <Kbd className="hidden lg:inline-flex">⌘K</Kbd>
    </Button>
  );
}
