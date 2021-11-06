import React, { useState } from "react";
import styled from "@emotion/styled";
import ConfigurationPanel from "./components/ConfigurationPanel";
import MainChord from "./components/MainChord";
import { defaultParams, ChordDiagramParams, arrayToConfigurableChords, ConfigurableChord } from "./ChordDiagram";
// import { parseChords } from "./parser/parseChords";
// import camelCase from "camelcase";


const Main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  const [chords, setChords] = useState<ConfigurableChord[]>(arrayToConfigurableChords(["C", "Cmaj7", "C7", "F", "F/E", "D", "G", "Amin", "A-maj7", "Am7", "A-6", "F", "Eb", "G", "C"]));

  // try {
  //   // TODO - use this
  //   const chordsFromText = parseChords("|" + chords.join(" ") + "|");
  //   chordsFromText.map((c: string) => camelCase(c, { pascalCase: true }));
  // } catch (error: any) {
  //   console.error(`can't parse chords`);
  // }
  const [diagramConfiguration, setDiagramConfiguration] =
    useState<ChordDiagramParams>({ ...defaultParams, debugMode: false });

  return (
    <Main>
      <ConfigurationPanel
        chords={chords}
        setChords={setChords}
        diagramConfiguration={diagramConfiguration}
        setDiagramConfiguration={setDiagramConfiguration}
      />
      <MainChord
        diagramConfiguration={diagramConfiguration}
        chords={chords.map(chord => chord.chords[chord.selectedPosition - 1])}
      />
    </Main>
  );
}

export default App;
