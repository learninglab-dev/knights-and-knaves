export default {
  fonts: {
    body: 'Roboto, sans-serif',
    heading: '"Germania One", cursive',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48],
    fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#392a25',
    muted: '#aaaaaa',
    background: '#f8f8f8',
    foreground: '#ffffff',
    primary: '#54345B',
    secondary: '#F58B00',
    lightgreen: '#B8E06E',
    darkgreen: '#5FB923'
  },
  space: [0, 4, 8, 16, 32, 48],
  breakpoints: ['40em', '64em', '80em'],
  buttons: {
    primary: {
      bg: 'primary',
      cursor: 'pointer'
    },
    tertiary: {
      bg: 'darkgreen',
      color: 'primary',
      border: '3px solid',
      borderColor: 'lightgreen',
      cursor: 'pointer'
    },
    outline: {
      bg: 'white',
      color: 'darkgreen',
      border: '3px solid',
      borderColor: 'darkgreen',
      cursor: 'pointer'
    },
  },
};
