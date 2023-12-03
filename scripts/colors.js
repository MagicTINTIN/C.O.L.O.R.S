window.hueType = 0;
window.schemeUsed = 0;

const hueTypeIDs = {
    normalHueType: 0,
    adobeHueType: 1
}

const schemesbyID = [
    "randomValue",
    "monochromaticValue",
    "analogousValue",
    "complementaryValue",
    "splitcomplementaryValue",
    "doublesplitcomplementaryValue",
    "compoundValue",
    "triadicValue",
    "squareValue",
    "rectangleValue"
];

const schemesIDs = {
    randomValue: 0,
    monochromaticValue: 1,
    analogousValue: 2,
    complementaryValue: 3,
    splitcomplementaryValue: 4,
    doublesplitcomplementaryValue: 5,
    compoundValue: 6,
    triadicValue: 7,
    squareValue: 8,
    rectangleValue: 9,
}

const schemesIcons = {
    randomValue: "~",
    monochromaticValue: "⋯",
    analogousValue: "⦠",
    complementaryValue: "-",
    splitcomplementaryValue: "∹",
    doublesplitcomplementaryValue: "∺",
    compoundValue: "⊼",
    triadicValue: "△",
    squareValue: "◻",
    rectangleValue: "▭",
}

const schemesDescriptions = {
    randomValue: "Random",
    monochromaticValue: "Monochromatic",
    analogousValue: "Analogous",
    complementaryValue: "Complementary",
    splitcomplementaryValue: "SplitCompl.",
    doublesplitcomplementaryValue: "Dbl.Spl.Compl.",
    compoundValue: "Compound",
    triadicValue: "Triad",
    squareValue: "Square",
    rectangleValue: "Rectangle",
}

const schemesButtonIds = {
    randomValue: "randomBtnGen",
    monochromaticValue: "monochromaticBtnGen",
    analogousValue: "analogousBtnGen",
    complementaryValue: "complementaryBtnGen",
    splitcomplementaryValue: "splitcomplementaryBtnGen",
    doublesplitcomplementaryValue: "doublesplitcomplementaryBtnGen",
    compoundValue: "compoundBtnGen",
    triadicValue: "triadicBtnGen",
    squareValue: "squareBtnGen",
    rectangleValue: "rectangleBtnGen",
}

function setGenMethodDisplay(selected) {
    document.getElementById(schemesButtonIds[schemesbyID[window.schemeUsed]]).classList.remove("selectedBtnGen");
    document.getElementById(schemesButtonIds[selected]).classList.add("selectedBtnGen");
    window.schemeUsed = schemesIDs[selected];
    document.getElementById("iconGen").innerHTML = schemesIcons[selected];
    document.getElementById("descriptionGen").innerHTML = schemesDescriptions[selected];
}
setGenMethodDisplay(schemesbyID[window.schemeUsed]);

const RANDOM = 0;
const MONOCHROMATIC = 1;
const ANALOGOUS = 2;
const COMPLEMENTARY = 3;
const SPLIT_COMPLEMENTARY = 4;
const DOUBLE_SPLIT_COMPLEMENTARY = 5;
const COMPOUND = 6;
const TRIADIC = 7;
const SQUARE = 8;
const RECTANGLE = 9;

function newRandomColor() {
    let color = ''
    for (let i = 0; i < 6; i++) {
        let randomVal = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
        if (randomVal == 10) {
            randomVal = 'A'
        } else if (randomVal === 11) {
            randomVal = 'B'
        } else if (randomVal === 12) {
            randomVal = 'C'
        } else if (randomVal === 13) {
            randomVal = 'D'
        } else if (randomVal === 14) {
            randomVal = 'E'
        } else if (randomVal === 15) {
            randomVal = 'F'
        }
        color = color + randomVal
    }
    return color
}

function colorsGenerator(isFirst, colorNumber = 5, existingColors = []) {
    if (isFirst) {
        let colors = []
        for (let i = 0; i < colorNumber; i++) {
            let color = newRandomColor();
            colors = [...colors, { isLocked: false, hex: color }];
        }
        existingColors = colors;
    }
    if (window.schemeUsed == RANDOM) {
        let colors = []
        existingColors.map((col) => {
            if (col.isLocked === false) {
                let color = newRandomColor();
                col.hex = color;
                colors = [...colors, col];
            }
            else {
                colors = [...colors, col];
            }
        });
        return colors;
    } else {
        let colors = []
        let numberOfColorToGen = 1;
        existingColors.map((col) => { if (col.isLocked === false) numberOfColorToGen++; });

        let col = existingColors[0];
        let startingColor = "#000000";
        if (col.isLocked === false) {
            let color = newRandomColor();
            col.hex = color;
            startingColor = color;
        }
        else {
            startingColor = col.hex;
        }

        let geometricColors = [];
        if (window.schemeUsed == MONOCHROMATIC) geometricColors = generateMonochromatic(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == ANALOGOUS) geometricColors = generateAnalogous(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == COMPLEMENTARY) geometricColors = generateComplementary(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == SPLIT_COMPLEMENTARY) geometricColors = generateSplitComplementary(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == DOUBLE_SPLIT_COMPLEMENTARY) geometricColors = generateDoubleSplitComplementary(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == COMPOUND) geometricColors = generateCompound(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == TRIADIC) geometricColors = generateTriadic(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == SQUARE) geometricColors = generateSquare(startingColor, numberOfColorToGen);
        else if (window.schemeUsed == RECTANGLE) geometricColors = generateRectangle(startingColor, numberOfColorToGen);
        else return existingColors;

        let newColorIndex = 0;
        existingColors.map((col) => {
            if (col.isLocked === false) {
                let color = geometricColors[newColorIndex];
                col.hex = color;
                colors = [...colors, col];
                newColorIndex++;
            }
            else {
                colors = [...colors, col];
                if (newColorIndex == 0)
                    newColorIndex++;
            }
        });
        return colors;
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase();
}

function rgbColorToHex(rgbColor) {
    return rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function isColorBright(hexColor, mode = 1) {
    let color = hexToRgb(hexColor);
    const r = color.r;
    const g = color.g;
    const b = color.b;

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    if (mode == 1)
        return hsp > 127.5;
    if (mode == 2)
        return brightness > 128;

    return false;
}

function findMediumColor(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const mediumColor = {
        r: Math.floor((rgb1.r + rgb2.r) / 2),
        g: Math.floor((rgb1.g + rgb2.g) / 2),
        b: Math.floor((rgb1.b + rgb2.b) / 2),
    };

    return rgbToHex(mediumColor.r, mediumColor.g, mediumColor.b);
}

function isValidHexColor(hex) {
    let checkHex = hex.split("#").join("");
    const hexRegex = /^([0-9a-fA-F]{6})$/; //[0-9a-fA-F]{3}| but I don't want the 3th version
    return hexRegex.test(checkHex);
}

RGBtoHSV = function (color) {
    if (window.hueType == 1)
        return adobeRGBtoHSV(color);
    else
        return classicRGBtoHSV(color);
};

HSVtoRGB = function (color) {
    if (window.hueType == 1)
        return adobeHSVtoRGB(color);
    else
        return classicHSVtoRGB(color);
}

function rotateColor(hsvColor, factor) {
    hsvColor.h = (hsvColor.h + factor) % 360;
    return hsvColor;
}

function saturateColor(hsvColor, factor) {
    hsvColor.s = Math.min(Math.max(hsvColor.s + factor, 0), 1);
    return hsvColor;
}

function lightenColor(hsvColor, factor) {
    hsvColor.v = Math.min(Math.max(hsvColor.v + factor, 0), 1);
    return hsvColor;
}

function modifyHSVColor(colorHex, hFactor = 0, sFactor = 0, vFactor = 0) {
    let prefix = colorHex.startsWith("#");
    let rgbValues = hexToRgb((prefix ? "" : "#") + colorHex);
    let hsvValues = RGBtoHSV(rgbValues);

    hsvValues = rotateColor(hsvValues, hFactor)
    hsvValues = saturateColor(hsvValues, sFactor)
    hsvValues = lightenColor(hsvValues, vFactor)

    rgbValues = HSVtoRGB(hsvValues);
    if (prefix)
        return rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b);
    return rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b).replace("#", "");
}