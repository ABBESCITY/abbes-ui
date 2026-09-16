import type { ReactNode } from 'react';

import './PreviewLayout.scss';

type PreviewLayoutProps = {
  action?: ReactNode;
  children: ReactNode;
  code?: string;
  eyebrow?: string;
  title: string;
};

export function PreviewLayout({ action, children, eyebrow = 'Components', title }: PreviewLayoutProps) {
  return (
    <div className="preview-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      <div className="preview-panel">{children}</div>
    </div>
  );
}
