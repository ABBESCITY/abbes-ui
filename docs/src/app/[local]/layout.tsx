import { notFound } from 'next/navigation';
import { getLocale, getMessages } from 'next-intl/server';

import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider, hasLocale } from 'next-intl';

import { SiteHeader } from '@/components/layout/root/header/site-header';

import { routing } from '@/lib/i18n/routing';
import { siteConfig } from '@/config/site-config';
import { Geist } from 'next/font/google';

import './layout.css';
import '@/styles/globals.css';

import type { Metadata } from 'next';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} Documentation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export function generateStaticParams() {
  return routing.locales.map((local) => ({ local }));
}

export default async function RootLayout({ children, params }: LayoutProps<'/[local]'>) {
  const { local } = await params;

  if (!hasLocale(routing.locales, local)) {
    notFound();
  }

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={fontSans.variable}>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div data-slot="root-layout" className="flex min-h-svh flex-col">
              <SiteHeader />
              <main id="content" className="flex-1">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
