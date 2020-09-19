export default {
  fonts: {
    body: '"Nunito", sans-serif',
    heading: '"Germania One", cursive',
    symbol: '"M PLUS Rounded 1c", sans-serif'
  },
  fontSizes: {
        'tiny': 14,
        'small': 16,
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
    lightblue:'#78E6F7',
    darkorange:'#DE640B',
    canary:'#FAC50D',
    lavender:'#C497CF',
    olive:'#50612F'
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
    nope: {
      bg: 'transparent',
      color: 'muted',
      border: '3px solid',
      borderColor: 'tertiary',
      cursor: 'not-allowed'
    },
    outline: {
      bg: 'transparent',
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
