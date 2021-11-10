import React from "react";
import styled from "@emotion/styled";
import DiagramConfiguration from "./DiagramConfiguration";
import ChordsSequence from "./ChordsSequence";
import BasicTabs from "./layout/BasicTabs";
import {ChordDiagramParams, ConfigurableChord} from "../ChordDiagram";

const Wrapper = styled.div`
  height: 100%;
  width: 30vw;
`;

type ConfigurationPanelProps = {
    chords: ConfigurableChord[];
    setChords: (chords: ConfigurableChord[]) => void;
    diagramConfiguration: ChordDiagramParams;
    setDiagramConfiguration: (configuration: ChordDiagramParams) => void;
    currentChord: number;
    setCurrentChord: (index: number) => void;
};

function ConfigurationPanel(props: ConfigurationPanelProps) {
    return (
        <Wrapper>
            <BasicTabs
                tabs={[
                    {
                        title: "Chords Sequencer",
                        content: (
                            <ChordsSequence
                                chordsConfigurations={props.chords}
                                setChordsConfigurations={props.setChords}
                                currentChord={props.currentChord}
                                setCurrentChord={props.setCurrentChord}
                            />
                        ),
                    },
                    {
                        title: "Diagram Configuration",
                        content: (
                            <DiagramConfiguration
                                diagramConfiguration={props.diagramConfiguration}
                                setDiagramConfiguration={props.setDiagramConfiguration}
                            />
                        ),
                    }
                ]}
            />
        </Wrapper>
    );
}

export default ConfigurationPanel;
