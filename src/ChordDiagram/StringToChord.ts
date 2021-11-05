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


export function stringToChord(chord: string): Chord | null {
  const chordFingerings = findGuitarChord(chord);
  if (!chordFingerings) return null;

  const { positions, barre }: Fingering = chordFingerings.fingerings[0];
  const openStrings: number[] = [];
  const mutedStrings: number[] = [1, 2, 3, 4, 5, 6];
  const fingers: Finger[] = [];
  let currentBarre: [number, number] | null = null
  let currentBarreFret: number | null = null; 

  console.log(chordFingerings.fingerings[0])

  positions.reverse().forEach((position: Position) => {
    const { fret, stringIndex } = position;
    
    let string: Finger["string"] = 6 - stringIndex;
    if (barre && barre.fret === fret && !currentBarre) {
      currentBarreFret = barre.fret;
      currentBarre = [6 - barre.stringIndices[0], 6 - barre.stringIndices[barre.stringIndices.length - 1]];
      string = currentBarre;
    }

    if (fret === 0) {
      openStrings.push(stringIndex);
    } else {
      fingers.push({
        index: 0,
        string: string,
        fret,
      });
    }

    if (mutedStrings.includes(stringIndex)) {
      mutedStrings.splice(mutedStrings.indexOf(stringIndex), 1);
    }
  });

  const filteredFingers: Finger[] = fingers.filter(finger => {
    return !currentBarre || currentBarreFret !== finger.fret || 
    (Array.isArray(finger.string) && currentBarreFret === finger.fret && currentBarre[0] === finger.string[0]);
  }).map((finger, index) => ({...finger, index: index + 1}))

  const chordObject: Chord = {
    fingers: filteredFingers,
    position: Math.min(...fingers.map((finger) => finger.fret)),
    mutedStrings,
    openStrings,
  };

  console.log(chordObject);
  return chordObject;
}
