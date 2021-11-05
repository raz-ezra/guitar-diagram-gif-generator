import { SVG, Svg, G, Gradient } from "@svgdotjs/svg.js";

export type ChordDiagramParams = {
    width: number;
    height: number;
    numOfStrings: number;
    numOfFrets: number;
    stringWidth: number;
    fretsWidth: number;
    showFretsLabels: boolean;
    showBridgeLabel: boolean;
    showFingerLabels: boolean;
    showOpenStringsLabels: boolean;
    showTuning: boolean;
    tuning: string[];
    defaultColor: string;
    bridgeColor?: string;
    stringColor?: string;
    fretColor?: string;
    textColor?: string;
    labelColor?: string;
    fingersColor?: string;
    fingersLabelColor?: string;
    backgroundColor: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    debugMode?: boolean;
    animationDuration?: number;
}

export const defaultParams: ChordDiagramParams = {
    width: 500,
    height: 600,
    numOfStrings: 6,
    numOfFrets: 5,
    stringWidth: 1,
    fretsWidth: 1,
    showTuning: true,
    showFretsLabels: false,
    showBridgeLabel: false,
    showFingerLabels: true,
    showOpenStringsLabels: false,
    tuning: ["E", "A", "D", "G", "B", "E"],
    defaultColor: "#666666",
    fingersLabelColor: "#ffffff",
    backgroundColor: "#ffffff",
    animationDuration: 500
}

type TextAttributes = {
    family: ChordDiagramParams["fontFamily"],
    size: ChordDiagramParams["fontSize"],
    style: ChordDiagramParams["fontStyle"],
    weight: ChordDiagramParams["fontWeight"],
    "text-anchor": string,
    opacity: number
}

export class ChordDiagram {

    private draw: Svg;
    private params: ChordDiagramParams = defaultParams;
    private elements: any = {};
    private calcedParams: any = {};

    constructor(selector: string, params: Partial<ChordDiagramParams> = {}) {
        this.params = {
            ...this.params,
            ...params
        }
        this.draw = SVG().addTo(selector).size(this.params.width, this.params.height);

        this.calcedParams.width = this.params.width * 0.75;
        this.calcedParams.height = this.params.height * 0.75;
        this.calcedParams.stringSpacing = this.calcedParams.width / this.params.numOfStrings;
        this.calcedParams.fretSpacing = this.calcedParams.height / (this.params.numOfFrets + 2);
        this.calcedParams.origin = {
            x: this.params.width * 0.15 + this.calcedParams.stringSpacing / 2,
            y: this.params.height * 0.15 + this.calcedParams.fretSpacing
        }
        this.calcedParams.bridgeStrokeWidth = Math.ceil(this.calcedParams.height / 36);
        this.calcedParams.animationDuration = this.params.animationDuration || 500;

        const fontSize = this.params.fontSize || Math.ceil(this.calcedParams.width / 20);
        const maxFontSize = Math.max(this.calcedParams.stringSpacing / 2, this.calcedParams.fretSpacing / 2)
        this.calcedParams.fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
    }

    drawText(layer: Svg | G, x: number, y: number, msg: string, color: string | undefined, attrs: Partial<TextAttributes> = {}) {
        const textAttrs: any = {
            family: this.params.fontFamily || "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
            size: this.calcedParams.fontSize,
            style: this.params.fontStyle,
            weight: this.params.fontWeight || "100",
            opacity: 1,
            ...attrs,
        };

        const text = layer.text(msg)
            .stroke(color || this.params.defaultColor)
            .fill(color || this.params.defaultColor)
            .font(textAttrs);

        return text.move(x - text.length() / 2, y);
    }

    drawLine(layer: Svg | G, fromX: number, fromY: number, toX: number, toY: number) {
        return layer.line(0, 0, toX - fromX, toY - fromY).move(fromX, fromY);
    }

    drawCircle(layer: Svg | G, size: number, x: number, y: number) {
        return layer.circle(size).move(x, y);
    }

    drawPointAt(x: number, y: number) {
        this.draw.circle(4,4).fill("red").move(x - 2,y - 2);
    }

    private printParams() {
        console.log("Calced Params:");
        console.table(this.calcedParams);
        const { strings, frets, layers, ...elements} = this.elements;
        console.log("Strings:");
        console.table(strings);
        console.log("Frets:");
        console.table(frets);
        console.log("Layers:");
        console.table(layers);
        console.log("Other Elements:");
        console.table(elements);
    }

    private debug(points: number[][]) {
        points.forEach((point, index) => {
            console.log(`debug point ${index + 1}: ${point[0]}, ${point[1]}`)
            this.drawPointAt(point[0], point[1]);
        })
    }

    drawBaseDiagram() {
        const baseDiagram = this.draw.group().attr({id: "baseDiagram"});

        //order is important!!
        this.elements.layers = {
            baseDiagram: baseDiagram,
            background: baseDiagram.group().attr({id: "background"}),
            strings: baseDiagram.group().attr({id: "strings"}),
            frets: baseDiagram.group().attr({id: "frets"}),
            fretsCover: baseDiagram.group().attr({id: "fretsCover"}),
            bridge: baseDiagram.group().attr({id: "bridge"}),
            bridgeCover: baseDiagram.group().attr({id: "bridgeCover"}),
            fretLabels: baseDiagram.group().attr({id: "fretLabels"}),
            fretLabelsCover: baseDiagram.group().attr({id: "fretLabelsCover"}),
            stringsLabels: baseDiagram.group().attr({id: "stringsLabels"}),
            fingers: baseDiagram.group().attr({id: "fingers"}),
            stringMarkings: baseDiagram.group().attr({id: "stringMarkings"}),
        };

        const coverTopGradient = this.draw.gradient("linear", (add: Gradient) => {
            add.stop(0, this.params.backgroundColor);
            add.stop(0.9, this.params.backgroundColor);
            add.stop(1, this.params.backgroundColor, 0);
        }).rotate(90);

        const coverTopGradientDebug = this.draw.gradient("linear", (add: Gradient) => {
            add.stop(0, "rgba(255,0,0)", 0.5);
            add.stop(0.9, "rgba(255,0,0)", 0.5);
            add.stop(1, "rgba(0,255,0)", 0.5);
        }).rotate(90);

        const coverBottomGradient =  this.draw.gradient("linear", (add: Gradient) => {
            add.stop(0, this.params.backgroundColor, 0);
            add.stop(0.1, this.params.backgroundColor);
            add.stop(1, this.params.backgroundColor);
        }).rotate(90);

        const coverBottomGradientDebug = this.draw.gradient("linear", (add: Gradient) => {
            add.stop(0, "rgba(0,255,0)", 0.5);
            add.stop(0.1, "rgba(255,0,0)", 0.5);
            add.stop(1, "rgba(255,0,0)", 0.5);
        }).rotate(90);

        const diagramWidth = this.calcedParams.stringSpacing * (this.params.numOfStrings - 1) + this.params.stringWidth;
        const topDiagramCoverXPosition = this.calcedParams.origin.x - this.params.fretsWidth / 2;
        const labelCoverWidth = this.calcedParams.origin.x - this.params.fretsWidth / 2;
        const topLabelCoverHeight = this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth / 2 - this.calcedParams.fontSize / 2;

        /****** BACKGROUND ******/
        this.elements.background = {
            node: this.elements.layers.background.rect(this.params.width, this.params.height)
                .stroke({ width: 0 })
                .fill(this.params.backgroundColor),
        };

        /****** BRIDGE *****/

        // bridge
        const bridgeFromX = this.calcedParams.origin.x - this.params.stringWidth / 2;
        const bridgeFromY = this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth;
        const bridgeHeight = this.calcedParams.origin.y - bridgeFromY;
        const fretLabelXPosition = this.calcedParams.origin.x - this.calcedParams.fontSize / 1.7 - this.calcedParams.stringSpacing / 4;

        this.elements.bridge = {
            node: this.elements.layers.bridge.rect(diagramWidth, bridgeHeight)
                    .move(bridgeFromX, bridgeFromY)
                    .stroke({ width: 0 })
                    .fill(this.params.bridgeColor || this.params.defaultColor),
            label: this.drawText(
                    this.elements.layers.fretLabels,
                    fretLabelXPosition,
                    this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth / 2 - this.calcedParams.fontSize * 0.7,
                    "B",
                this.params.textColor,
                    {
                        opacity: this.params.showBridgeLabel ? 1 : 0
                    })
        };

        // bridge cover
        const bridgeCoverHeight = this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth;
        this.elements.bridgeCover = {
            node: this.elements.layers.bridgeCover.rect(diagramWidth, bridgeCoverHeight)
                    .move(topDiagramCoverXPosition, 0)
                    .stroke({ width: 0 })
                    .fill(this.params.backgroundColor)
        };

        /****** FRETS *****/

        // frets with labels
        this.elements.frets = [];
        for (let i = 0; i < 25; i += 1) {
            const fromY = this.calcedParams.origin.y + this.calcedParams.fretSpacing * i;

            this.elements.frets[i] = {
                node: this.drawLine(
                            this.elements.layers.frets,
                            this.calcedParams.origin.x,
                            fromY,
                            this.calcedParams.origin.x + this.calcedParams.stringSpacing * (this.params.numOfStrings - 1),
                            fromY)
                            .stroke({
                                width: this.params.fretsWidth,
                                color: this.params.fretColor || this.params.defaultColor,
                            }),
                label: i === 0 ? null : this.drawText(
                            this.elements.layers.fretLabels,
                            fretLabelXPosition,
                        fromY - this.params.fretsWidth / 2 - this.calcedParams.fontSize * 0.7,
                            i.toString(),
                        this.params.textColor)

            }
        }

        // frets top cover
        const fretsCoverTopHeight = this.calcedParams.origin.y - this.params.fretsWidth / 2;
        this.elements.fretsCoverTop = {
            node: this.elements.layers.fretsCover.rect(diagramWidth, fretsCoverTopHeight)
                    .move(topDiagramCoverXPosition, 0)
                    .stroke({ width: 0 })
                    .fill(this.params.backgroundColor)
        };

        // frets bottom cover
        const fretsCoverBottomHeight = this.params.height - this.calcedParams.height + this.params.fretsWidth;
        const fretsCoverBottomYPosition = this.calcedParams.origin.y + this.calcedParams.fretSpacing * this.params.numOfFrets + this.params.fretsWidth / 2;
        this.elements.fretsCoverBottom = {
            node: this.elements.layers.fretsCover.rect(this.params.width, fretsCoverBottomHeight)
                    .move(0, fretsCoverBottomYPosition)
                    .stroke({ width: 0 })
                    .fill(this.params.backgroundColor)
        };

        // frets top label cover
        this.elements.fretsLabelCoverTop = {
            node: this.elements.layers.fretLabelsCover.rect(labelCoverWidth, topLabelCoverHeight)
                    .stroke({ width: 0 })
                    .fill(coverTopGradient)
        };

        // frets bottom label cover
        this.elements.fretsLabelCoverBottom = {
            node: this.elements.layers.fretLabelsCover.rect(labelCoverWidth, topLabelCoverHeight + this.calcedParams.fontSize)
                    .move(0, fretsCoverBottomYPosition - this.calcedParams.fontSize * 1.3)
                    .stroke({ width: 0 })
                    .fill(coverBottomGradient)
        };

        // frets side label cover
        if (!this.params.showFretsLabels) {
            this.elements.fretsLabelCoverSide = {
                node: this.elements.layers.fretLabelsCover.rect(labelCoverWidth, topLabelCoverHeight)
                        .move(0, this.calcedParams.origin.y + this.calcedParams.fontSize)
                        .stroke({ width: 0 })
                        .fill(coverBottomGradient)
            };
            this.elements.fretsLabelCoverSide = {
                node: this.elements.layers.fretLabelsCover.rect(labelCoverWidth, this.calcedParams.height)
                    .move(0, this.calcedParams.origin.y + topLabelCoverHeight)
                    .stroke({ width: 0 })
                    .fill(this.params.backgroundColor)
            };
        }

        /****** STRINGS *****/

        // strings with labels
        this.elements.strings = [];
        for (let i = 0; i < this.params.numOfStrings; i += 1) {
            this.elements.strings[i] = {
                node: this.drawLine(
                    this.elements.layers.strings,
                    this.calcedParams.origin.x + this.calcedParams.stringSpacing * i,
                    this.calcedParams.origin.y,
                    this.calcedParams.origin.x + this.calcedParams.stringSpacing * i,
                    this.calcedParams.origin.y + this.calcedParams.fretSpacing * this.params.numOfFrets)
                    .stroke({
                        width: this.params.stringWidth,
                        color: this.params.stringColor || this.params.defaultColor,
                    }),
                label: this.drawText(
                    this.elements.layers.stringsLabels,
                    this.calcedParams.origin.x + this.calcedParams.stringSpacing * i,
                    this.calcedParams.origin.y + this.calcedParams.fretSpacing * this.params.numOfFrets + 10,
                    this.params.tuning[i],
                    this.params.textColor,
                    {
                        opacity: this.params.showTuning ? 1 : 0
                    })
            }
        }

        /****** FINGERS *****/

        // fingers with labels
        this.elements.fingers = [];
        for (let i = 1; i < 5; i += 1) {
            const fingerLayerName = "finger" + i;
            this.elements.layers[fingerLayerName] = this.elements.layers.fingers.group().attr({id: fingerLayerName}).opacity(0);
            const [fingerBasePositionX, fingerBasePositionY] = this.getFingerBasePosition(i);
            this.elements.fingers[i] = {
                node: this.drawCircle(
                    this.elements.layers[fingerLayerName],
                    this.calcedParams.fretSpacing / 2,
                    fingerBasePositionX,
                    fingerBasePositionY)
                    .fill(this.params.fingersColor || this.params.defaultColor),
                label: this.drawText(
                    this.elements.layers[fingerLayerName],
                    fingerBasePositionX + this.calcedParams.fretSpacing / 3.9,
                    this.calcedParams.origin.y + this.calcedParams.fretSpacing * (i - 1) + this.calcedParams.fretSpacing / 3.2,
                    i.toString(),
                    this.params.fingersLabelColor,
                    {
                        size: this.calcedParams.fretSpacing / 3.4,
                        opacity: this.params.showFingerLabels ? 1 : 0
                    })
            }
        }

        // string markings with labels
        this.elements.stringsMarkings = [];
        for (let i = 1; i <= this.params.numOfStrings; i += 1) {
            const openStringMarkingLayerName = "openStringMarking" + i;
            this.elements.layers[openStringMarkingLayerName] = this.elements.layers.fingers.group().attr({id: openStringMarkingLayerName}).opacity(0);
            this.elements.fingers[i] = {
                node: this.drawCircle(
                    this.elements.layers[openStringMarkingLayerName],
                    this.calcedParams.fretSpacing / 3,
                    this.calcedParams.origin.x + this.calcedParams.stringSpacing * (i - 1) - this.calcedParams.fretSpacing / 6,
                    this.getOpenStringMarkingBaseYPosition())
                    .stroke(this.params.defaultColor)
                    .fill(this.params.backgroundColor),
                label: this.drawText(
                    this.elements.layers[openStringMarkingLayerName],
                    this.calcedParams.origin.x + this.calcedParams.stringSpacing * (i - 1),
                    this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing * 0.95,
                    this.params.tuning[i - 1],
                    this.params.defaultColor,
                    {
                        size: this.calcedParams.fretSpacing / 5,
                        opacity: this.params.showOpenStringsLabels ? 1 : 0
                    })
            }
            const mutedStringMarkingLayerName = "mutedStringMarking" + i;
            this.elements.layers[mutedStringMarkingLayerName] = this.elements.layers.fingers.group().attr({id: mutedStringMarkingLayerName}).opacity(0);
            this.elements.fingers[i] = {
                node: null,
                label: this.drawText(
                    this.elements.layers[mutedStringMarkingLayerName],
                    this.calcedParams.origin.x + this.calcedParams.stringSpacing * (i - 1),
                    this.getMutedStringMarkingBaseYPosition(),
                    "X",
                    this.params.defaultColor,
                    {
                        size: this.calcedParams.fretSpacing / 3,
                    })
            }
        }

        this.moveDiagramToFret(0)

        this.params.debugMode && this.printParams()
    }

    getOpenStringMarkingBaseYPosition() {
        return this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing;
    }

    getMutedStringMarkingBaseYPosition() {
        return this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing * 1.05;
    }

    getFingerBasePosition(fingerIndex: number) {
        const x = this.calcedParams.origin.x + this.calcedParams.stringSpacing * (this.params.numOfStrings - 0.5);
        const y = this.calcedParams.origin.y + this.calcedParams.fretSpacing * (fingerIndex - 1) + this.calcedParams.fretSpacing / 4;
        return [x, y];
    }

    getFingerChordPosition(chordPosition: number, finger: number[]) {
        const [_, stringNumber, fretNumber] =  finger;
        const fretsToAdd = chordPosition === 0 ? 0 : 1;
        const moveToX = this.calcedParams.origin.x + (this.params.numOfStrings - stringNumber - 0.25) * this.calcedParams.stringSpacing;
        const moveToY = this.calcedParams.origin.y + (fretNumber - chordPosition + fretsToAdd - 0.75) * this.calcedParams.fretSpacing;
        return [moveToX, moveToY];
    }

    moveDiagramToFret(fretNumber: number, animate?: boolean) {
        const maxStartFret = 25 - this.params.numOfFrets;
        if (fretNumber > maxStartFret) {
            console.error(`Max fret allowed as start position is ${maxStartFret}`);
            return;
        }

        const bridgeTopY = this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth;
        const labelsTopY = this.calcedParams.origin.y - this.calcedParams.fontSize * 0.9;
        if (animate) {
            this.elements.layers.bridge.animate(this.calcedParams.animationDuration).y(bridgeTopY - this.calcedParams.fretSpacing * fretNumber);
            this.elements.layers.frets.animate(this.calcedParams.animationDuration).y(this.calcedParams.origin.y - this.calcedParams.fretSpacing * fretNumber);
            this.elements.layers.fretLabels.animate(this.calcedParams.animationDuration).y(labelsTopY - this.calcedParams.fretSpacing * fretNumber);
        }
        else {
            this.elements.layers.bridge.y(bridgeTopY - this.calcedParams.fretSpacing * fretNumber);
            this.elements.layers.frets.y(this.calcedParams.origin.y - this.calcedParams.fretSpacing * fretNumber);
            this.elements.layers.fretLabels.y(labelsTopY - this.calcedParams.fretSpacing * fretNumber);
        }

    }

    drawChord(chord: any, animate?: boolean) {

        this.moveDiagramToFret(chord.position, animate);
        for (let i = 1; i < 5; i++) {
            const finger = chord.fingers.find((finger: number[]) => finger[0] === i);
            if (finger) {
                if (animate) {
                    this.elements.layers["finger" + finger[0]].animate(this.calcedParams.animationDuration).move(...this.getFingerChordPosition(chord.position, finger)).opacity(1)
                }
                else {
                    this.elements.layers["finger" + finger[0]].move(...this.getFingerChordPosition(chord.position, finger)).opacity(1)
                }

            }
            else {
                if (animate) {
                    this.elements.layers["finger" + i].animate(this.calcedParams.animationDuration).move(...this.getFingerBasePosition(i)).opacity(0)
                }
                else {
                    this.elements.layers["finger" + i].move(...this.getFingerBasePosition(i)).opacity(0)
                }

            }
        }

        for (let i = 1; i <= this.params.numOfStrings; i++) {
            if (chord.mutedStrings.includes(this.params.numOfStrings - i + 1)) {
                if (animate) {
                    this.elements.layers["mutedStringMarking" + i].animate(this.calcedParams.animationDuration).y(this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing * 0.53).opacity(1);
                }
                else {
                    this.elements.layers["mutedStringMarking" + i].y(this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing * 0.53).opacity(1);
                }
            }
            else {
                if (animate) {
                    this.elements.layers["mutedStringMarking" + i].animate(this.calcedParams.animationDuration).y(this.getMutedStringMarkingBaseYPosition()).opacity(0);
                }
                else {
                    this.elements.layers["mutedStringMarking" + i].y(this.getMutedStringMarkingBaseYPosition()).opacity(0);
                }
            }

            if (chord.openStrings.includes(this.params.numOfStrings - i + 1)) {
                if (animate) {
                    this.elements.layers["openStringMarking" + i].animate(this.calcedParams.animationDuration).y(this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing * 0.5).opacity(1);
                }
                else {
                    this.elements.layers["openStringMarking" + i].y(this.calcedParams.origin.y - this.calcedParams.bridgeStrokeWidth - this.calcedParams.fretSpacing * 0.5).opacity(1);
                }
            }
            else {
                if (animate) {
                    this.elements.layers["openStringMarking" + i].animate(this.calcedParams.animationDuration).y(this.getOpenStringMarkingBaseYPosition()).opacity(0);
                }
                else {
                    this.elements.layers["openStringMarking" + i].y(this.getOpenStringMarkingBaseYPosition()).opacity(0);
                }
            }
        }
    }
}