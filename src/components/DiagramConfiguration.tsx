import styled from "@emotion/styled";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React from "react";
import { ChordDiagramParams } from "../ChordDiagram";

const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

type ConfigurationPanelProps = {
  diagramConfiguration: ChordDiagramParams;
  setDiagramConfiguration: (configuration: ChordDiagramParams) => void;
};

function DiagramConfiguration({
  diagramConfiguration,
  setDiagramConfiguration,
}: ConfigurationPanelProps) {
  const handleNumberChange = (
    value: number,
    param: keyof ChordDiagramParams
  ) => {
    setDiagramConfiguration({
      ...diagramConfiguration,
      [param]: value,
    });
  };

  const handleBooleanChange = (
    value: boolean,
    param: keyof ChordDiagramParams
  ) => {
    setDiagramConfiguration({
      ...diagramConfiguration,
      [param]: value,
    });
  };

  const handleArrayChange = (
    value: string,
    param: keyof ChordDiagramParams
  ) => {
    setDiagramConfiguration({
      ...diagramConfiguration,
      [param]: value.split(","),
    });
  };

  const handleStringChange = (
    value: string,
    param: keyof ChordDiagramParams
  ) => {
    setDiagramConfiguration({
      ...diagramConfiguration,
      [param]: value,
    });
  };

  return (
    <Wraper>
      <Row>
        <TextField
          label="Width"
          variant="standard"
          defaultValue={diagramConfiguration.width}
          onBlur={(e) => handleNumberChange(parseInt(e.target.value), "width")}
        />
        <TextField
          label="Height"
          variant="standard"
          defaultValue={diagramConfiguration.height}
          onBlur={(e) => handleNumberChange(parseInt(e.target.value), "height")}
        />
      </Row>
      <Row>
        <TextField
          label="# of Strings"
          variant="standard"
          defaultValue={diagramConfiguration.numOfStrings}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "numOfStrings")
          }
        />
        <TextField
          label="# of Frets"
          variant="standard"
          defaultValue={diagramConfiguration.numOfFrets}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "numOfFrets")
          }
        />
      </Row>
      <Row>
        <TextField
          label="String Width"
          variant="standard"
          defaultValue={diagramConfiguration.stringWidth}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "stringWidth")
          }
        />
        <TextField
          label="Frets Width"
          variant="standard"
          defaultValue={diagramConfiguration.fretsWidth}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "fretsWidth")
          }
        />
      </Row>
      <Row>
        <TextField
          label="Animation Duration"
          variant="standard"
          defaultValue={diagramConfiguration.animationDuration}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "animationDuration")
          }
        />
        <TextField
          label="Force Start Position"
          variant="standard"
          defaultValue={diagramConfiguration.forcePosition}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "forcePosition")
          }
        />
      </Row>
      <Row>
        <FormControlLabel
          control={
            <Switch
              checked={diagramConfiguration.showFretsLabels}
              onChange={(e) =>
                handleBooleanChange(e.target.checked, "showFretsLabels")
              }
            />
          }
          label="Show Fret Labels"
        />
        <FormControlLabel
          control={
            <Switch
              checked={diagramConfiguration.showBridgeLabel}
              onChange={(e) =>
                handleBooleanChange(e.target.checked, "showBridgeLabel")
              }
            />
          }
          label="Show Bridge Labels"
        />
      </Row>
      <Row>
        <FormControlLabel
          control={
            <Switch
              checked={diagramConfiguration.showFingerLabels}
              onChange={(e) =>
                handleBooleanChange(e.target.checked, "showFingerLabels")
              }
            />
          }
          label="Show Finger Label"
        />
        <FormControlLabel
          control={
            <Switch
              checked={diagramConfiguration.showOpenStringsLabels}
              onChange={(e) =>
                handleBooleanChange(e.target.checked, "showOpenStringsLabels")
              }
            />
          }
          label="Show Open Strings Labels"
        />
      </Row>
      <Row>
        <FormControlLabel
          control={
            <Switch
              checked={diagramConfiguration.showTuning}
              onChange={(e) =>
                handleBooleanChange(e.target.checked, "showTuning")
              }
            />
          }
          label="Show Tuning"
        />
        <TextField
          label="Tuning"
          variant="standard"
          defaultValue={diagramConfiguration.tuning}
          onBlur={(e) => handleArrayChange(e.target.value, "tuning")}
        />
      </Row>
      <Row>
        <TextField
          label="Default Color"
          variant="standard"
          defaultValue={diagramConfiguration.defaultColor}
          onBlur={(e) => handleStringChange(e.target.value, "defaultColor")}
        />
        <TextField
          label="Bridge Color"
          variant="standard"
          defaultValue={diagramConfiguration.bridgeColor}
          onBlur={(e) => handleStringChange(e.target.value, "bridgeColor")}
        />
      </Row>
      <Row>
        <TextField
          label="String Color"
          variant="standard"
          defaultValue={diagramConfiguration.stringColor}
          onBlur={(e) => handleStringChange(e.target.value, "stringColor")}
        />
        <TextField
          label="Fret Color"
          variant="standard"
          defaultValue={diagramConfiguration.fretColor}
          onBlur={(e) => handleStringChange(e.target.value, "fretColor")}
        />
      </Row>
      <Row>
        <TextField
          label="Text Color"
          variant="standard"
          defaultValue={diagramConfiguration.textColor}
          onBlur={(e) => handleStringChange(e.target.value, "textColor")}
        />
        <TextField
          label="Label Color"
          variant="standard"
          defaultValue={diagramConfiguration.labelColor}
          onBlur={(e) => handleStringChange(e.target.value, "labelColor")}
        />
      </Row>
      <Row>
        <TextField
          label="Background Color"
          variant="standard"
          defaultValue={diagramConfiguration.backgroundColor}
          onBlur={(e) => handleStringChange(e.target.value, "backgroundColor")}
        />
      </Row>
      <Row>
        <TextField
          label="Font Family"
          variant="standard"
          defaultValue={diagramConfiguration.fontFamily}
          onBlur={(e) => handleStringChange(e.target.value, "fontFamily")}
        />
        <TextField
          label="Font Size"
          variant="standard"
          defaultValue={diagramConfiguration.fontSize}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "fontSize")
          }
        />
      </Row>
      <Row>
        <TextField
          label="Font Style"
          variant="standard"
          defaultValue={diagramConfiguration.fontStyle}
          onBlur={(e) => handleStringChange(e.target.value, "fontStyle")}
        />
        <TextField
          label="Font Weight"
          variant="standard"
          defaultValue={diagramConfiguration.fontWeight}
          onBlur={(e) =>
            handleNumberChange(parseInt(e.target.value), "fontWeight")
          }
        />
      </Row>
    </Wraper>
  );
}

export default DiagramConfiguration;
