'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const themes = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon },
] as const;

const subscribe = () => () => {};

function useHydrated() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function useResolvedTheme() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const value = hydrated ? (theme ?? 'system') : '';

  return { setTheme, value };
}

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, value } = useResolvedTheme();
  const active = themes.find((item) => item.value === value);
  const Icon = active?.icon ?? MonitorIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className={className} aria-label="Theme" />}>
        <Icon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={setTheme}>
          {themes.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              <item.icon />
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ThemeSwitchProps = {
  className?: string;
};

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { setTheme, value } = useResolvedTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      data-slot="theme-switch"
      className={cn('inline-flex items-center gap-0.5 rounded-lg bg-muted p-0.5', className)}
    >
      {themes.map((item) => {
        const selected = value === item.value;

        return (
          <Button
            key={item.value}
            type="button"
            role="radio"
            variant="ghost"
            size="icon-sm"
            aria-checked={selected}
            aria-label={item.label}
            title={item.label}
            onClick={() => setTheme(item.value)}
            className={cn(
              'text-muted-foreground hover:text-foreground',
              selected && 'bg-background text-foreground shadow-sm hover:bg-background hover:text-foreground',
            )}
          >
            <item.icon />
          </Button>
        );
      })}
    </div>
  );
}
