export const StateContract = {
  hovered: null,
  focused: null,
  pressed: null,
  dragged: null,
};

export type StateScheme<T> = Record<keyof typeof StateContract, T>;
