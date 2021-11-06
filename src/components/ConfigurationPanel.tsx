import React from "react";
import styled from "@emotion/styled";
import DiagramConfiguration from "./DiagramConfiguration";
import ChordsSequence from "./ChordsSequence";
import BasicTabs from "./layout/BasicTabs";
import { ChordDiagramParams, ChordConfiguration } from "../ChordDiagram";

const Wrapper = styled.div`
  height: 100%;
  width: 30vw;
`;

type ConfigurationPanelProps = {
  chords: ChordConfiguration[];
  setChords: (chords: ChordConfiguration[]) => void;
  diagramConfiguration: ChordDiagramParams;
  setDiagramConfiguration: (configuration: ChordDiagramParams) => void;
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
