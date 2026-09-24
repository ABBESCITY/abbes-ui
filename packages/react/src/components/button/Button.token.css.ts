import { definedToken } from '../../utils/token';

const buttonComponentName = 'button';

export const [CompTokenClass, CompTokenVars] = definedToken(buttonComponentName, {
  container: {
    gap: null,
    radius: null,
    height: null,
    paddingX: null,
    paddingY: null,
    borderColor: null,
    backgroundColor: null,
  },

  // Content
  content: {
    fontSize: null,
    textColor: null,
    iconColor: null,
  },

  layer: {
    opacity: 0,
    backgroundColor: null,
  },
});
