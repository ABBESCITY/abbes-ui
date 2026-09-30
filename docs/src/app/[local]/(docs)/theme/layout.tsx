import { ThemeMobileNav } from '@/components/layout/docs/theme/theme-mobile-nav';
import { DocsSidebar } from '@/components/layout/docs/docs-sidebar';

import './layout.css';

export default function ThemeDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-slot="theme-docs-layout" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="flex gap-10 lg:gap-12">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 flex-col overflow-y-auto py-10 lg:flex">
          <DocsSidebar pathKey="docs.theme" />
        </aside>

        <div className="min-w-0 flex-1 py-10">
          <ThemeMobileNav className="mb-6 lg:hidden" />
          {children}
        </div>
      </div>
    </div>
  );
}
