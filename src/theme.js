export default {
  fonts: {
    body: '"VT323", monospace',
    heading: '"Germania One", cursive',
  },
  fontSizes: {
        'tiny': 14,
        'small': 18,
        'medium': 24,
        'large': 48,
        'huge': 64,
        'colossal': 96,
    },
  fontWeights: {
  body: 400,
  heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
    history:1.25
  },
  letterSpacings: {
    body: 1,
    heading: 1.5,
  },
  colors: {
    text: '#3D2642',
    muted: '#aaaaaa',
    background: '#f8f8f8',
    foreground: '#ffffff',
    primary: '#54345B',
    secondary: '#F58B00',
    tertiary: '#96749E',
    lightgreen: '#B8E06E',
    darkgreen: '#5FB923',
    lightred: '#F96989',
    darkred: '#6F1321',
    lightblue:'#78E6F7'
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
      bg: 'lightgreen',
      color: 'darkgreen',
      border: '3px solid',
      borderColor: 'darkgreen',
      cursor: 'pointer'
    },
    invisible: {
      bg: 'transparent',
      color: 'darkgreen',
      border: '0px solid',
      cursor: 'pointer'
    },
  },
};
