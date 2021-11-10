import React, {useState} from "react";
import styled from "@emotion/styled";
import ConfigurationPanel from "./components/ConfigurationPanel";
import MainChord from "./components/MainChord";
import {defaultParams, ChordDiagramParams, arrayToConfigurableChords, ConfigurableChord} from "./ChordDiagram";
// import { parseChords } from "./parser/parseChords";
// import camelCase from "camelcase";


const Main = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
    const [diagramConfiguration, setDiagramConfiguration] =
        useState<ChordDiagramParams>({...defaultParams, debugMode: false});
    const [chords, setChords] = useState<ConfigurableChord[]>(arrayToConfigurableChords(["C", "Cmaj7", "C7", "F", "F/E", "D", "G", "Amin", "A-maj7", "Am7", "Am6", "F", "Eb", "G", "C"]));
    const [currentChord, setCurrentChord] = useState<number>(0);
    // try {
    //   // TODO - use this
    //   const chordsFromText = parseChords("|" + chords.join(" ") + "|");
    //   chordsFromText.map((c: string) => camelCase(c, { pascalCase: true }));
    // } catch (error: any) {
    //   console.error(`can't parse chords`);
    // }


    return (
        <Main>
            <ConfigurationPanel
                chords={chords}
                setChords={setChords}
                diagramConfiguration={diagramConfiguration}
                setDiagramConfiguration={setDiagramConfiguration}
                currentChord={currentChord}
                setCurrentChord={setCurrentChord}
            />
            <MainChord
                diagramConfiguration={diagramConfiguration}
                chords={chords.map(chord => chord.chords[chord.selectedPosition - 1])}
                currentChord={currentChord}
                setCurrentChord={setCurrentChord}
            />
        </Main>
    );
}

export default App;
