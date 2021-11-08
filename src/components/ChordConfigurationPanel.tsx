import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import {Chord, ConfigurableChord, Finger, stringToConfigurableChord } from "../ChordDiagram";
import Autocomplete from "@mui/material/Autocomplete";

const ChordConfigurationWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid gray;
  margin: 20px;
  position: relative;
`;

const Row = styled.div<{alignCenter?: boolean}>`
  display: flex;
  gap: 20px;
  ${({alignCenter}) => alignCenter ? `align-items: center;` : null}
`;

const ChordLabel = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
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

const StyledTextField = styled(TextField)<{width?: string}>`
  flex-grow: 1;
  ${({width}) => width ? `width: ${width};` : null}
`;

const StyledAutoComplete = styled(Autocomplete)<{width: string}>`
  width: ${({width}) => width};
`;

const StyledTable = styled.table`
    width: 100%;
    border-spacing: 0;
  
    & tr:first-of-type {
      td {
        border-top: 1px gray solid;
        
        &:first-of-type {
          border-top-left-radius: 10px;
        }

        &:last-of-type {
          border-top-right-radius: 10px;
        }
      }
    }

      & tr:last-of-type {
        td {
          border-bottom: 1px gray solid;

          &:first-of-type {
            border-bottom-left-radius: 10px;
          }

          &:last-of-type {
            border-bottom-right-radius: 10px;
          }
        }
      }
    & td {
      border-right: 1px gray solid;
      border-bottom: 1px gray solid;
      padding: 5px 8px;

      &:first-of-type {
        border-left: 1px gray solid;
      }
      
      &:not(:first-of-type) {
        text-align: center;
      }
    }
`;

type ChordConfigurationProps = {
  index: number;
  chordConfiguration: ConfigurableChord;
  onChange: (chord: ConfigurableChord, index: number) => void;
  removeChord: (index: number) => void;
};

const getFingerByString = (string: number, chord: Chord): Finger | null => {
    return (chord && chord.fingers.find(finger => {
        return (Array.isArray(finger.string) && finger.string[0] === string) || finger.string === string;
    })) || null;
}

function ChordConfigurationPanel(props: ChordConfigurationProps) {
  const [config, setConfig] = useState<ConfigurableChord>(props.chordConfiguration);

  const chord = config.chords[config.selectedPosition - 1];

    const handleChordTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfig(stringToConfigurableChord(e.target.value));
    }

    const handleBlur = () => {
        props.onChange(config, props.index);
    };

    const handleFingerValueChange = (stringIndex: number, fingerAttr: "index" | "fret" | "string" , stringValue: string) => {
        const newConfig = {...config};
        if (!newConfig.isLastPositionCustom && stringValue !== "") {
            newConfig.chords.push(newConfig.chords[newConfig.selectedPosition - 1]);
            newConfig.selectedPosition = newConfig.chords.length;
            newConfig.availablePositions.push(newConfig.chords.length);
            newConfig.isLastPositionCustom = true;
        } else {
            newConfig.selectedPosition = newConfig.chords.length;
        }

        const fingerIndex = newConfig.chords[newConfig.selectedPosition - 1].fingers.findIndex(finger => {
            return (Array.isArray(finger.string) && finger.string[0] === stringIndex) || finger.string === stringIndex;
        });

        if (fingerIndex > -1) {
            if (stringValue === "") {
                newConfig.chords[newConfig.selectedPosition - 1].fingers.splice(fingerIndex , 1)
            }
            else {
                let value: number | [number, number] = parseInt(stringValue);
                let actualAttribute = fingerAttr;
                if (fingerAttr === "string") {
                    value = [stringIndex, value]
                }
                newConfig.chords[newConfig.selectedPosition - 1].fingers[fingerIndex] = {
                    ...newConfig.chords[newConfig.selectedPosition - 1].fingers[fingerIndex],
                    [actualAttribute]: value
                }
            }
        } else {
            newConfig.chords[newConfig.selectedPosition - 1].fingers.push({
                index: parseInt(stringValue),
                string: stringIndex,
                fret: 0
            })
        }

        setConfig(newConfig);
    };

  return (
    <ChordConfigurationWrapper>
      <ChordLabel>{props.index + 1}</ChordLabel>
        <Row>
            <StyledTextField
                label="Chord"
                variant="standard"
                value={config.title}
                onChange={handleChordTitleChange}
                onBlur={handleBlur}
                helperText="Changing this value will reset the other fields"
            />
            <StyledAutoComplete
                width="110px"
                disableClearable
                options={config.availablePositions}
                value={config.selectedPosition}
                onChange={(e, value: any) =>  {
                    const newConfig = {...config, selectedPosition: value};
                    setConfig(newConfig)
                    props.onChange(newConfig, props.index)
                }}
                getOptionLabel={(option: any) => {
                    return config.isLastPositionCustom && option === config.chords.length ? "Custom" : option.toString();
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Position" variant="standard" />
                )}
            />
        </Row>
        <Row alignCenter>
            <StyledTable>
                <tr>
                    <td style={{width: "30px"}}>String:</td>
                    {[6,5,4,3,2,1].map(string => (
                        <td>{string}</td>
                    ))}
                </tr>
                <tr>
                    <td>Finger:</td>
                    <>
                        {[6,5,4,3,2,1].map(string => {
                            const finger = getFingerByString(string, chord);
                            return (
                                <td>
                                    <StyledTextField
                                        onFocus={(e) => e.target.select()}
                                        fullWidth
                                        key={string}
                                        width="80%"
                                        variant="standard"
                                        inputProps={{style: { textAlign: 'center' }}}
                                        value={(!isNaN(finger?.index ?? NaN) && finger?.index) || ""}
                                        onChange={(e) => handleFingerValueChange(string, "index", e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                </td>
                            )
                        })}
                    </>
                </tr>
                <tr>
                    <td>Fret:</td>
                    <>
                        {[6,5,4,3,2,1].map(string => {
                            const finger = getFingerByString(string, chord);
                            return (
                                <td>
                                    <StyledTextField
                                        onFocus={(e) => e.target.select()}
                                        fullWidth
                                        key={string}
                                        width="80%"
                                        variant="standard"
                                        inputProps={{style: { textAlign: 'center' }}}
                                        disabled={!finger?.index}
                                        value={(!isNaN(finger?.fret ?? NaN) && finger?.fret) || ""}
                                        onChange={(e) => handleFingerValueChange(string, "fret", e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                </td>
                            )
                        })}
                    </>
                </tr>
                <tr>
                    <td>Barre:</td>
                    <>
                        {[6,5,4,3,2,1].map(string => {
                            const finger = getFingerByString(string, chord);
                            return (
                                <td>
                                    <StyledTextField
                                        onFocus={(e) => e.target.select()}
                                        fullWidth
                                        key={string}
                                        width="80%"
                                        variant="standard"
                                        inputProps={{style: { textAlign: 'center' }}}
                                        disabled={!finger?.index}
                                        value={(Array.isArray(finger?.string) && !isNaN(finger?.string[1] ?? NaN) && finger?.string[1]) || ""}
                                        onChange={(e) => handleFingerValueChange(string, "string", e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                </td>
                            )
                        })}
                    </>
                </tr>
            </StyledTable>
        </Row>
    </ChordConfigurationWrapper>
  );
}

export default ChordConfigurationPanel;