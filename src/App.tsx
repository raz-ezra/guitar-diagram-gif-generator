import React, { useState } from 'react';
import styled from "@emotion/styled";
import ConfigurationPanel from "./components/ConfigurationPanel";
import MainChord from './components/MainChord';
import {defaultParams, ChordDiagramParams} from "./ChordDiagram"

const Main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {

    const [chords, setChords] = useState<any[]>([{note: "", type: ""}]);
    const [diagramConfiguration, setDiagramConfiguration] = useState<ChordDiagramParams>({...defaultParams, debugMode: true})

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
