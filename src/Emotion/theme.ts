export interface themeValue {
  [x: string | number]: string | number;
}
export interface themeType {
  [s: string]: themeValue;
}

const theme: themeType = {
  breakpoints: {
    sm: "20rem",
    md: "40rem",
    lg: "60rem",
    xl: "80rem",
  },
  colors: {
    "sprk.red": "#C8102E",
    "sprk.deep-red": "#76232F",
    "sprk.mid-red": "#9D2235",
    "sprk.purple": "#603AA1",
    "sprk.purple-dark": "#3C3174",
    "sprk.purple-deep": "#2E1166",
    "sprk.purple-light": "#9265D3",
    "sprk.purple-lightest": "#E7E2F2",
    "sprk.green": "#298540",
    "sprk.blue": "#1C6EF2",
    "sprk.orange": "#D47500",
    "sprk.pink": "#E50158",
    "sprk.yellow": "#EDA302",
    "sprk.white": "#FFFFFF",
    "sprk.black": "#1C1B1A",
  },
  fonts: {},
  space: {
    px: 1,
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  zIndex: {
    100: "modal",
    25: "main",
    30: "footer",
    50: "header",
  },
};

export default theme;
