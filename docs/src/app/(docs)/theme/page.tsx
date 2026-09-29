import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { themeNav } from '@/lib/docs-nav';

export default function ThemePage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Badge variant="outline" className="w-fit">
          Theme
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Theme</h1>
        <p className="max-w-2xl text-muted-foreground">
          Tokens are the single source of truth for color, typography and spacing. The theme provider maps them onto CSS
          variables so every component reads from the same source.
        </p>
      </header>

      {themeNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold tracking-tight">{section.title}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {section.items
              .filter((item) => item.href !== '/theme')
              .map((item) => (
                <Card key={item.href} size="sm" className="h-full gap-2 [--card-spacing:--spacing(5)]">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
