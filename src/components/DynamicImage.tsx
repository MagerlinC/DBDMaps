import React from "react";
import styled from "styled-components";
import TextComponent, { TextVariant } from "./Text";
import useImage from "./UseImage";
type DynamicImageStyleProps = {};
const DynamicImageWrapper = styled.div<DynamicImageStyleProps>``;
type DynamicImageProps = {
  fileName: string;
  alt: string;
};
const DynamicImage: React.FC<DynamicImageProps> = ({ fileName, alt }) => {
  const { loading, error, image } = useImage(fileName);

  if (error)
    return <TextComponent variant={TextVariant.SMALL}>{alt}</TextComponent>;

  return (
    <>
      {loading ? (
        <TextComponent variant={TextVariant.SMALL}>loading</TextComponent>
      ) : (
        <img src={image} alt={alt} />
      )}
    </>
  );
};
export default DynamicImage;
