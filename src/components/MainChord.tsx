import React, {useEffect, useRef} from "react";
import styled from "@emotion/styled";
import {Chord, ChordDiagram, ChordDiagramParams, getEmptyChordObject} from "../ChordDiagram";
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 20px;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ChordIndex = styled.div`
    text-align: center;
    color: #1976d2;
  
    & span {
      font-weight: 500;
    }
`

const ChordDiagramWrapper = styled.div<{ debugMode: boolean | undefined }>`
  ${({debugMode}) => (debugMode ? "border: 1px solid red;" : null)}
`;

type MainChordProps = {
    diagramConfiguration: ChordDiagramParams;
    chords: Chord[];
    currentChord: number | null;
    setCurrentChord: (index: number | null) => void;
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
        const chord = (currentChord || currentChord === 0) && chords[currentChord];
        if (chordDiagram.current !== null) {
            if (chord) {
                chordDiagram.current.drawChord(chord, true);
            } else {
                chordDiagram.current.drawChord(getEmptyChordObject(), true);
            }
        }

    }, [chords, currentChord]);

    const handleMoveChord = (direction: number) => {
        if ((!currentChord && currentChord !== 0) && direction === -1) {
            setCurrentChord(chords.length - 1);
        } else if ((!currentChord && currentChord !== 0) && direction === 1) {
            setCurrentChord(0);
        } else if ((currentChord || currentChord === 0) && (currentChord + direction === chords.length || currentChord + direction < 0)) {
            setCurrentChord(null);
        } else {
            setCurrentChord(currentChord! + direction);
        }
    };

    return (
        <MainChordWrapper>
            <ChordDiagramWrapper
                id={"main-chord-diagram-wrapper"}
                ref={diagramWrapper}
                debugMode={diagramConfiguration.debugMode}
            />
            <BottomContainer>
                <ButtonContainer>
                    <Button onClick={() => handleMoveChord(-1)} variant="contained">
                        &lt;-- Previous Chord
                    </Button>
                    <Button onClick={() => handleMoveChord(1)} variant="contained">Next Chord --&gt;</Button>
                </ButtonContainer>
                <ChordIndex>
                    Current chord: <span>{currentChord || currentChord === 0 ? currentChord + 1 : "Empty"}</span>
                </ChordIndex>
            </BottomContainer>

        </MainChordWrapper>
    );
}

export default MainChord;
