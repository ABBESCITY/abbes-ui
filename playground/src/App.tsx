import { Route, Routes } from 'react-router';
import { PlaygroundLayout } from './components/layouts/PlaygroundLayout';

import PreviewPage from './pages/PreviewPage';
import NotFoundPage from './pages/NotFoundPage';

const navItems = [
  { label: 'Preview', to: '/' },
  { label: 'Experiment', to: '/experiment' },
];

export default function App() {
  return (
    <PlaygroundLayout navItems={navItems}>
      <Routes>
        <Route path="/" element={<PreviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PlaygroundLayout>
  );
}
