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
      gap: ${theme.spacing.large};
    }
    input {
      padding: 8px;
      border-radius: 8px;
      border: none;
      flex: 0;
      :focus {
        border: none;
      }
    }
  `}
`;

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const maps = MapJSON.maps;
  const filteredMaps = searchString
    ? maps.filter((map) =>
        map.realm.toLowerCase().includes(searchString.toLowerCase())
      )
    : maps;
  return (
    <ThemeProvider theme={theme}>
      <ApplicationWrapper>
        <header>
          <TextComponent variant={TextVariant.HEADER}>
            Dead by Daylight Callout Maps
          </TextComponent>
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="search..."
          />
        </header>
        <MapList maps={filteredMaps} />
      </ApplicationWrapper>
    </ThemeProvider>
  );
}

export default App;
