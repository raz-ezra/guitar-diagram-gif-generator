import React, { useState } from "react";
import styled from "@emotion/styled";
import ConfigurationPanel from "./components/ConfigurationPanel";
import MainChord from "./components/MainChord";
import { defaultParams, ChordDiagramParams } from "./ChordDiagram";
import { ChordsInput } from "./components/ChordsInput";
import { parseChords } from "./parser/parseChords";
import camelCase from "camelcase";

const Main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  const [chords, setChords] = useState<string[]>(["C"]);
  const [chordsText, setChordsText] = useState<string>("C");

  try {
    const chordsFromText = parseChords("|" + chordsText + "|");
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
      <div>
        <ChordsInput chordsText={chordsText} setChordsText={setChordsText}/>
        <MainChord
          diagramConfiguration={diagramConfiguration}
          chords={chords}
        />
      </div>
    </Main>
  );
}

export default App;
