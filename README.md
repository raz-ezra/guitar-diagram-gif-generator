Simple UI for creating animated guitar chord diagrams

<img src="/docs/DiagramGif.gif" alt="Animated Guitar Chord Diagram" width="200" align="center"/>



# Usage

To add chords to your sequence, use the right panel `Chord Sequencer` Tab.
You can use the `Chord Sequence Text Input` at the top of the panel, or add chords individually.

General settings (appearance, animation, etc.) can be changed in the `Diagram Configuration` tab.

## Chord Sequencer

![Chords Text Input and Chord Box](/docs/ChordSequencerUI.png)

### Chord Sequence Text Input

Type your chord sequence, separating each chord with a space. 
Each of the chords in the sequence will receive its own chord box down the panel where it can be customized.

### Chord Boxes

You can add more chords by clicking `+ Add Chord` at the bottom of the panel.

Each chord has the following controls:
- **Chord**: The title of the chord. After changing, the other attributes will auto-fill, trying to find the best match. If no match was found, the chord will be marked with a warning.
- **Position**: Choose from a list of available position to each chord.
- **Start Fret**: The lowest fret in the chord position (the diagram shift between frets when animating, so we need to know the lowest fret to present)
- **Strings + Finger Positioning**: For each string, you can mark if and which finger presses which fret.

## Diagram Configuration
In the `Diagram Configuration` you can change the appearance and animation properties of the diagram.

![Diagram Configuration](/docs/DiagramConfigurationUI.png)

### TODOs

- Export a GIF of the animation after creation
- Finalize syntax for customizing chords from the text input
- Add an option to not render chord titles

### Known Bugs

- Sometimes the first chord appears without a title


### Running Locally

To run this project locally, clone this repo, `npm install`, and `npm start`

### Notable mentions :)

- Fingering is calculated using [chord-fingering](https://github.com/hyvyys/chord-fingering)