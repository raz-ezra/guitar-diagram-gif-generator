import React, { ChangeEvent, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Chords from "../utils/Chords";
//@ts-ignore;
import { ChordBox } from "vexchords";

const ChordConfigurationWrapper = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select<{ width: number }>`
  width: ${({ width }) => width}px;
  padding: 5px;
`;

const StyledButton = styled.button`
  background-color: #ffffff;
  padding: 2px 7px;
`;

const ChordDiagramWrapper = styled.div<{ debugMode: boolean | undefined }>`
  min-width: 100px;
  min-height: 120px;
  ${({ debugMode }) => (debugMode ? "border: 1px solid red;" : null)}
`;

type ChordConfigurationProps = {
  index: number;
  note: any;
  type: string;
  onChange: (chord: any, index: number) => void;
  removeChord: (index: number) => void;
};

const options = {
  // Customizations (all optional, defaults shown)
  width: 100, // canvas width
  height: 120, // canvas height
  circleRadius: 5, // circle radius (width / 20 by default)

  numStrings: 6, // number of strings (e.g., 4 for bass)
  numFrets: 5, // number of frets (e.g., 7 for stretch chords)
  showTuning: false, // show tuning keys

  defaultColor: "#666", // default color
  // bgColor: '#FFF', // background color
  // strokeColor: '#666', // stroke color (overrides defaultColor)
  // textColor: '#666', // text color (overrides defaultColor)
  // stringColor: '#666', // string color (overrides defaultColor)
  // fretColor: '#666', // fret color (overrides defaultColor)
  // labelColor: '#666', // label color (overrides defaultColor)

  fretWidth: 1, // fret width
  stringWidth: 1, // string width
};

function ChordConfiguration(props: ChordConfigurationProps) {
  const diagramWrapper = useRef<any>(null);

  useEffect(() => {
    if (props.note !== "" && props.type !== "") {
      diagramWrapper.current.innerHTML = "";
      diagramWrapper.current &&
        new ChordBox(`#chord-diagram-wrapper-${props.index}`, options).draw({
          // array of [string, fret, label (optional)]
          chord: Chords[props.note][props.type].chord,

          // optional: position marker
          position: Chords[props.note][props.type].position || 0,

          // optional: barres for barre chords
          barres: Chords[props.note][props.type].barres || [],
        });
    }
  }, [props.note, props.type, props.index]);

  const handleNoteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const note = e.target.value;
    let type = props.type;
    if (type !== "" && !Chords[props.note][props.type]) {
      type = Object.keys(Chords[props.note])[0];
    }
    props.onChange({ note, type }, props.index);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onChange({ note: props.note, type: e.target.value }, props.index);
  };

  return (
    <ChordConfigurationWrapper>
      <StyledButton onClick={() => props.removeChord(props.index)}>
        -
      </StyledButton>
      {props.index + 1}.
      <StyledSelectWrapper>
        Note:
        <StyledSelect value={props.note} width={50} onChange={handleNoteChange}>
          <option value={""} key={"null"}>
            --
          </option>
          {Object.keys(Chords).map((note) => (
            <option value={note} key={note}>
              {note}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectWrapper>
      <StyledSelectWrapper>
        Type:
        <StyledSelect value={props.type} width={80} onChange={handleTypeChange}>
          <option value={""} key={"null"}>
            --
          </option>
          {Chords[props.note] &&
            Object.keys(Chords[props.note]).map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
        </StyledSelect>
      </StyledSelectWrapper>
      <ChordDiagramWrapper
        id={`chord-diagram-wrapper-${props.index}`}
        ref={diagramWrapper}
        debugMode={true}
      />
    </ChordConfigurationWrapper>
  );
}

export default ChordConfiguration;
