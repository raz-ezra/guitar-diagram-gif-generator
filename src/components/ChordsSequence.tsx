import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import ChordConfigurationPanel from "./ChordConfigurationPanel";
import TextField from "@mui/material/TextField";
import { arrayToChords, Chord, ChordConfiguration, getEmptyChordConfigiration, getEmptyChordObject } from "../ChordDiagram";

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
  chordsConfigurations: ChordConfiguration[];
  setChordsConfigurations: (chords: ChordConfiguration[]) => void;
};

function ChordsSequence(props: ConfigurationPanelProps) {
  const handleChange = (chord: ChordConfiguration, index: number) => {
    const newChords = [...props.chordsConfigurations];
    newChords[index] = chord;
    props.setChordsConfigurations(newChords);
  };

  const addChord = () => {
    props.setChordsConfigurations([...props.chordsConfigurations, getEmptyChordConfigiration()]);
  };

  const removeChord = (index: number) => {
    const newChords = [...props.chordsConfigurations];
    newChords.splice(index, 1);
    props.setChordsConfigurations(newChords);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const chordArray = e.target.value === "" ? [""] : e.target.value.replace("\n", " ").split(" ");
    props.setChordsConfigurations(arrayToChords(chordArray));
}

  return (
    <>
      <InputWrapper>
        <StyledTextField
          label={"Chord Sequence Text Input"}
          value={props.chordsConfigurations.map(config => config.chord.title).join(" ")}
          onChange={handleTextChange}
          multiline
        />
      </InputWrapper>
      {props.chordsConfigurations.map((config, index) => (
        <ChordConfigurationPanel
          key={index}
          index={index}
          chordConfiguration={config}
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
