import { DefaultTheme } from "styled-components";

const primaryColor = "rgb(37, 42, 54)";
const primaryLight = "rgb(211, 211, 205)";
const secondaryColor = "rgb(205, 167, 135)";
const tertiaryColor = "rgb(110, 79, 71)";

export const theme: DefaultTheme = {
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    neutral: "#fff",
    gradient: `linear-gradient(200deg, ${primaryLight},${primaryColor})`,
    gradientAccent: `linear-gradient(${primaryColor}, ${secondaryColor})`,
    gradientAccentRotated: `linear-gradient(20deg, ${primaryColor}, ${secondaryColor})`,
    textPrimary: secondaryColor,
    textSecondary: tertiaryColor,
    textTertiary: "#fff",
  },
  spacing: {
    small: "4px",
    medium: "8px",
    large: "16px",
    xlarge: "32px",
  },
  borderRadius: {
    small: "4px",
    medium: "6px",
    large: "8px",
  },
  boxshadows: {
    medium: "8px 8px 19px -7px rgba(0,0,0,0.67)",
  },
  typography: {
    fontFamilyMono: "Roboto Mono",
    fontFamilyHandwritten: "",
    textVariants: {
      pageHeader: {
        fontWeight: "bold",
        fontSize: "3em",
      },
      header: {
        fontWeight: "bold",
        fontSize: "2em",
      },
      body: {
        fontWeight: "regular",
        fontSize: "1em",
      },
      small: {
        fontWeight: "regular",
        fontSize: "0.75em",
      },
    },
  },
};
