//@ts-ignore;
import { findGuitarChord } from "chord-fingering";
import { Finger, Chord } from "./types";

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

export const getEmptyChordObject = (title: string = ""): Chord => ({
  title,
  fingers: [],
  startFret: 0,
  mutedStrings: [],
  openStrings: [],
});
export function chordToString(chord: Chord): string {
  let string = "";

  string += chord.title;

  return string;
}


function getChordFromFingering(chordTitle: string, fingering: Fingering): Chord {
  if (!fingering) return getEmptyChordObject(chordTitle);
  // console.log(fingering);
  const { positions, barre }: Fingering = fingering;
  const openStrings: number[] = [];
  const mutedStrings: number[] = [1, 2, 3, 4, 5, 6];
  const fingers: Finger[] = [];
  let currentBarre: [number, number] | null = null
  let currentBarreFret: number | null = null;
  let startFret: number = 0;

  positions.reverse().forEach((position: Position) => {
    const { fret, stringIndex } = position;
    if (startFret === 0 || (fret !== 0 && startFret > fret)) {
      startFret = fret;
    }

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

  return {
    title: chordTitle,
    fingers: filteredFingers,
    startFret: startFret === 1000 ? 1 : startFret,
    mutedStrings,
    openStrings,
  };
}

export const getEmptyChordConfiguration = (title: string = ""): ConfigurableChord => ({
  string: title,
  title: title,
  availablePositions: [],
  selectedPosition: 1,
  chords: []
});

export type ConfigurableChord = {
  string: string,
  title: string,
  availablePositions: number[],
  selectedPosition: number,
  chords: Chord[]
}

export function stringToConfigurableChord(chordTitle: string): ConfigurableChord {
  const chordFingerings = findGuitarChord(chordTitle);
  if (!chordFingerings) return getEmptyChordConfiguration(chordTitle);

  const chords = chordFingerings.fingerings.map((fingering: Fingering) => getChordFromFingering(chordTitle, fingering));

  return {
    string: chordTitle,
    title: chordTitle,
    availablePositions: chordFingerings.fingerings.map((_: any, index: number) => index + 1),
    selectedPosition: 1,
    chords: chords
  }
}

export function arrayToConfigurableChords(chords: string[]): ConfigurableChord[] {
  return chords.map(chord => {
      return stringToConfigurableChord(chord);
  })
}
