import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import {
    Chord,
    ConfigurableChord,
    constructChordStringFromConfigurableChord,
    Finger,
    stringToConfigurableChord
} from "../ChordDiagram";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorIcon from '@mui/icons-material/Error';

const ChordConfigurationWrapper = styled.div<{ selected: boolean, hasErrors: boolean, isEmptyChord: boolean }>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  border: ${({selected, hasErrors, isEmptyChord}) => {
    if (hasErrors) {
      return "2px solid red"
    }
    if (isEmptyChord) {
      return "2px solid orange"
    }
    if (selected) {
      return "4px solid #1976d2"
    }
    return "2px solid gray"
  }};
  margin: 20px;
  position: relative;
`;

const Row = styled.div<{ alignCenter?: boolean }>`
  display: flex;
  gap: 20px;
  ${({alignCenter}) => alignCenter ? `align-items: center;` : null}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ErrorText = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${({type}) => type === "warning" ? "orange" : "red"};;
`;

const BaseBorderLabel = styled.div<{ selected: boolean, hasErrors: boolean, isEmptyChord: boolean, size: number, fontSize: string }>`
  position: absolute;
  border-radius: 50%;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  background-color: ${({selected, hasErrors, isEmptyChord}) => {
    if (hasErrors) {
      return "red"
    }
    if (isEmptyChord) {
      return "orange"
    }
    if (selected) {
      return "#1976d2"
    }
    return "gray"
  }};
  color: ${({isEmptyChord}) => isEmptyChord ? "black" : "white"};;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({fontSize}) => fontSize};
`;

const ChordLabel = styled(BaseBorderLabel)`
  top: -10px;
  left: 15px;
`;

const ShowChordButton = styled(BaseBorderLabel)`
  top: 35px;
  right: -15px;
`;

const StyledTextField = styled(TextField)<{ width?: string }>`
  flex-grow: 1;
  ${({width}) => width ? `width: ${width};` : null}
`;

const StyledAutoComplete = styled(Autocomplete)<{ width: string }>`
  width: ${({width}) => width};
`;

const StyledCheckbox = styled(Checkbox)`
  padding: 0;
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
    isCurrentChord: boolean;
    setAsCurrentChord: () => void;
};

const getFingerByString = (string: number, chord: Chord): Finger | null => {
    return (chord && chord.fingers.find(finger => {
        return (Array.isArray(finger.string) && finger.string[0] === string) || finger.string === string;
    })) || null;
}

function getIsFingerAppearsTwice(fingerIndex: number, fingers: Finger[]) {
    let count = 0
    fingers.forEach(finger => finger.index === fingerIndex && count++)
    return count > 1;
}

function getIsBarreInvalid(stringStart: number, stringEnd: number) {
    return stringStart < stringEnd;
}

function getErrors(config: ConfigurableChord) {
    const errors: any = {};
    if (config.isLastPositionCustom && config.selectedPosition === config.availablePositions.length && config.chords[config.selectedPosition - 1].fingers.length === 0) {
        errors.emptyCustomChord = true;
    }

    [1, 2, 3, 4].forEach(fingerIndex => {
        if (getIsFingerAppearsTwice(fingerIndex, config.chords[config.selectedPosition - 1].fingers)) {
            errors.hasErrors = true
            errors.fingerAppearsTwice = true
        }
        const finger = config.chords[config.selectedPosition - 1].fingers.find(finger => finger.index === fingerIndex);

        if (finger && Array.isArray(finger.string)) {
            if (getIsBarreInvalid(finger.string[0], finger.string[1])) {
                errors.hasErrors = true
                errors.barreInvalid = true
            }
        }

    })

    return errors;
}

const errorTexts: any = {
    emptyCustomChord: {
        type: "warning",
        text: "Finger positions are empty"
    },
    fingerAppearsTwice: {
        type: "error",
        text: "Same finger appears on two strings"
    },
    barreInvalid: {
        type: "error",
        text: "Barre end position cannot be bigger than string"
    }
}

function ChordConfigurationPanel(props: ChordConfigurationProps) {
    const [config, setConfig] = useState<ConfigurableChord>(props.chordConfiguration);
    const wrapper = useRef<HTMLDivElement>(null);

    const errors = getErrors(config);

    useEffect(() => {
        setConfig(props.chordConfiguration)
    }, [props.chordConfiguration])

    useEffect(() => {
        if (wrapper.current && props.isCurrentChord) {
            wrapper.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [props.isCurrentChord])

    const chord = config.chords[config.selectedPosition - 1];

    const handleChordTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfig(stringToConfigurableChord(e.target.value));
    }

    const handleBlur = () => {
        const newString = constructChordStringFromConfigurableChord(config);
        props.onChange({...config, string: newString}, props.index);
    };

    const handleFingerValueChange = (stringIndex: number, attribute: "index" | "fret" | "string" | "mutedStrings", value: any) => {
        const newConfig = {...config};
        if (!newConfig.isLastPositionCustom) {
            newConfig.chords.push(newConfig.chords[newConfig.selectedPosition - 1]);
            newConfig.selectedPosition = newConfig.chords.length;
            newConfig.availablePositions.push(newConfig.chords.length);
            newConfig.isLastPositionCustom = true;
        } else {
            newConfig.selectedPosition = newConfig.chords.length;
        }

        if (attribute === "mutedStrings") {
            newConfig.chords[newConfig.selectedPosition - 1].mutedStrings = value[0];
            newConfig.chords[newConfig.selectedPosition - 1].openStrings = value[1];
        } else {
            const fingerIndex = newConfig.chords[newConfig.selectedPosition - 1].fingers.findIndex(finger => {
                return (Array.isArray(finger.string) && finger.string[0] === stringIndex) || finger.string === stringIndex;
            });

            if (fingerIndex > -1) {
                if (value === "" && attribute === "index") {
                    newConfig.chords[newConfig.selectedPosition - 1].fingers.splice(fingerIndex, 1)
                } else {
                    let actualValue: number | [number, number] = parseInt(value);
                    if (attribute === "string") {
                        actualValue = [stringIndex, value]
                    }
                    newConfig.chords[newConfig.selectedPosition - 1].fingers[fingerIndex] = {
                        ...newConfig.chords[newConfig.selectedPosition - 1].fingers[fingerIndex],
                        [attribute]: actualValue
                    }
                }
            } else {
                newConfig.chords[newConfig.selectedPosition - 1].fingers.push({
                    index: parseInt(value),
                    string: stringIndex,
                    fret: 0
                })
            }
        }
        setConfig(newConfig);
        return newConfig;
    };

    return (
        <ChordConfigurationWrapper
            selected={props.isCurrentChord}
            ref={wrapper}
            hasErrors={errors.hasErrors}
            isEmptyChord={errors.emptyCustomChord}
        >
            <ChordLabel
                selected={props.isCurrentChord}
                hasErrors={errors.hasErrors}
                isEmptyChord={errors.emptyCustomChord}
                size={20}
                fontSize="0.6em"
            >
                {props.index + 1}
            </ChordLabel>
            <ShowChordButton
                selected={props.isCurrentChord}
                onClick={() => props.setAsCurrentChord()}
                hasErrors={errors.hasErrors}
                isEmptyChord={errors.emptyCustomChord}
                size={30}
                fontSize="14px"
            >
                <ArrowForwardIosIcon style={{fontSize: "14px"}}/>
            </ShowChordButton>
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
                    onChange={(e, value: any) => {
                        const newConfig = {...config, selectedPosition: value};
                        const newString = constructChordStringFromConfigurableChord(newConfig);
                        setConfig({...newConfig, string: newString})
                        props.onChange({...newConfig, string: newString}, props.index)
                    }}
                    getOptionLabel={(option: any) => {
                        return config.isLastPositionCustom && option === config.chords.length ? "Custom" : option.toString();
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Position" variant="standard"/>
                    )}
                />
            </Row>
            <Row alignCenter>
                <StyledTable>
                    <tbody>
                    <tr>
                        <td style={{width: "30px"}}>String:</td>
                        {[6, 5, 4, 3, 2, 1].map(string => (
                            <td key={string}>{string}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Finger:</td>
                        <>
                            {[6, 5, 4, 3, 2, 1].map(string => {
                                const finger = getFingerByString(string, chord);
                                const fingerIndex = (!isNaN(finger?.index ?? NaN) && finger?.index) || "";
                                return (
                                    <td key={string}>
                                        <StyledTextField
                                            onFocus={(e) => e.target.select()}
                                            fullWidth
                                            key={string}
                                            width="80%"
                                            variant="standard"
                                            error={fingerIndex !== "" && getIsFingerAppearsTwice(fingerIndex, chord.fingers)}
                                            inputProps={{style: {textAlign: 'center'}}}
                                            value={fingerIndex}
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
                            {[6, 5, 4, 3, 2, 1].map(string => {
                                const finger = getFingerByString(string, chord);
                                const fret = (!isNaN(finger?.fret ?? NaN) && finger?.fret) || ""
                                return (
                                    <td key={string}>
                                        <StyledTextField
                                            onFocus={(e) => e.target.select()}
                                            fullWidth
                                            key={string}
                                            width="80%"
                                            variant="standard"
                                            inputProps={{style: {textAlign: 'center'}}}
                                            disabled={!finger?.index}
                                            value={fret}
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
                            {[6, 5, 4, 3, 2, 1].map(string => {
                                const finger = getFingerByString(string, chord);
                                const barre = (Array.isArray(finger?.string) && !isNaN(finger?.string[1] ?? NaN) && finger?.string[1]) || ""
                                return (
                                    <td key={string}>
                                        <StyledTextField
                                            onFocus={(e) => e.target.select()}
                                            fullWidth
                                            key={string}
                                            width="80%"
                                            variant="standard"
                                            error={barre !== "" && getIsBarreInvalid(string, barre)}
                                            inputProps={{style: {textAlign: 'center'}}}
                                            disabled={!finger?.index}
                                            value={barre}
                                            onChange={(e) => handleFingerValueChange(string, "string", e.target.value)}
                                            onBlur={handleBlur}
                                        />
                                    </td>
                                )
                            })}
                        </>
                    </tr>
                    <tr>
                        <td>Muted:</td>
                        <>
                            {[6, 5, 4, 3, 2, 1].map(string => {
                                return (
                                    <td key={string}>
                                        <StyledCheckbox
                                            checked={chord?.mutedStrings.includes(string) ?? false}
                                            onChange={(e) => {
                                                const newMutedStrings = [...chord.mutedStrings]
                                                const newOpenStrings = [...chord.openStrings]
                                                if (e.target.checked) {
                                                    newMutedStrings.push(string)
                                                    newOpenStrings.splice(newOpenStrings.indexOf(string), 1)
                                                } else {
                                                    newMutedStrings.splice(newMutedStrings.indexOf(string), 1)
                                                    newOpenStrings.push(string)

                                                }
                                                const newConfig = handleFingerValueChange(string, "mutedStrings", [newMutedStrings, newOpenStrings])
                                                const newString = constructChordStringFromConfigurableChord(newConfig);
                                                props.onChange({...newConfig, string: newString}, props.index);
                                            }}
                                        />
                                    </td>
                                )
                            })}
                        </>
                    </tr>
                    </tbody>
                </StyledTable>
            </Row>
            <Column>
                {Object.keys(errors).map(error => {
                    const errorInfo = errorTexts[error];
                    return errorInfo ? (
                        <ErrorText key={error} type={errorInfo.type}>
                            <ErrorIcon/>
                            {errorInfo.text}
                        </ErrorText>
                    ) : null
                })}
            </Column>
        </ChordConfigurationWrapper>
    );
}

export default ChordConfigurationPanel;