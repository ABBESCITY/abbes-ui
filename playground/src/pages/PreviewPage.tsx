import { Button } from '@abbes-ui/react';
import type { ButtonProps } from '@abbes-ui/react';

import { PreviewLayout } from '@/components/layouts/page/PreviewLayout';

import './PreviewPage.scss';

const sizes: NonNullable<ButtonProps['size']>[] = ['small', 'medium', 'large', 'full'];
const variants: NonNullable<ButtonProps['variant']>[] = ['solid', 'soft', 'outline', 'plain', 'text'];

const code = `import { Button } from '@abbes-ui/react';

export function Example() {
  return <Button variant="solid">Button</Button>;
}`;

export default function PreviewPage() {
  return (
    <PreviewLayout code={code} title="Button">
      <div className="preview-row">
        <span className="preview-label">Variants</span>
        <div className="button-grid">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>

      <div className="preview-row">
        <span className="preview-label">Sizes</span>
        <div className="button-grid">
          {sizes.map((size) => (
            <Button key={size} size={size} variant="soft">
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="preview-row">
        <span className="preview-label">States</span>
        <div className="button-grid">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button slots={{ leftIcon: <span aria-hidden="true">+</span> }}>With icon</Button>
        </div>
      </div>
    </PreviewLayout>
  );
}
