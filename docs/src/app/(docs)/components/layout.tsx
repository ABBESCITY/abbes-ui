import { ComponentsMobileNav } from '@/components/layout/docs/components/components-mobile-nav';
import { ComponentsSidebar } from '@/components/layout/docs/components/components-sidebar';

import './layout.css';

export default function ComponentsDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-slot="docs-layout" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="flex gap-10 lg:gap-12">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 flex-col overflow-y-auto py-10 lg:flex">
          <ComponentsSidebar />
        </aside>

        <div className="min-w-0 flex-1 py-10">
          <ComponentsMobileNav className="mb-6 lg:hidden" />
          {children}
        </div>
      </div>
    </div>
  );
}
