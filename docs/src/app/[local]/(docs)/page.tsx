import type { LucideIcon } from 'lucide-react';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BlocksIcon,
  BookOpenIcon,
  ComponentIcon,
  PaletteIcon,
  RulerIcon,
  SparklesIcon,
  TerminalIcon,
  WrenchIcon,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { siteConfig } from '@/config/site-config';
import { getLocalNav } from '@/lib/i18n/nav';
import { Link } from '@/lib/i18n/navigation';
import { getNavItems } from '@/lib/utils';

import type { NavIcon } from '@/types';

const navIcons: Record<NavIcon, LucideIcon> = {
  theme: PaletteIcon,
  components: ComponentIcon,
  utils: WrenchIcon,
  guide: BookOpenIcon,
};

const valueIcons = [PaletteIcon, SparklesIcon, RulerIcon, BlocksIcon] as const;
const valueKeys = ['theming', 'composable', 'typed', 'accessible'] as const;

const installCommand = 'pnpm add @abbes-ui/react';

const quickStartHref = '/components/quick-start';

const heroCtaClassName = 'h-11 gap-2 rounded-lg px-5 text-[0.9375rem]';

export default async function DocsHomePage() {
  const t = await getTranslations('home');
  const navItems = getNavItems(await getLocalNav('site.docs'));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <section className="relative flex flex-col items-center gap-6 py-14 text-center sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-72 [background-image:radial-gradient(ellipse_60%_100%_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent)]" />
        </div>

        <Badge variant="outline" className="w-fit gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          {t('badge', { name: siteConfig.name })}
        </Badge>

        <h1 className="font-heading max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {t.rich('title', {
            name: () => (
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            ),
          })}
        </h1>

        <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">{siteConfig.description}</p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<Link href={quickStartHref} />}
          >
            {t('getStarted')}
            <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<a href={siteConfig.repo} target="_blank" rel="noopener noreferrer" />}
          >
            {t('viewOnGitHub')}
            <ArrowUpRightIcon />
          </Button>
        </div>

        <div className="mt-2 flex w-full max-w-md items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left shadow-xs">
          <TerminalIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
          <code className="truncate font-mono text-sm">
            <span className="select-none text-muted-foreground">$ </span>
            {installCommand}
          </code>
        </div>
      </section>

      <section aria-labelledby="explore-heading" className="flex flex-col gap-6 border-t py-12 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <h2 id="explore-heading" className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('explore.title')}
            </h2>
            <p className="max-w-2xl text-pretty text-muted-foreground">{t('explore.description')}</p>
          </div>
          <Button
            variant="outline"
            className="w-fit self-start sm:self-auto"
            nativeButton={false}
            render={<Link href={quickStartHref} />}
          >
            {t('explore.browse')}
            <ArrowRightIcon />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {navItems.map((item) => {
            const Icon = navIcons[item.icon ?? 'components'];

            if (!item.href) return null;

            return (
              <Card
                key={item.key}
                size="sm"
                className="group/card relative h-full gap-4 [--card-spacing:--spacing(5)] transition-colors hover:bg-muted/40 focus-within:bg-muted/40"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      aria-hidden
                      className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    >
                      <Icon className="size-4" />
                    </span>
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 text-muted-foreground transition-transform group-hover/card:translate-x-0.5 group-hover/card:text-foreground"
                    />
                  </div>
                  <h3 className="font-heading text-base leading-snug font-medium">
                    <Link
                      href={item.href}
                      className="rounded-xs outline-none after:absolute after:inset-0 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <CardDescription className="text-pretty">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="features-heading" className="flex flex-col gap-6 border-t py-12 sm:py-16">
        <div className="flex flex-col gap-2">
          <h2 id="features-heading" className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {t('features.title', { name: siteConfig.shortName })}
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">{t('features.description')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {valueKeys.map((key, index) => {
            const Icon = valueIcons[index];

            return (
              <Card key={key} size="sm" className="h-full gap-3 p-3 [--card-spacing:--spacing(5)]">
                <span aria-hidden className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h3 className="font-heading text-base leading-snug font-medium">
                  {t(`features.items.${key}.title`)}
                </h3>
                <p className="text-pretty text-sm text-muted-foreground">{t(`features.items.${key}.description`)}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="flex flex-col items-center gap-4 rounded-2xl border bg-muted/30 px-6 py-12 text-center sm:py-14"
      >
        <h2 id="cta-heading" className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('cta.title')}
        </h2>
        <p className="max-w-xl text-pretty text-muted-foreground">{t('cta.description')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<Link href={quickStartHref} />}
          >
            {t('getStarted')}
            <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<a href={siteConfig.repo} target="_blank" rel="noopener noreferrer" />}
          >
            {t('starOnGitHub')}
            <ArrowUpRightIcon />
          </Button>
        </div>
      </section>

      <div className="h-16 sm:h-20" />
    </div>
  );
}
