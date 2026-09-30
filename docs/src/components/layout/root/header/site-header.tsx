import { DocsNav } from '@/components/layout/docs/docs-nav';
import { GlobalSearchProvider, SearchTrigger } from '@/components/layout/root/header/global-search';
import { LocaleSwitcher } from '@/components/layout/root/header/locale-switcher';
import { SiteLogo } from '@/components/layout/root/header/site-logo';
import { MobileNav } from '@/components/layout/root/mobile-nav';
import { ThemeSwitch, ThemeToggle } from '@/components/layout/root/header/theme-toggle';
import { siteConfig } from '@/config/site-config';
import { Link } from '@/lib/i18n/navigation';

export function SiteHeader() {
  return (
    <GlobalSearchProvider>
      <header
        data-slot="site-header"
        className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60"
      >
        <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <SiteLogo name={siteConfig.name} />
          </Link>

          <div className="hidden min-w-0 items-center justify-between gap-4 md:flex">
            <DocsNav />
            <SearchTrigger className="ml-auto" />
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <SearchTrigger variant="icon" className="md:hidden" />
            <MobileNav className="md:hidden" />
            <ThemeSwitch className="hidden sm:inline-flex" />
            <ThemeToggle className="sm:hidden" />
            <LocaleSwitcher />
          </div>
        </div>
      </header>
    </GlobalSearchProvider>
  );
}
