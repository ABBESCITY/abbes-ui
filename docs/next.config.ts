import createMDX from '@next/mdx';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['@abbes-ui/react', '@abbes-ui/token'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug', 'rehype-highlight'],
  },
});

export default withMDX(nextConfig);
