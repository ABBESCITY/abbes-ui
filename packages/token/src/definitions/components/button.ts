import { MainColorTokenStruct } from '../common/color';

export const ButtonTokenStruct = {
  component: 'button',
  colorToken: {
    mainColor: MainColorTokenStruct,
  },
  componentToken: {
    // Container
    container: {
      gap: '8px',
      radius: '8px',
      height: '32px',
      paddingX: '12px',
      paddingY: '6px',
      borderColor: 'green',
      backgroundColor: 'white',
    },

    // Content
    content: {
      iconSize: '14px',
      fontSize: '14px',
      iconColor: 'white',
      textColor: 'black',
    },
  },
};
