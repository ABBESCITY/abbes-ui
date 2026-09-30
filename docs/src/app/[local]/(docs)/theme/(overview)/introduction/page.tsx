import { getTranslations } from 'next-intl/server';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocalNav } from '@/lib/i18n/nav';
import { getNavItems } from '@/lib/utils';

const stepKeys = ['define', 'wrap', 'compose'] as const;

export default async function ThemeIntroductionPage() {
  const t = await getTranslations('docs.theme.pages.introduction');
  const related = getNavItems(await getLocalNav('docs.theme')).filter((item) => item.href !== '/theme/introduction');

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="max-w-2xl text-muted-foreground">{t('description')}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {stepKeys.map((key, index) => (
          <Card key={key} size="sm" className="h-full gap-2 [--card-spacing:--spacing(5)]">
            <CardHeader>
              <span aria-hidden className="font-mono text-xs text-muted-foreground">
                0{index + 1}
              </span>
              <CardTitle>{t(`steps.${key}.title`)}</CardTitle>
              <CardDescription className="text-pretty">{t(`steps.${key}.description`)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-4 border-t pt-8">
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t('whatsInside')}</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((item) => (
            <Card key={item.href} size="sm" className="h-full gap-2 [--card-spacing:--spacing(5)]">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="text-pretty">{item.description ?? ''}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
