import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { themeNav } from '@/lib/docs-nav';
import { getNavItems } from '@/lib/utils';

export function ThemeDocPage({ slug }: { slug: string }) {
  const item = getNavItems(themeNav).find((entry) => entry.href === `/theme/${slug}`);

  if (!item) return null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{item.description}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>This page has not been written yet.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
