'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { buildNav } from '@/lib/nav/docs-nav';
import type { NavItem, TranslateFn } from '@/types';

export type UseLocalNavOptions = {
  withDescription?: boolean;
};

export function useLocalNav(pathKey: string, options: UseLocalNavOptions = {}): NavItem[] {
  const namespace = pathKey.split('.').filter(Boolean)[0];
  const t = useTranslations(namespace);
  const { withDescription = true } = options;

  return useMemo(
    () => (namespace ? buildNav(pathKey, t as TranslateFn, { withDescription }) : []),
    [namespace, pathKey, t, withDescription],
  );
}
