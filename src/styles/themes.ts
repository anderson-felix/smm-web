import backgroundImage from '../assets/hexagon.svg';

export type ITheme = typeof dark;

const dimensions = {
  navbarWidth: '14rem',
};

export const dark = {
  title: 'dark',
  backgroundImage,
  dimensions,
  colors: {
    primary: '#1668DC',
    secondary: '#6200EE',
    background: '#121212',
    surfaceBackground: '#121212cc',
    lightBackground: '#ffffff73',
    listBackground: '#efefef',
    cardBackground: '#001529',
    text: '#efefef',
    textLight: '#ffffff73',
    error: '#ff4d4d',
    success: '#39AF7A',
    modalMask: 'rgba(0, 0 ,0, 0.3)',
    border: '#c0c0c0',
    lightBorder: '#99999999',
    textHover: '#333',
    status: {
      done: '#008B64',
      doing: '#0096c7',
      review: '#F0E68C',
      todo: '#ddd',
    },
  },
};
