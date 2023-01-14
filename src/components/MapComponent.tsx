import React from "react";
import styled from "styled-components";
import { Map } from "../types/map";
type MapStyleProps = {};
const MapWrapper = styled.div<MapStyleProps>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  img {
    width: 20vw;
  }
`;
type MapProps = {
  map: Map;
  showMap: (map: Map) => void;
};
const MapComponent: React.FC<MapProps> = ({ map, showMap }) => {
  return (
    <MapWrapper onClick={() => showMap(map)}>
      <div>
        <div>{map.realm}</div>
        {map.names.map((mapName) => (
          <div>{mapName}</div>
        ))}
      </div>
    </MapWrapper>
  );
};
export default MapComponent;
