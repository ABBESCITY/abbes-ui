declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.modules.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss';

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '@abbes-ui/token/css/components/button' {}
