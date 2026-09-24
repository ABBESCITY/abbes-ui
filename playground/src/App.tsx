import { Route, Routes } from 'react-router';
import { ThemeProvider } from '@abbes-ui/react';

import PreviewPage from './pages/PreviewPage';
import NotFoundPage from './pages/NotFoundPage';
import { PlaygroundLayout } from './components/layouts/PlaygroundLayout';

import { darkToken } from './styles/token';

import type { ThemeTokenValue } from '@abbes-ui/react';

const navItems = [
  { label: 'Preview', to: '/' },
  { label: 'Experiment', to: '/experiment' },
];

export default function App() {
  return (
    <ThemeProvider token={darkToken as ThemeTokenValue}>
      <PlaygroundLayout navItems={navItems}>
        <Routes>
          <Route path="/" element={<PreviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PlaygroundLayout>
    </ThemeProvider>
  );
}
