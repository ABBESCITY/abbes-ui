import { Button } from '@abbes-ui/react';

import type { ButtonProps } from '@abbes-ui/react';

import { PreviewLayout } from '@/components/layouts/page/PreviewLayout';

import './PreviewPage.scss';

const sizes: NonNullable<ButtonProps['size']>[] = ['small', 'medium', 'large'];
const variants: NonNullable<ButtonProps['variant']>[] = ['fill', 'elevated', 'outline', 'tonal', 'text'];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function PreviewPage() {
  return (
    <PreviewLayout title="Button">
      <div className="preview-row">
        <span className="preview-label">Variants</span>
        <div className="button-grid">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} style={{ minWidth: '96px' }}>
              {capitalize(variant)}
            </Button>
          ))}
        </div>
      </div>

      <div className="preview-row">
        <span className="preview-label">Sizes</span>
        <div className="button-grid">
          {sizes.map((size) => (
            <Button key={size} size={size} variant="elevated">
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="preview-row">
        <span className="preview-label">Shape</span>
        <div className="button-grid">
          <Button shape="square">Square</Button>
          <Button shape="circle">C</Button>
          <Button shape="round">Round</Button>
        </div>
      </div>

      <div className="preview-row">
        <span className="preview-label">States</span>
        <div className="button-grid">
          <Button color="brand">Default</Button>
          <Button disabled>Disabled</Button>
          <Button slots={{ leftIcon: <span aria-hidden="true">+</span> }}>With icon</Button>
        </div>
      </div>
    </PreviewLayout>
  );
}
