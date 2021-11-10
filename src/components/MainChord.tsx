import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Chord, ChordDiagram, ChordDiagramParams } from "../ChordDiagram";
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
  chords: Chord[];
  currentChord: number;
  setCurrentChord: (index: number) => void;
};

function MainChord({diagramConfiguration, chords, currentChord, setCurrentChord}: MainChordProps) {
  const diagramWrapper = useRef<HTMLDivElement>(null);
  const chordDiagram = useRef<ChordDiagram | null>(null);


  useEffect(() => {
    if (diagramWrapper.current) {
      diagramWrapper.current.innerHTML = "";
      chordDiagram.current = new ChordDiagram(
        "#main-chord-diagram-wrapper",
        diagramConfiguration
      );
    }

    if (chordDiagram.current) {
      chordDiagram.current.drawBaseDiagram();
    }
  }, [diagramConfiguration]);

  useEffect(() => {
    const chord = chords[currentChord];
    if (currentChord === -1 ) {
      setCurrentChord(0);
    }
    if (chordDiagram.current !== null) {
      if (chord) {
        chordDiagram.current.drawChord(chord, true);
      } else {
        // TODO - Show the user that the chord is invalid
      }
    }

  }, [chords, currentChord, setCurrentChord]);

  const handleMoveChord = (direction: number) => {
    if (currentChord + direction < 0) {
      setCurrentChord(chords.length - 1);
    } else if (currentChord + direction === chords.length) {
      setCurrentChord(0);
    } else if (chords.length === 1) {
      setCurrentChord(-1);
    } else {
      setCurrentChord(currentChord + direction);
    }
  };

  return (
    <MainChordWrapper>
      <ChordDiagramWrapper
        id={"main-chord-diagram-wrapper"}
        ref={diagramWrapper}
        debugMode={diagramConfiguration.debugMode}
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
