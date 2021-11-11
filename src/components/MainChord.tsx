import React, {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {Chord, ChordDiagram, ChordDiagramParams} from "../ChordDiagram";
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
    setCurrentChord: (index: number | null) => void;
    currentChord: number | null;
};

function MainChord({diagramConfiguration, chords, setCurrentChord, currentChord}: MainChordProps) {
    const diagramWrapper = useRef<HTMLDivElement>(null);
    const chordDiagram = useRef<ChordDiagram | null>(null);
    const [playButtonText, setPlayButtonText] = useState<string>("Play");

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
        if (chordDiagram.current !== null && !chordDiagram.current.isPlaying) {
            if (chordDiagram.current && chordDiagram.current.getCurrentChord() && chordDiagram.current.getCurrentChord()! > chords.length) {
                chordDiagram.current.moveToChordInSequence(null, true);
            }
            chordDiagram.current.setChords(chords);
        }
    }, [chords]);

    useEffect(() => {
        if (chordDiagram.current !== null && !chordDiagram.current.isPlaying) {
            chordDiagram.current.moveToChordInSequence(currentChord, true);
        }
    }, [currentChord])

    const handleMoveChord = (direction: number) => {
        if (chordDiagram.current !== null && !chordDiagram.current.isPlaying) {
            direction === 1 ?
                setCurrentChord(chordDiagram.current.moveToNextChord(true)) :
                setCurrentChord(chordDiagram.current.moveToPreviousChord(true));
        }
    };

    const handlePlay = () => {
        if (chordDiagram.current !== null) {
            if (chordDiagram.current?.isPlaying) {
                chordDiagram.current.stopSequence(true, setCurrentChord);
                setPlayButtonText("Play")
            } else {
                chordDiagram.current.playSequence(null, true, setCurrentChord, () => setPlayButtonText("Play"))
                setPlayButtonText("Stop")

            }
        }
    }

    return (
        <MainChordWrapper>
            <ChordDiagramWrapper
                id={"main-chord-diagram-wrapper"}
                ref={diagramWrapper}
                debugMode={diagramConfiguration.debugMode}
            />
            <BottomContainer>
                <ButtonContainer>
                    <Button onClick={() => handleMoveChord(-1)} variant="contained" disabled={chordDiagram.current?.isPlaying}>
                        &lt;-- Previous Chord
                    </Button>
                    <Button onClick={handlePlay} variant="contained">
                        {playButtonText}
                    </Button>
                    <Button onClick={() => handleMoveChord(1)} variant="contained" disabled={chordDiagram.current?.isPlaying}>Next Chord --&gt;</Button>
                </ButtonContainer>
                <ChordIndex>
                    {"Current chord: "}
                    <span>
                        {chordDiagram.current?.getCurrentChord() || chordDiagram.current?.getCurrentChord() === 0 ?
                            chordDiagram.current?.getCurrentChord()! + 1 :
                            "Empty"
                        }
                    </span>
                </ChordIndex>
            </BottomContainer>

        </MainChordWrapper>
    );
}

export default MainChord;
