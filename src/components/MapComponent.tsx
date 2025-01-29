import React from "react";
import styled, { css } from "styled-components";
import { DBDMap } from "../types/map";
import TextComponent, { TextVariant } from "./Text";

const RealmWrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.large};
    border: 1px solid ${theme.colors.tertiary};
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.boxshadows.medium};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.medium};
    .map-entry {
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        text-decoration: underline;
      }
    }
  `}
`;

const MapListWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.spacing.medium};
    li::marker {
      color: ${theme.colors.secondary};
    }
  `}
`;

type MapProps = {
  maps: DBDMap[];
  realmName: string;
  showMap: (map: DBDMap) => void;
};
const RealmComponent: React.FC<MapProps> = ({ maps, realmName, showMap }) => {
  const [first5, rest] = [maps.slice(0, 5), maps.slice(5)];
  return (
    <RealmWrapper>
      <TextComponent variant={TextVariant.HEADER}>{realmName}</TextComponent>
      <MapListWrapper>
        <ul>
          {first5.map((map) => (
            <li
              className={"map-entry"}
              key={map.names[0]}
              onClick={() => showMap(map)}
            >
              <TextComponent variant={TextVariant.BODY}>
                {map.names[0]}
              </TextComponent>
            </li>
          ))}
        </ul>
        <ul>
          {rest.map((map) => (
            <li
              className={"map-entry"}
              key={map.names[0]}
              onClick={() => showMap(map)}
            >
              <TextComponent variant={TextVariant.BODY}>
                {map.names[0]}
              </TextComponent>
            </li>
          ))}
        </ul>
      </MapListWrapper>
    </RealmWrapper>
  );
};
export default RealmComponent;
