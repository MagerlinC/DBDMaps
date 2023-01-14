import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import RealmComponent from "./MapComponent";
import { DBDMap } from "../types/map";
import PortalWrapper from "./PortalWrapper";
import DynamicImage from "./DynamicImage";

const MapListWrapper = styled.div`
  ${({ theme }) => css`
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
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: ${theme.spacing.medium};
      width: 40vw;
      height: 40vh;
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
};
const MapList: React.FC<MapListProps> = ({ mapsByRealm }) => {
  const [shownMap, setShownMap] = useState<DBDMap>();
  const realms = Array.from(mapsByRealm.keys());
  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && shownMap) {
      setShownMap(undefined);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", closeOnEscape);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
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
