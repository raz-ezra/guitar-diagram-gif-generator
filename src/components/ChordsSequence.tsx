import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ChordConfigurationPanel from "./ChordConfigurationPanel";
import TextField from "@mui/material/TextField";
import { arrayToConfigurableChords, ConfigurableChord, getEmptyChordConfiguration } from "../ChordDiagram";

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
  chordsConfigurations: ConfigurableChord[];
  setChordsConfigurations: (chords: ConfigurableChord[]) => void;
  currentChord: number;
  setCurrentChord: (index: number) => void;
};

function ChordsSequence(props: ConfigurationPanelProps) {
  const [stringValue, setStringValue] = useState<string>("")

  useEffect(() => {
    setStringValue(props.chordsConfigurations.map(config => config.string).join(" "));
  }, [props.chordsConfigurations])

  const handleChange = (chord: ConfigurableChord, index: number) => {
    const newChords = [...props.chordsConfigurations];
    newChords[index] = chord;
    props.setChordsConfigurations(newChords);
  };

  const addChord = () => {
    props.setChordsConfigurations([...props.chordsConfigurations, getEmptyChordConfiguration()]);
  };

  const removeChord = (index: number) => {
    const newChords = [...props.chordsConfigurations];
    newChords.splice(index, 1);
    props.setChordsConfigurations(newChords);
  };

  const handleTextBlur = () => {
    const chordArray = stringValue === "" ? [] : stringValue.replace("\n", " ").split(" ");
    props.setChordsConfigurations(arrayToConfigurableChords(chordArray));
  }

  return (
    <>
      <InputWrapper>
        <StyledTextField
          label={"Chord Sequence Text Input"}
          value={stringValue}
          onChange={(e) => setStringValue(e.target.value)}
          onBlur={handleTextBlur}
          multiline
        />
      </InputWrapper>
      {props.chordsConfigurations.map((config, index) => (
        <ChordConfigurationPanel
          key={index}
          index={index}
          isCurrentChord={props.currentChord === index}
          setAsCurrentChord={() => props.setCurrentChord(index)}
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
