import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';

const steps: { title: string; description: string; file?: string; code: string }[] = [
  {
    title: 'Install the packages',
    description: 'Components ship separately from their tokens, so both packages are required.',
    code: 'pnpm add @abbes-ui/react @abbes-ui/token',
  },
  {
    title: 'Load the token stylesheet',
    description: 'The generated CSS defines every design token as a custom property on :root.',
    file: 'app/layout.tsx',
    code: "import '@abbes-ui/token/css';",
  },
  {
    title: 'Add the theme provider',
    description: 'Start from the default token contract and override only the values you care about.',
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
    title: 'Render a component',
    description: 'Every component exposes typed props for size, color, shape and variant.',
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
];

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-muted/40 p-4 font-mono text-sm leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

export default function ComponentsQuickStartPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Badge variant="outline" className="w-fit">
          Overview
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Quick start</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          Install the packages, load the token stylesheet and render your first component. Four steps, no configuration
          files.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {steps.map((step, index) => (
          <section key={step.title} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{index + 1}</Badge>
                <h2 className="font-heading text-xl font-semibold tracking-tight">{step.title}</h2>
              </div>
              <p className="max-w-2xl text-pretty text-muted-foreground">{step.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              {step.file ? <span className="font-mono text-xs text-muted-foreground">{step.file}</span> : null}
              <CodeBlock code={step.code} />
            </div>
          </section>
        ))}
      </div>

      <section className="flex flex-col gap-4 border-t pt-8">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Next steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card size="sm" className="group/card relative h-full gap-4 [--card-spacing:--spacing(5)]">
            <CardHeader>
              <h3 className="font-heading text-base leading-snug font-medium">
                <Link
                  href="/components/general/button"
                  className="rounded-xs outline-none after:absolute after:inset-0 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Button
                </Link>
              </h3>
              <CardDescription className="flex items-center gap-1 text-pretty">
                Props, variants and slots for actions and form submits.
                <ArrowRightIcon
                  aria-hidden
                  className="size-3.5 shrink-0 transition-transform group-hover/card:translate-x-0.5"
                />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
