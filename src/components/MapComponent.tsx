import React from "react";
import styled from "styled-components";
import { DBDMap } from "../types/map";
import TextComponent, { TextVariant } from "./Text";
type MapStyleProps = {};
const RealmWrapper = styled.div<MapStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  img {
    width: 20vw;
  }
  .map-entry {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
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
      {maps.map((map) => (
        <div
          className={"map-entry"}
          key={map.names[0]}
          onClick={() => showMap(map)}
        >
          {map.names[0]}
        </div>
      ))}
    </RealmWrapper>
  );
};
export default RealmComponent;
