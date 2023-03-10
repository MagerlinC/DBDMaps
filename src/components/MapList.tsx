import React from "react";
import styled, { css } from "styled-components";
import RealmComponent from "./MapComponent";
import { DBDMap } from "../types/map";
import PortalWrapper from "./PortalWrapper";
import DynamicImage from "./DynamicImage";

const MapListWrapper = styled.div`
  ${({ theme }) => css`
    padding: 8px ${theme.spacing.large};
    max-height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${theme.spacing.medium};
  `}
`;

const ShownMapModal = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .modal-contents {
      position: relative;
      top: 40%;
      transform: translateY(-50%);
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: ${theme.spacing.medium};
      img {
        position: relative;
        top: 60%;
        transform: translateY(-50%);
        width: max(40vh, 40vw);
      }
      button {
        position: absolute;
        right: 25%;
        border-radius: 4px;
        border: none;
        padding: 4px 16px;
        background-color: ${theme.colors.secondary};
      }
    }
    .opacity-layer {
      z-index: 2;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.25);
    }

    img {
      width: 100%;
    }
  `}
`;

type MapListProps = {
  mapsByRealm: Map<string, DBDMap[]>;
  setShownMap: (map: DBDMap | undefined) => void;
  shownMap?: DBDMap;
};
const MapList: React.FC<MapListProps> = ({
  mapsByRealm,
  setShownMap,
  shownMap,
}) => {
  const realms = Array.from(mapsByRealm.keys()).sort();

  return (
    <MapListWrapper>
      {realms.map((realm) => (
        <RealmComponent
          key={realm}
          realmName={realm}
          maps={mapsByRealm.get(realm) || []}
          showMap={(map) => setShownMap(map)}
        />
      ))}
      {shownMap && (
        <PortalWrapper>
          <ShownMapModal tabIndex={0} onKeyDown={() => setShownMap(undefined)}>
            <div
              className={"opacity-layer"}
              onClick={() => setShownMap(undefined)}
            />
            <div className={"modal-contents"}>
              <DynamicImage fileName={shownMap.image} alt={shownMap.image} />
            </div>
          </ShownMapModal>
        </PortalWrapper>
      )}
    </MapListWrapper>
  );
};
export default MapList;
