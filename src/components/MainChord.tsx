import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { ChordDiagram, ChordDiagramParams, stringToChord } from "../ChordDiagram";
import Button from "@mui/material/Button";

const MainChordWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

const ChordDiagramWrapper = styled.div<{ debugMode: boolean | undefined }>`
  ${({ debugMode }) => (debugMode ? "border: 1px solid red;" : null)}
`;

type MainChordProps = {
  diagramConfiguration: ChordDiagramParams;
  chords: string[];
};

function MainChord(props: MainChordProps) {
  const diagramWrapper = useRef<HTMLDivElement>(null);
  const chordDiagram = useRef<ChordDiagram | null>(null);
  const [currentChord, setCurrentChord] = useState<number>(0);

  useEffect(() => {
    if (diagramWrapper.current) {
      diagramWrapper.current.innerHTML = "";
      chordDiagram.current = new ChordDiagram(
        "#main-chord-diagram-wrapper",
        props.diagramConfiguration
      );
    }

    if (chordDiagram.current) {
      chordDiagram.current.drawBaseDiagram();
    }
  }, [props.diagramConfiguration]);

  useEffect(() => {
    if (chordDiagram.current !== null) {
      const chord = props.chords[currentChord];
      const chordModel = stringToChord(chord);
      if (chordModel) {
        chordDiagram.current.drawChord(chordModel, chord, true);
      } else {
        // TODO - Show the user that the chord is invalid
      }
    }

  }, [props.chords[currentChord]]);

  const handleMoveChord = (direction: number) => {
    if (currentChord + direction < 0) {
      setCurrentChord(props.chords.length - 1);
    } else if (currentChord + direction === props.chords.length) {
      setCurrentChord(0);
    } else {
      setCurrentChord(currentChord + direction);
    }
  };

  return (
    <MainChordWrapper>
      <ChordDiagramWrapper
        id={"main-chord-diagram-wrapper"}
        ref={diagramWrapper}
        debugMode={props.diagramConfiguration.debugMode}
      />
      <ButtonContainer>
        <Button onClick={() => handleMoveChord(-1)}>
          &lt;-- Previous Chord
        </Button>
        <Button onClick={() => handleMoveChord(1)}>Next Chord --&gt;</Button>
      </ButtonContainer>
    </MainChordWrapper>
  );
}

export default MainChord;
