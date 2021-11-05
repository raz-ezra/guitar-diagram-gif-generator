import React from "react";

type ChordsInputProps = {
  chordsText: string;
  setChordsText: Function;
};

export const ChordsInput = (props: ChordsInputProps) => {
  function handleChange(e: any) {
      props.setChordsText(e.target.value);
  }

  return <input value={props.chordsText} onChange={handleChange} />;
};
