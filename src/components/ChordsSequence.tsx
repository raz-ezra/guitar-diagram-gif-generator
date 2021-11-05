import React from "react";
import styled from "@emotion/styled";
import ChordConfiguration from "./ChordConfiguration";

const StyledButton = styled.button`
  padding: 5px;
  align-self: flex-end;
  background-color: #ffffff;
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #eeeeee 30%);
  padding: 30px 20px 20px;
  display: flex;
  justify-content: flex-end;
`;

type ConfigurationPanelProps = {
  chords: any[];
  setChords: (chords: any[]) => void;
};

function ChordsSequence(props: ConfigurationPanelProps) {
  const handleChange = (chord: any, index: number) => {
    const newChords = [...props.chords];
    newChords[index] = chord;
    props.setChords(newChords);
  };

  const addChord = () => {
    props.setChords([...props.chords, { note: "", type: "" }]);
  };

  const removeChord = (index: number) => {
    const newChords = [...props.chords];
    newChords.splice(index, 1);
    props.setChords(newChords);
  };

  return (
    <>
      {props.chords.map((chord, index) => (
        <ChordConfiguration
          key={index}
          index={index}
          note={chord.note}
          type={chord.type}
          onChange={handleChange}
          removeChord={removeChord}
        />
      ))}
      <ButtonWrapper>
        <StyledButton onClick={addChord}>+Add Chord</StyledButton>
      </ButtonWrapper>
    </>
  );
}

export default ChordsSequence;
