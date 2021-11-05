import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import ChordConfiguration from "./ChordConfiguration";
import TextField from "@mui/material/TextField";

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const StyledTextField = styled(TextField)`
  background-color: rgba(25, 118, 210, 0.1);
`;

type ConfigurationPanelProps = {
  chords: string[];
  setChords: (chords: string[]) => void;
};

function ChordsSequence(props: ConfigurationPanelProps) {
  const handleChange = (chord: string, index: number) => {
    const newChords = [...props.chords];
    newChords[index] = chord;
    props.setChords(newChords);
  };

  const addChord = () => {
    props.setChords([...props.chords, ""]);
  };

  const removeChord = (index: number) => {
    const newChords = [...props.chords];
    newChords.splice(index, 1);
    props.setChords(newChords);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setChords(e.target.value === "" ? [""] : e.target.value.split(" "));
}

  return (
    <>
      <InputWrapper>
        <StyledTextField
          label={"Chord Sequence Text Input"}
          value={props.chords.join(" ")}
          onChange={handleTextChange}
        />
      </InputWrapper>
      {props.chords.map((chord, index) => (
        <ChordConfiguration
          key={`${index}_${chord}`}
          index={index}
          chord={chord}
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
