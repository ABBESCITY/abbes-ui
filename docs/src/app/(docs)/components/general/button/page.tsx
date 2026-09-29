import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Badge variant="outline" className="w-fit">
          React
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Components</h1>
        <p className="max-w-2xl text-muted-foreground">
          Token-driven primitives that read from the Abbes UI theme. Every component ships with typed props, CSS
          variables and a cva recipe so you can restyle without forking.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Layout primitives</CardTitle>
            <CardDescription>Box, stack and cluster helpers for spacing and layout.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Browse primitives
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
            <CardDescription>Inputs, selects and dialogs wired to the token pipeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Browse form controls
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
