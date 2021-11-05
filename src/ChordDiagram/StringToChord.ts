//@ts-ignore;
import { findGuitarChord } from "chord-fingering";
import { Finger, Chord } from "../utils/Chords2";

type Position = {
  fret: number;
  note: string;
  stringIndex: number;
  stringNote: string;
};

type Barre = {
    fret: number,
    stringIndices: [number, number]
}

type Fingering = {
  positions: Position[],
  barre: Barre
}

const sortFingers = (fingerA: Finger, fingerB: Finger): number => {
  const fingerAString = Array.isArray(fingerA.string) ? fingerA.string[0] : fingerA.string;
  const fingerBString = Array.isArray(fingerB.string) ? fingerB.string[0] : fingerB.string;
  return fingerA.fret === fingerB.fret ? fingerBString - fingerAString : fingerA.fret - fingerB.fret;
};

export function stringToChord(chord: string): Chord | null {
  const chordFingerings = findGuitarChord(chord);
  if (!chordFingerings) return null;

  const { positions, barre }: Fingering = chordFingerings.fingerings[0];
  const openStrings: number[] = [];
  const mutedStrings: number[] = [1, 2, 3, 4, 5, 6];
  const fingers: Finger[] = [];
  let currentBarre: [number, number] | null = null
  let currentBarreFret: number | null = null;

  positions.reverse().forEach((position: Position) => {
    const { fret, stringIndex } = position;
    
    let string: Finger["string"] = 6 - stringIndex;
    if (barre && barre.fret === fret && !currentBarre) {
      currentBarreFret = barre.fret;
      currentBarre = [6 - barre.stringIndices[0], 6 - barre.stringIndices[barre.stringIndices.length - 1]];
      string = currentBarre;
    }

    if (fret === 0) {
      openStrings.push(6 - stringIndex);
    } else {
      fingers.push({
        index: 0,
        string: string,
        fret,
      });
    }

    if (mutedStrings.includes(6 - stringIndex)) {
      mutedStrings.splice(mutedStrings.indexOf(6 - stringIndex), 1);
    }
  });

  const filteredFingers: Finger[] = fingers.filter(finger => {
    return !currentBarre || currentBarreFret !== finger.fret || 
    (Array.isArray(finger.string) && currentBarreFret === finger.fret && currentBarre[0] === finger.string[0]);
  })
  .sort(sortFingers)
  .map((finger, index) => ({...finger, index: index + 1}))

  const position = Math.min(...fingers.map((finger) => finger.fret));

  const chordObject: Chord = {
    fingers: filteredFingers,
    position: position === 1 ? 0 : position,
    mutedStrings,
    openStrings,
  };

  return chordObject;
}
