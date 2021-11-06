import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { ConfigurableChord, stringToConfigurableChord } from "../ChordDiagram";
import Autocomplete from "@mui/material/Autocomplete";

const ChordConfigurationWrapper = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid gray;
  margin: 20px;
  position: relative;
`;

const ChordLabel = styled.div`
  position: absolute;
  top: -10px;
  background-color: gray;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6em;
`;

const StyledTextField = styled(TextField)`
  flex-grow: 1;
`;

const StyledAutoComplete = styled(Autocomplete)<{width: string}>`
  width: ${({width}) => width};
`;

type ChordConfigurationProps = {
  index: number;
  chordConfiguration: ConfigurableChord;
  onChange: (chord: ConfigurableChord, index: number) => void;
  removeChord: (index: number) => void;
};

function ChordConfigurationPanel(props: ChordConfigurationProps) {
  const [config, setConfig] = useState<ConfigurableChord>(props.chordConfiguration);

  const handleChordTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfig(stringToConfigurableChord(e.target.value));
  }

  return (
    <ChordConfigurationWrapper>
      <ChordLabel>{props.index + 1}</ChordLabel>
      <StyledTextField
        label="Chord"
        variant="standard"
        value={config.title}
        onChange={handleChordTitleChange}
        onBlur={() => props.onChange(config, props.index)}
        helperText="Changing this value will reset the other fields"
      />
      <StyledAutoComplete
        width="50px"
        options={config.availablePositions}
        value={config.selectedPosition}
        getOptionLabel={(option: any) => option.toString()}
        renderInput={(params) => (
          <TextField {...params} label="Position" variant="standard" />
        )}
      />
    </ChordConfigurationWrapper>
  );
}

export default ChordConfigurationPanel;