//@ts-ignore;
import { findGuitarChord } from "chord-fingering";
import { Finger, Chord } from "../utils/Chords2";

type Position = {
  fret: number;
  note: string;
  stringIndex: number;
  stringNote: string;
};

export function stringToChord(chord: string): Chord | null {
  const chordFingerings = findGuitarChord(chord);
  if (!chordFingerings) return null;

  const { positions } = chordFingerings.fingerings[0];
  const openStrings: number[] = [];
  const mutedStrings: number[] = [1, 2, 3, 4, 5, 6];
  const fingers: Finger[] = [];
  let counter = 1;

  positions.reverse().forEach((position: Position) => {
    const { fret, stringIndex } = position;

    if (fret === 0) {
      openStrings.push(stringIndex);
    } else {
      fingers.push({
        index: counter++,
        string: 6 - stringIndex,
        fret,
      });
    }

    if (mutedStrings.includes(stringIndex)) {
      mutedStrings.splice(mutedStrings.indexOf(stringIndex), 1);
    }
  });

  const chordObject: Chord = {
    fingers,
    position: Math.min(...fingers.map((finger) => finger.fret)),
    mutedStrings,
    openStrings,
  };

  return chordObject;
}
