import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TagPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Badge variant="outline" className="w-fit">
          React
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Tag</h1>
        <p className="max-w-2xl text-muted-foreground">
          Compact labels for status, metadata and categories. Tags read their colors from the Abbes UI theme tokens.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Use tags to surface state next to a record or an action.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Browse variants
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>Group related records with short, low-emphasis labels.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Browse metadata
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
