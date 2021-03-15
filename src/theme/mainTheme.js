const breakpoints = {
  xs: 420,
  s: 576,
  md: 768,
  lg: 992,
  xl: 1440,
};

const colors = {
  white: 'hsl(0, 0%, 100%)',
  dark: 'hsl(200, 15%, 8%)',
  blue: 'hsl(201, 100%, 81%)',
  dark100: 'hsl(230, 17%, 14%)',
  dark200: 'hsl(228, 28%, 20%)',
  gray: 'hsl(0, 0%, 52%)',
  gray100: 'hsl(0, 0%, 98%)',
};

export const lightTheme = {
  background: colors.gray100,
  element: colors.white,
  input: colors.gray,
  text: colors.dark,
};

export const darkTheme = {
  background: colors.dark100,
  element: colors.dark200,
  input: colors.gray,
  text: colors.white,
};

export const baseTheme = {
  fonts: {
    mainFont: `'Comfortaa', cursive`,
    subFont: `'PT Sans', sans-serif`,
  },
  light: 300,
  semiBold: 500,
  bold: 700,
  blue: colors.blue,
  fontSize: {
    xs: '1.2rem',
    s: '1.4rem',
    m: '1.6rem',
    lg: '2rem',
    xl: '2.4rem',
  },
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),
};
