import React, { useState } from "react";
import styled from "@emotion/styled";
import ConfigurationPanel from "./components/ConfigurationPanel";
import MainChord from "./components/MainChord";
import { defaultParams, ChordDiagramParams } from "./ChordDiagram";
import { parseChords } from "./parser/parseChords";
import camelCase from "camelcase";

const Main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  const [chords, setChords] = useState<string[]>(["C", "Cmaj7", "C7", "F", "F/E", "D", "G", "Amin", "A-maj7", "Am7", "A-6", "F", "Eb", "G", "C"]);

  try {
    // TODO - use this
    const chordsFromText = parseChords("|" + chords.join(" ") + "|");
    chordsFromText.map((c: string) => camelCase(c, { pascalCase: true }));
  } catch (error: any) {
    console.error(`can't parse chords`);
  }
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
        chords={chords}
      />
    </Main>
  );
}

export default App;
