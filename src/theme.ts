import { DefaultTheme } from "styled-components";
import { Base, BodyText, Crust, Lavender, Mauve } from "./colors/catppucin";

const primaryColor = Base;
const primaryLight = Lavender;
const secondaryColor = BodyText;
const tertiaryColor = Crust;

const textColor = BodyText;
const pageHeaderTextColor = Mauve;
const headerTextColor = Lavender;

export const theme: DefaultTheme = {
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    neutral: "#fff",
    gradient: `linear-gradient(200deg, ${primaryLight},${primaryColor})`,
    gradientAccent: `linear-gradient(${primaryColor}, ${secondaryColor})`,
    gradientAccentRotated: `linear-gradient(20deg, ${primaryColor}, ${secondaryColor})`,
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
    medium: "10px 10px 13px 0px rgba(0,0,0,0.45);",
  },
  typography: {
    fontFamilyMono: "Roboto Mono",
    fontFamilyHandwritten: "",
    textVariants: {
      pageHeader: {
        fontWeight: "bold",
        fontSize: "3em",
        color: pageHeaderTextColor,
      },
      header: {
        fontWeight: "bold",
        fontSize: "2em",
        color: headerTextColor,
      },
      body: {
        fontWeight: "regular",
        fontSize: "1em",
        color: textColor,
      },
      small: {
        fontWeight: "regular",
        fontSize: "0.75em",
        color: textColor,
      },
    },
  },
};
