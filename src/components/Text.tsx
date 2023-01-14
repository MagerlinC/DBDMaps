import React, { ReactNode } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components";

export enum TextVariant {
  PAGEHEADER,
  HEADER,
  BODY,
  SMALL,
}

const getStyleForVariant = (variant: TextVariant, theme: DefaultTheme) => {
  switch (variant) {
    case TextVariant.PAGEHEADER:
      return theme.typography.textVariants.pageHeader;
    case TextVariant.HEADER:
      return theme.typography.textVariants.header;
    case TextVariant.BODY:
      return theme.typography.textVariants.body;
    case TextVariant.SMALL:
      return theme.typography.textVariants.small;
  }
};

const TextWrapper = styled.p``;

type TextProps = {
  variant: TextVariant;
  children: ReactNode;
  className?: string;
};
const TextComponent: React.FC<
  TextProps & React.HTMLProps<HTMLParagraphElement>
> = ({ variant, children, className, onAnimationEnd }) => {
  const theme = useTheme();
  return (
    <TextWrapper
      className={className}
      style={getStyleForVariant(variant, theme)}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </TextWrapper>
  );
};
export default TextComponent;
