import { ArrowRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Link } from '@/lib/i18n/navigation';

const steps = [
  {
    key: 'install',
    code: 'pnpm add @abbes-ui/react @abbes-ui/token',
  },
  {
    key: 'stylesheet',
    file: 'app/layout.tsx',
    code: "import '@abbes-ui/token/css';",
  },
  {
    key: 'provider',
    file: 'app/layout.tsx',
    code: `import { ThemeProvider } from '@abbes-ui/react';
import { Token } from '@abbes-ui/token';

const token = {
  ...Token,
  color: {
    ...Token.color,
    primary: { ...Token.color.primary, base: 'oklch(0.55 0.2 265)' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider token={token}>
      {children}
    </ThemeProvider>
  );
}`,
  },
  {
    key: 'render',
    file: 'app/page.tsx',
    code: `import { Button } from '@abbes-ui/react/button';

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Button size="small" variant="fill" color="primary">
        Save changes
      </Button>
      <Button size="small" variant="outline" color="secondary">
        Cancel
      </Button>
    </div>
  );
}`,
  },
] as const;

const links = [
  { key: 'button', href: '/components/button' },
  { key: 'tag', href: '/components/tag' },
] as const;

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-muted/40 p-4 font-mono text-sm leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

export default async function ComponentsQuickStartPage() {
  const t = await getTranslations('docs.components.pages.quickStart');

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">{t('description')}</p>
      </header>

      <div className="flex flex-col gap-10">
        {steps.map((step, index) => (
          <section key={step.key} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{index + 1}</Badge>
                <h2 className="font-heading text-xl font-semibold tracking-tight">{t(`steps.${step.key}.title`)}</h2>
              </div>
              <p className="max-w-2xl text-pretty text-muted-foreground">{t(`steps.${step.key}.description`)}</p>
            </div>
            <div className="flex flex-col gap-2">
              {'file' in step && step.file ? (
                <span className="font-mono text-xs text-muted-foreground">{step.file}</span>
              ) : null}
              <CodeBlock code={step.code} />
            </div>
          </section>
        ))}
      </div>

      <section className="flex flex-col gap-4 border-t pt-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-xl font-semibold tracking-tight">{t('nextSteps.title')}</h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">{t('nextSteps.description')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Card key={link.key} size="sm" className="group/card relative h-full gap-4 [--card-spacing:--spacing(5)]">
              <CardHeader>
                <h3 className="font-heading text-base leading-snug font-medium">
                  <Link
                    href={link.href}
                    className="rounded-xs outline-none after:absolute after:inset-0 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {t(`links.${link.key}.title`)}
                  </Link>
                </h3>
                <CardDescription className="flex items-center gap-1 text-pretty">
                  {t(`links.${link.key}.description`)}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-3.5 shrink-0 transition-transform group-hover/card:translate-x-0.5"
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
