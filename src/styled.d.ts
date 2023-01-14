import "styled-components";

declare module "styled-components" {
  type Typography = {
    fontWeight: string;
    fontSize: string;
  };
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      neutral: string;
      gradient: string;
      gradientAccent: string;
      gradientAccentRotated: string;
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
    boxshadows: {
      medium: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    typography: {
      fontFamilyMono: string;
      fontFamilyHandwritten: string;
      textVariants: {
        pageHeader: Typography;
        header: Typography;
        body: Typography;
        small: Typography;
      };
    };
  }
}
