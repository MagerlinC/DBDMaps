import styled, { ThemeProvider } from "styled-components";
import "./responsive.css";
import "./normalize.css";
import "./scroll.css";
import "./animations.css";
import { theme } from "./theme";
import MapList from "./components/MapList";
import TextComponent, { TextVariant } from "./components/Text";
import React, { useEffect, useState } from "react";
import MapJSON from "./maps.json";
import { DBDMap } from "./types/map";

const ApplicationWrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.small};
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.primary};
    min-height: 100vh;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    color: ${theme.colors.textPrimary};
    font-family: ${theme.typography.fontFamilyMono};
    header {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: ${theme.spacing.medium};
      padding: ${theme.spacing.small} ${theme.spacing.large};
      .reference {
        opacity: 0.8;
        position: absolute;
        top: ${theme.spacing.small};
        right: ${theme.spacing.large};
      }
    }
    input {
      padding: 8px;
      border-radius: 8px;
      border: none;
      :focus {
        border: none;
      }
    }
    a:visited {
      color: ${theme.colors.secondary};
    }
  `}
`;

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const [shownMap, setShownMap] = useState<DBDMap>();
  const maps = MapJSON.maps;
  const mapsByRealm = new Map<string, DBDMap[]>();

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscape);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const handleInputKeydown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        setSearchString("");
        break;
      case "Enter":
        if (searchString) {
          const firstRealm = Array.from(mapsByRealm.keys())[0];
          const firstRealmMaps = mapsByRealm.get(firstRealm);
          if (firstRealmMaps) {
            setShownMap(firstRealmMaps[0]);
          }
        }
        break;
    }
  };

  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShownMap(undefined);
    }
  };

  const searchMatch = (mapName: string, searchString: string) => {
    if (searchString.includes(" ")) {
      const searchWords = searchString.split(" ");
      const mapNameParts = mapName.split(" ");
      return searchWords.every((word) =>
        mapNameParts.some((part) =>
          part.toLowerCase().includes(word.toLowerCase())
        )
      );
    }
    return mapName.toLowerCase().includes(searchString.toLowerCase());
  };

  const isMatch = (map: DBDMap, searchString: string) => {
    const realmMatch = searchMatch(map.realm, searchString);
    const mapNameMatch = map.names.some((mapName) =>
      searchMatch(mapName, searchString)
    );
    return realmMatch || mapNameMatch;
  };

  maps.forEach((map) => {
    if (searchString == "" || isMatch(map, searchString)) {
      const curr = mapsByRealm.get(map.realm);
      if (curr) {
        mapsByRealm.set(map.realm, [...curr, map]);
      } else {
        mapsByRealm.set(map.realm, [map]);
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ApplicationWrapper>
        <header>
          <TextComponent variant={TextVariant.PAGEHEADER}>
            Dead by Daylight Callout Maps
          </TextComponent>
          <TextComponent className={"reference"} variant={TextVariant.BODY}>
            Maps by <a href="https://www.youtube.com/@hens333">Hens333</a>
          </TextComponent>
          <input
            autoFocus
            value={searchString}
            onKeyDown={handleInputKeydown}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="search here - press enter to select first result"
          />
        </header>
        <MapList
          mapsByRealm={mapsByRealm}
          setShownMap={setShownMap}
          shownMap={shownMap}
        />
      </ApplicationWrapper>
    </ThemeProvider>
  );
}

export default App;
