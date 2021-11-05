import styled from "@emotion/styled";
import React from "react";

const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
`;

type ChordsInputProps = {
    chords: string[];
    setChords: (chords: string[]) => void;
};

export const ChordsInput = (props: ChordsInputProps) => {
  function handleChange(e: any) {
      props.setChords(e.target.value === "" ? [""] : e.target.value.split(" "));
  }

  return (
    <Wraper>
        <input value={props.chords.join(" ")} onChange={handleChange} />
    </Wraper>
  );
};
