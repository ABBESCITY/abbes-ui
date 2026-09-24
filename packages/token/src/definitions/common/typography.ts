export const DisplayContract = {
  large: { fontSize: null, fontWeight: null },
  medium: { fontSize: null, fontWeight: null },
  small: { fontSize: null, fontWeight: null },
};
export const HeadlineContract = {
  large: { fontSize: null, fontWeight: null },
  medium: { fontSize: null, fontWeight: null },
  small: { fontSize: null, fontWeight: null },
};
export const TitleContract = {
  large: { fontSize: null, fontWeight: null },
  medium: { fontSize: null, fontWeight: null },
  small: { fontSize: null, fontWeight: null },
};
export const BodyContract = {
  large: { fontSize: null, fontWeight: null },
  medium: { fontSize: null, fontWeight: null },
  small: { fontSize: null, fontWeight: null },
};
export const LabelContract = {
  large: { fontSize: null, fontWeight: null },
  medium: { fontSize: null, fontWeight: null },
  small: { fontSize: null, fontWeight: null },
};

type TypographyType<T> = {
  fontSize: T;
  fontWeight: T;
};

export type DisplayTypographyScheme<T> = Record<keyof typeof DisplayContract, TypographyType<T>>;
export type HeadlineTypographyScheme<T> = Record<keyof typeof HeadlineContract, TypographyType<T>>;
export type TitleTypographyScheme<T> = Record<keyof typeof TitleContract, TypographyType<T>>;
export type BodyTypographyScheme<T> = Record<keyof typeof BodyContract, TypographyType<T>>;
export type LabelTypographyScheme<T> = Record<keyof typeof LabelContract, TypographyType<T>>;
