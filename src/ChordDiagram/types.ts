export type Finger = {
  index: number;
  string: number | [number, number];
  fret: number;
};

export type Chord = {
  title: string;
  fingers: Finger[];
  openStrings: number[];
  mutedStrings: number[];
  startPosition: number;
};
