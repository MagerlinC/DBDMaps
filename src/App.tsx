import styled, { ThemeProvider } from "styled-components";
import "./responsive.css";
import "./normalize.css";
import "./scroll.css";
import "./animations.css";
import { theme } from "./theme";
import MapList from "./components/MapList";
import TextComponent, { TextVariant } from "./components/Text";
import { useState } from "react";
import MapJSON from "./maps.json";
import { DBDMap } from "./types/map";

const ApplicationWrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.large};
    margin: 0;
    padding: ${theme.spacing.large};
    background-color: ${theme.colors.primary};
    min-height: 100vh;
    height: 100vh;
    overflow-x: hidden;
    color: ${theme.colors.textPrimary};
    font-family: ${theme.typography.fontFamilyMono};
    header {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100%;
      gap: ${theme.spacing.large};
    }
    input {
      margin: 8px;
      padding: 8px;
      border-radius: 8px;
      border: none;
      :focus {
        border: none;
      }
    }
  `}
`;

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const maps = MapJSON.maps;
  const mapsByRealm = new Map<string, DBDMap[]>();

  const isMatch = (map: DBDMap, searchString: string) => {
    const realmMatch = map.realm
      .toLowerCase()
      .includes(searchString.toLowerCase());
    const mapNameMatch = map.names.some((mapName) =>
      mapName.toLowerCase().includes(searchString.toLowerCase())
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
          <input
            autoFocus
            value={searchString}
            onKeyDown={(e) =>
              e.key === "Escape" ? setSearchString("") : undefined
            }
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="search..."
          />
        </header>
        <MapList mapsByRealm={mapsByRealm} />
      </ApplicationWrapper>
    </ThemeProvider>
  );
}

export default App;
