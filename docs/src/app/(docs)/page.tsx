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
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { docsNavItems, type DocsNavItem } from '@/lib/docs-nav';
import { siteConfig } from '@/lib/site-config';

const navIcons: Record<NonNullable<DocsNavItem['icon']>, LucideIcon> = {
  theme: PaletteIcon,
  components: ComponentIcon,
  utils: WrenchIcon,
  guide: BookOpenIcon,
};

const valueProps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Token-driven theming',
    description:
      'Design tokens drive color, spacing and typography. Switch themes at runtime without rebuilding styles or forking components.',
    icon: PaletteIcon,
  },
  {
    title: 'Composable by default',
    description:
      'Primitives are designed to be assembled, not configured. Every recipe is overridable through CSS variables instead of props.',
    icon: SparklesIcon,
  },
  {
    title: 'Type-safe APIs',
    description:
      'Strict TypeScript props and generated style recipes make every integration predictable and refactor-friendly.',
    icon: RulerIcon,
  },
  {
    title: 'Accessible foundations',
    description:
      'Built on battle-tested Base UI primitives with focus management, keyboard support and ARIA semantics handled for you.',
    icon: BlocksIcon,
  },
];

const installCommand = 'pnpm add @abbes-ui/react';

const heroCtaClassName = 'h-11 gap-2 rounded-lg px-5 text-[0.9375rem]';

function ValueCard({ title, description, icon: Icon }: (typeof valueProps)[number]) {
  return (
    <Card size="sm" className="h-full gap-3 p-3 [--card-spacing:--spacing(5)]">
      <span aria-hidden className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <h3 className="font-heading text-base leading-snug font-medium">{title}</h3>
      <p className="text-pretty text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

export default function DocsHomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <section className="relative flex flex-col items-center gap-6 py-14 text-center sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-72 [background-image:radial-gradient(ellipse_60%_100%_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent)]" />
        </div>

        <Badge variant="outline" className="w-fit gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          {siteConfig.name} documentation
        </Badge>

        <h1 className="font-heading max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Build beautiful interfaces with{' '}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">{siteConfig.description}</p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<Link href="/react/components" />}
          >
            Get Started
            <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<a href={siteConfig.repo} target="_blank" rel="noopener noreferrer" />}
          >
            View on GitHub
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
              Explore the docs
            </h2>
            <p className="max-w-2xl text-pretty text-muted-foreground">
              Learn how tokens, the theme provider and the component APIs fit together.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-fit self-start sm:self-auto"
            nativeButton={false}
            render={<Link href="/react/components" />}
          >
            Browse components
            <ArrowRightIcon />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {docsNavItems.map((item) => {
            const Icon = navIcons[item.icon ?? 'components'];

            return (
              <Card
                key={item.href}
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
            Why {siteConfig.shortName}
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            A focused toolchain for teams that want design consistency without a bespoke component per screen.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {valueProps.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="flex flex-col items-center gap-4 rounded-2xl border bg-muted/30 px-6 py-12 text-center sm:py-14"
      >
        <h2 id="cta-heading" className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to start building?
        </h2>
        <p className="max-w-xl text-pretty text-muted-foreground">
          Install the package, wrap your app in the theme provider and compose your first component in minutes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<Link href="/react/components" />}
          >
            Get Started
            <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={heroCtaClassName}
            nativeButton={false}
            render={<a href={siteConfig.repo} target="_blank" rel="noopener noreferrer" />}
          >
            Star on GitHub
            <ArrowUpRightIcon />
          </Button>
        </div>
      </section>

      <div className="h-16 sm:h-20" />
    </div>
  );
}
