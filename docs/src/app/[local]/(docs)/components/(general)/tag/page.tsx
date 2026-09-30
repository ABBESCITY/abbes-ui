import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const cardKeys = ['status', 'metadata'] as const;

export default async function TagPage() {
  const t = await getTranslations('docs.components.pages.tag');

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="max-w-2xl text-muted-foreground">{t('description')}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {cardKeys.map((key) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{t(`cards.${key}.title`)}</CardTitle>
              <CardDescription>{t(`cards.${key}.description`)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">
                {t('browse')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
