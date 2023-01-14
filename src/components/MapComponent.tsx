import React from "react";
import styled, { css } from "styled-components";
import { DBDMap } from "../types/map";
import TextComponent, { TextVariant } from "./Text";
type MapStyleProps = {};
const RealmWrapper = styled.div<MapStyleProps>`
  ${({ theme }) => css`
    padding: 8px;
    border: 1px solid ${theme.colors.tertiary};
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.boxshadows.medium};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.medium};
    img {
      width: 20vw;
    }
    .map-entry {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  `}
`;
type MapProps = {
  maps: DBDMap[];
  realmName: string;
  showMap: (map: DBDMap) => void;
};
const RealmComponent: React.FC<MapProps> = ({ maps, realmName, showMap }) => {
  return (
    <RealmWrapper>
      <TextComponent variant={TextVariant.HEADER}>{realmName}</TextComponent>
      <ul>
        {maps.map((map) => (
          <li
            className={"map-entry"}
            key={map.names[0]}
            onClick={() => showMap(map)}
          >
            {map.names[0]}
          </li>
        ))}
      </ul>
    </RealmWrapper>
  );
};
export default RealmComponent;
