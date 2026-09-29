import type { MDXComponents } from 'mdx/types';

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Kbd, Separator } from '@/components/custom/mdx';

const components: MDXComponents = {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Kbd,
  Separator,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
