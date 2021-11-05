const Chords2: any = {
    C: {
        Major: {
            fingers: [[1,2,1],[2,4,2],[3,5,3]],
            openStrings: [1,3],
            mutedStrings: [6],
            position: 0,
            barres: []
        },
        7: {
            fingers: [[1,2,1],[2,4,2],[3,5,3],[4,3,3]],
            openStrings: [1],
            mutedStrings: [6],
            position: 0,
            barres: []
        }
    },
    D: {
        Major: {
            fingers: [[1,3,2],[2,1,2],[3,2,3]],
            openStrings: [4],
            mutedStrings: [5,6],
            position: 0,
            barres: []
        },
        Minor: {
            fingers: [[1,1,1],[2,3,2],[3,2,3]],
            openStrings: [4],
            mutedStrings: [5,6],
            position: 0,
            barres: []
        },
        7: {
            fingers: [[1,2,1],[2,3,2],[3,1,2]],
            openStrings: [4],
            mutedStrings: [5,6],
            position: 0,
            barres: []
        },
        m7: {
            fingers: [[1,2,1], [2,3,2]],
            openStrings: [4],
            mutedStrings: [5,6],
            position: 0,
            barres: [[1,1]]
        }
    },
    E: {
        Major: {
            fingers: [[1,3,1],[2,5,2],[3,4,2]],
            openStrings: [1,2,6],
            mutedStrings: [],
            position: 0,
            barres: []
        },
        Minor: {
            fingers: [[2,5,2],[3,4,2]],
            openStrings: [1,2,3,6],
            mutedStrings: [],
            position: 0,
            barres: []
        },
        7: {
            fingers: [[1,3,1],[2,5,2],[4,2,3]],
            openStrings: [1,4,6],
            mutedStrings: [],
            position: 0,
            barres: []
        },
        m7: {
            fingers: [[1,5,2],[4,2,3]],
            openStrings: [1,3,4,6],
            mutedStrings: [],
            position: 0,
            barres: []
        }
    },
    "F#": {
        Major: {
            fingers: [[1,6,2],[2,3,3],[3,5,4],[4,4,4]],
            openStrings: [],
            mutedStrings: [],
            position: 2,
            barres: []
        }
    },
    G: {
        Major: {
            fingers: [[1,5,2],[2,6,3],[4,1,3]],
            openStrings: [2,3,4],
            mutedStrings: [],
            position: 0,
            barres: []
        },
        7: {
            fingers: [[1,1,1],[2,5,2],[3,6,3]],
            openStrings: [2,3,4],
            mutedStrings: [],
            position: 0,
            barres: []
        }
    },
    A: {
        Major: {
            fingers: [[1,4,2],[2,3,2],[3,2,2]],
            openStrings: [1,5],
            mutedStrings: [6],
            position: 0,
            barres: []
        },
        Minor: {
            fingers: [[1,2,1],[2,4,2],[3,3,2]],
            openStrings: [1,5],
            mutedStrings: [6],
            position: 0,
            barres: []
        },
        7: {
            fingers: [[2,4,2],[3,2,2]],
            openStrings: [1,3,5],
            mutedStrings: [6],
            position: 0,
            barres: []
        },
        m7: {
            fingers: [[1,2,1],[2,4,2]],
            openStrings: [1,3,5],
            mutedStrings: [6],
            position: 0,
            barres: []
        }
    }
}

export default Chords2;