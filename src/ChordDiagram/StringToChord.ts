//@ts-ignore;
import {findGuitarChord} from "chord-fingering";
import {Finger, Chord} from "./types";

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
    const {positions, barre}: Fingering = fingering;
    const openStrings: number[] = [];
    const mutedStrings: number[] = [1, 2, 3, 4, 5, 6];
    const fingers: Finger[] = [];
    let currentBarre: [number, number] | null = null
    let currentBarreFret: number | null = null;
    let startFret: number = 0;

    positions.reverse().forEach((position: Position) => {
        const {fret, stringIndex} = position;
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
    availablePositions: [1],
    isLastPositionCustom: true,
    selectedPosition: 1,
    chords: [getEmptyChordObject(title)]
});

export type ConfigurableChord = {
    string: string,
    title: string,
    availablePositions: number[],
    isLastPositionCustom: boolean,
    selectedPosition: number,
    chords: Chord[]
}

export function parseChordString(chordString: string) {
    const hasParams = chordString.indexOf(":") !== -1;
    if (hasParams) {
        const [chordTitle, rawParams] = chordString.split(":");

        const config: { selectedPosition: number, chord: Chord | null } = {
            selectedPosition: 0,
            chord: null
        };

        const [position, ...otherParams] = rawParams.split(",");
        config.selectedPosition = parseInt(position[1])
        if (otherParams.length > 0) {
            const fingers: Finger[] = [];
            const openStrings = [6, 5, 4, 3, 2, 1];
            const mutedStrings: number[] = [];
            let startFret = 0;
            otherParams.forEach(param => {
                if (param[0] === "f") {
                    const fret = parseInt(param[2]);
                    if (startFret === 0 || (fret !== 0 && startFret > fret)) {
                        startFret = fret;
                    }
                    const stringStart = parseInt(param[3]);
                    openStrings.splice(openStrings.indexOf(stringStart), 1);

                    fingers.push({
                        index: parseInt(param[1]),
                        fret,
                        string: param.length === 5 ? [stringStart, parseInt(param[4])] : stringStart
                    });
                } else {
                    param.split("").forEach(char => {
                        const mutedString = parseInt(char);
                        openStrings.splice(openStrings.indexOf(mutedString), 1);
                        if (char !== "m") {
                            mutedStrings.push(mutedString);
                        }
                    })
                }
            })
            config.chord = {
                title: chordTitle,
                fingers,
                openStrings,
                mutedStrings,
                startFret
            }
        }
        return {
            chordTitle: chordTitle,
            ...config
        }

    }
    return {
        chordTitle: chordString,
        selectedPosition: 0,
        chord: null
    }
}

export const constructChordStringFromConfigurableChord = (chord: ConfigurableChord): string => {
    let chordString = chord.title;
    let chordStringParams = "";
    if (chord.selectedPosition !== 1 || (chord.isLastPositionCustom && chord.availablePositions.length === 1 && chord.chords[0].fingers.length > 0)) {
        chordStringParams += "p" + chord.selectedPosition;
    }
    if (chord.isLastPositionCustom && chord.selectedPosition === chord.availablePositions.length) {
        const selectedChord = chord.chords[chord.selectedPosition - 1];
        selectedChord.fingers.forEach(finger => {
            let fingerStringParams = `${chordStringParams !== "" ? "," : ""}f${finger.index}`;
            fingerStringParams += finger.fret;
            fingerStringParams += Array.isArray(finger.string) ? "" + finger.string[0] + finger.string[1] : finger.string;
            chordStringParams += fingerStringParams;
        })

        if (selectedChord.mutedStrings.length > 0) {
            chordStringParams += `${chordStringParams !== "" ? "," : ""}m${selectedChord.mutedStrings.join("")}`;
        }
    }
    return chordStringParams === "" ? chordString : `${chordString}:${chordStringParams}`
}


export function stringToConfigurableChord(chordString: string): ConfigurableChord {
    const {chordTitle, selectedPosition, chord} = parseChordString(chordString);
    const chordFingerings = findGuitarChord(chordTitle);

    if (!chordFingerings) return getEmptyChordConfiguration(chordTitle);
    const allAvailablePositions = chordFingerings.fingerings.map((_: any, index: number) => index + 1);
    const initialSelectedPosition =  selectedPosition || 1;

    const chords: Chord[] = chordFingerings.fingerings.map((fingering: Fingering) => getChordFromFingering(chordTitle, fingering));

    return {
        string: chordString,
        title: chordTitle,
        availablePositions: !!chord ? [...allAvailablePositions, allAvailablePositions.length + 1] : allAvailablePositions,
        isLastPositionCustom: !!chord,
        selectedPosition: !!chord ? allAvailablePositions.length + 1 : initialSelectedPosition,
        chords: !!chord ? [...chords, chord] : chords
    }
}

export function arrayToConfigurableChords(chords: string[]): ConfigurableChord[] {
    return chords.map(chord => {
        return stringToConfigurableChord(chord);
    })
}
