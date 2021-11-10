import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import ChordConfigurationPanel from "./ChordConfigurationPanel";
import TextField from "@mui/material/TextField";
import { arrayToConfigurableChords, ConfigurableChord, getEmptyChordConfiguration } from "../ChordDiagram";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  margin: 10px 0 -5px;
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
  currentChord: number | null;
  setCurrentChord: (index: number) => void;
};

function ChordsSequence(props: ConfigurationPanelProps) {
  const [stringValue, setStringValue] = useState<string>("")
  const textInputField = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStringValue(props.chordsConfigurations.map(config => config.string).join(" "));
  }, [props.chordsConfigurations])

  useEffect(() => {
    if (!props.currentChord && textInputField.current) {
      textInputField.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [props.currentChord])

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
    <div>
      <InputWrapper ref={textInputField}>
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
        <StyledButton onClick={addChord} variant="contained">+Add Chord</StyledButton>
      </ButtonWrapper>
    </div>
  );
}

export default ChordsSequence;
