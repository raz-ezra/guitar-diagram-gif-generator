const Chords: any = {
  C: {
    Major: {
      chord: [
        [1, 0],
        [2, 1, "1"],
        [3, 0],
        [4, 2, 2],
        [5, 3, 3],
      ],
      position: 0,
      barres: [],
    },
    7: {
      chord: [
        [1, 0],
        [2, 1, 1],
        [3, 3, 4],
        [4, 2, 2],
        [5, 3, 3],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
  },
  D: {
    Major: {
      chord: [
        [1, 2, 2],
        [2, 3, 3],
        [3, 2, "1"],
        [4, 0, "D"],
        [5, "x"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
    Minor: {
      chord: [
        [1, 1, 1],
        [2, 3, 3],
        [3, 2, 2],
        [4, 0, "D"],
        [5, "x"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
    7: {
      chord: [
        [1, 2, 3],
        [2, 1, 1],
        [3, 2, 2],
        [4, 0, "D"],
        [5, "x"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
    m7: {
      chord: [
        [3, 2, 2],
        [4, 0],
        [5, "x"],
        [6, "x"],
      ],
      position: 0,
      barres: [{ fromString: 2, toString: 1, fret: 1 }],
    },
  },
  E: {
    Major: {
      chord: [
        [1, 0, "E"],
        [2, 0],
        [3, 1, 1],
        [4, 2, 3],
        [5, 2, 2],
        [6, 0, "E"],
      ],
      position: 0,
      barres: [],
    },
    Minor: {
      chord: [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 2, 3],
        [5, 2, 2],
        [6, 0, "E"],
      ],
      position: 0,
      barres: [],
    },
    7: {
      chord: [
        [1, 0],
        [2, 3, 4],
        [3, 1, 1],
        [4, 0],
        [5, 2, 2],
        [6, 0, "E"],
      ],
      position: 0,
      barres: [],
    },
    m7: {
      chord: [
        [1, 0],
        [2, 3, 4],
        [3, 0],
        [4, 0],
        [5, 2, 1],
        [6, 0, "E"],
      ],
      position: 0,
      barres: [],
    },
  },
  F: {
    Major: {
      chord: [
        [3, 3],
        [4, 4],
        [5, 4],
      ],
      position: 2,
      barres: [{ fromString: 6, toString: 1, fret: 1 }],
    },
  },
  "F#": {
    Major: {
      chord: [
        [3, 3],
        [4, 4],
        [5, 4],
      ],
      position: 2,
      barres: [{ fromString: 6, toString: 1, fret: 1 }],
    },
  },
  G: {
    Major: {
      chord: [
        [1, 3, 4],
        [2, 3, 3],
        [3, 0, "G"],
        [4, 0],
        [5, 2, 1],
        [6, 3, 2],
      ],
      position: 0,
      barres: [],
    },
    7: {
      chord: [
        [1, 1, 1],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 2, 2],
        [6, 3, 3],
      ],
      position: 0,
      barres: [],
    },
  },
  A: {
    Major: {
      chord: [
        [1, 0],
        [2, 2, 3],
        [3, 2, 2],
        [4, 2, 1],
        [5, 0, "A"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
    Minor: {
      chord: [
        [1, 0],
        [2, 1, 1],
        [3, 2, 3],
        [4, 2, 2],
        [5, 0, "A"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
    7: {
      chord: [
        [1, 0],
        [2, 2, 3],
        [3, 0],
        [4, 2, 2],
        [5, 0, "A"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
    m7: {
      chord: [
        [1, 0],
        [2, 1, 1],
        [3, 0],
        [4, 2, 2],
        [5, 0, "A"],
        [6, "x"],
      ],
      position: 0,
      barres: [],
    },
  },
};

export default Chords;
