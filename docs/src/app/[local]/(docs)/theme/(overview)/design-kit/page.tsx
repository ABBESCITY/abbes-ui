import { getTranslations } from 'next-intl/server';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocalNav } from '@/lib/i18n/nav';
import { getNavItems } from '@/lib/utils';

export default async function DesignKitPage() {
  const [nav, t] = await Promise.all([getLocalNav('docs.theme'), getTranslations('docs.theme.comingSoon')]);
  const item = getNavItems(nav).find((entry) => entry.href === '/theme/design-kit');

  if (!item) return null;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{item.description}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
