import type { ComponentProps, JSX, JSXElementConstructor, ReactNode } from 'react';

export type ComponentSlot = ComponentSlotRender | ReactNode;

export type ComponentSlotRender<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = keyof JSX.IntrinsicElements,
> = (props?: ComponentProps<T>) => ReactNode;
