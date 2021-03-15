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
  dark100: 'hsl(207, 26%, 17%)',
  dark200: 'hsl(209, 23%, 22%)',
  gray: 'hsl(0, 0%, 52%)',
  gray100: 'hsl(0, 0%, 98%)',
};

export const lightTheme = {
  background: colors.gray100,
  elements: colors.white,
  input: colors.gray,
  text: colors.dark,
};

export const darkTheme = {
  background: colors.dark100,
  elements: colors.dark200,
  input: colors.dark200,
  text: colors.white,
};

export const baseTheme = {
  fonts: {
    mainFont: `'Nunito Sans', sans-serif`,
  },
  semiBold: 600,
  bold: 700,
  fontSize: {
    xs: '1.2rem',
    s: '1.4rem',
    m: '1.6rem',
    ml: '2.2rem',
    lg: '3rem',
    xl: '5.4rem',
  },
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),
};
