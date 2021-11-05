import {tokenizer} from './tokenizer';
import {parser} from './parser';

// const chordsfreeText = `
// Let it be
// 4X4
// Opening
// ||: C G | 2(Am) Fmaj7 F6  |
// |  C  G | 2(F) Em Dm 4(C) ||

// Verse
// ||: C G  | Am Fmaj7 | C G | F . Em Dm C . . . :||

// Chorus
// ||: Am G | F    C   | C G | F . Em Dm C . . . :||
// `;

// const chords = `|: C G | Am Am Fmaj7 F6  |  C  G | F F Em Dm C C C C :|`;


export const parseChords = (input: string) => {
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    
    // currently only supports bars
    console.log(ast);
    // @ts-ignore
    return ast.body.filter(node => node.type === 'bar').flatMap(node => node.chords.map(chord => chord.value));
}
