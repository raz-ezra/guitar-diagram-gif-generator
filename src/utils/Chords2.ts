type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

type Fingers = Finger[];

export type Finger = {
  index: number;
  string: number;
  fret: number | [number, number];
};

export type Chord = {
  fingers: Fingers;
  openStrings: number[];
  mutedStrings: number[];
  position: number;
};

export type BaseNote =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "A#"
  | "B#"
  | "C#"
  | "D#"
  | "E#"
  | "F#"
  | "G#"
  | "Ab"
  | "Bb"
  | "Cb"
  | "Db"
  | "Eb"
  | "Fb"
  | "G";

export type ChordType = "Major" | "Minor" | "7" | "m7";

type ChordsMap = PartialRecord<BaseNote, PartialRecord<ChordType, Chord>>;

const Chords2: ChordsMap = {
  C: {
    Major: {
      fingers: [
        {
          index: 1,
          string: 2,
          fret: 1,
        },
        {
          index: 2,
          string: 4,
          fret: 2,
        },
        {
          index: 3,
          string: 5,
          fret: 3,
        },
      ],
      openStrings: [1, 3],
      mutedStrings: [6],
      position: 0,
    },
    "7": {
      fingers: [
        { index: 1, string: 2, fret: 1 },
        { index: 2, string: 4, fret: 2 },
        { index: 3, string: 5, fret: 3 },
        { index: 4, string: 3, fret: 3 },
      ],
      openStrings: [1],
      mutedStrings: [6],
      position: 0,
    },
  },
  D: {
    Major: {
      fingers: [
        { index: 1, string: 3, fret: 2 },
        { index: 2, string: 1, fret: 2 },
        { index: 3, string: 2, fret: 3 },
      ],
      openStrings: [4],
      mutedStrings: [5, 6],
      position: 0,
    },
    Minor: {
      fingers: [
        { index: 1, string: 1, fret: 1 },
        { index: 2, string: 3, fret: 2 },
        { index: 3, string: 2, fret: 3 },
      ],
      openStrings: [4],
      mutedStrings: [5, 6],
      position: 0,
    },
    7: {
      fingers: [
        { index: 1, string: 2, fret: 1 },
        { index: 2, string: 3, fret: 2 },
        { index: 3, string: 1, fret: 2 },
      ],
      openStrings: [4],
      mutedStrings: [5, 6],
      position: 0,
    },
    m7: {
      fingers: [
        { index: 1, string: 2, fret: 1 },
        { index: 2, string: 3, fret: 2 },
      ],
      openStrings: [4],
      mutedStrings: [5, 6],
      position: 0,
    },
  },
  E: {
    Major: {
      fingers: [
        { index: 1, string: 3, fret: 1 },
        { index: 2, string: 5, fret: 2 },
        { index: 3, string: 4, fret: 2 },
      ],
      openStrings: [1, 2, 6],
      mutedStrings: [],
      position: 0,
    },
    Minor: {
      fingers: [
        { index: 2, string: 5, fret: 2 },
        { index: 3, string: 4, fret: 2 },
      ],
      openStrings: [1, 2, 3, 6],
      mutedStrings: [],
      position: 0,
    },
    7: {
      fingers: [
        { index: 1, string: 3, fret: 1 },
        { index: 2, string: 5, fret: 2 },
        { index: 4, string: 2, fret: 3 },
      ],
      openStrings: [1, 4, 6],
      mutedStrings: [],
      position: 0,
    },
    m7: {
      fingers: [
        { index: 1, string: 5, fret: 2 },
        { index: 4, string: 2, fret: 3 },
      ],
      openStrings: [1, 3, 4, 6],
      mutedStrings: [],
      position: 0,
    },
  },
  F: {
    Major: {
      fingers: [
        { index: 1, string: 2, fret: 1 },
        { index: 2, string: 3, fret: 3 },
        { index: 3, string: 5, fret: 4 },
        { index: 4, string: 4, fret: 4 },
      ],
      openStrings: [],
      mutedStrings: [],
      position: 1,
    },
  },
  "F#": {
    Major: {
      fingers: [
        { index: 1, string: 6, fret: 2 },
        { index: 2, string: 3, fret: 3 },
        { index: 3, string: 5, fret: 4 },
        { index: 4, string: 4, fret: 4 },
      ],
      openStrings: [],
      mutedStrings: [],
      position: 2,
    },
  },
  G: {
    Major: {
      fingers: [
        { index: 1, string: 5, fret: 2 },
        { index: 2, string: 6, fret: 3 },
        { index: 4, string: 1, fret: 3 },
      ],
      openStrings: [2, 3, 4],
      mutedStrings: [],
      position: 0,
    },
    7: {
      fingers: [
        { index: 1, string: 1, fret: 1 },
        { index: 2, string: 5, fret: 2 },
        { index: 3, string: 6, fret: 3 },
      ],
      openStrings: [2, 3, 4],
      mutedStrings: [],
      position: 0,
    },
  },
  A: {
    Major: {
      fingers: [
        { index: 1, string: 4, fret: 2 },
        { index: 2, string: 3, fret: 2 },
        { index: 3, string: 2, fret: 2 },
      ],
      openStrings: [1, 5],
      mutedStrings: [6],
      position: 0,
    },
    Minor: {
      fingers: [
        { index: 1, string: 2, fret: 1 },
        { index: 2, string: 4, fret: 2 },
        { index: 3, string: 3, fret: 2 },
      ],
      openStrings: [1, 5],
      mutedStrings: [6],
      position: 0,
    },
    7: {
      fingers: [
        { index: 2, string: 4, fret: 2 },
        { index: 3, string: 2, fret: 2 },
      ],
      openStrings: [1, 3, 5],
      mutedStrings: [6],
      position: 0,
    },
    m7: {
      fingers: [
        { index: 1, string: 2, fret: 1 },
        { index: 2, string: 4, fret: 2 },
      ],
      openStrings: [1, 3, 5],
      mutedStrings: [6],
      position: 0,
    },
  },
};

export default Chords2;
