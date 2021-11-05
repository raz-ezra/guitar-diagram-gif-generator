import React from 'react';
import styled from "@emotion/styled";
import DiagramConfiguration from "./DiagramConfiguration";
import ChordsSequence from "./ChordsSequence";
import BasicTabs from './layout/BasicTabs';
import {ChordDiagramParams} from "../ChordDiagram";

const Wrapper = styled.div`
  height: 100%;
  width: 30vw;
`;

type ConfigurationPanelProps = {
    chords: any[];
    setChords:  (chords: any[]) => void;
    diagramConfiguration: ChordDiagramParams;
    setDiagramConfiguration: (configuration: ChordDiagramParams) => void;
}

function ConfigurationPanel(props: ConfigurationPanelProps) {

    return (
        <Wrapper>
            <BasicTabs
                tabs={[
                    {
                        title: "Diagram Configuration",
                        content: <DiagramConfiguration
                            diagramConfiguration={props.diagramConfiguration}
                            setDiagramConfiguration={props.setDiagramConfiguration}

                        />
                    },
                    {
                        title: "Chords Sequence",
                        content: <ChordsSequence chords={props.chords} setChords={props.setChords} />
                    }
                ]}
            />
        </Wrapper>
    );
}

export default ConfigurationPanel;
