window.schemeUsed = 0
schemesIDs = {
    randomValue: 0,
    monochromaticValue: 1,
    analogousValue: 2,
    complementaryValue: 3,
    splitcomplementaryValue: 4,
    triadicValue: 5,
    squareValue: 6,
    rectangleValue: 7,
}

const NORMAL_DISTRIBUTION = 0;
const MONOCHROMATIC_DISTRIBUTION = 1;
const ANALOGOUS_DISTRIBUTION = 2;
const SPLIT_COMP_DISTRIBUTION = 3;
const RECTANGLE_DISTRIBUTION = 4;

function generateGeometricalColors(base, n, angle, type = NORMAL_DISTRIBUTION) {
    const baseColor = hexToRgb(base);
    const hsvBase = RGBtoHSV(baseColor)

    const geometryColors = [color];

    if (type == NORMAL_DISTRIBUTION) {
        for (let i = 1; i < n; i++) {
            let hsvColor = { h: (angle * i) % 360, }
            const dhslColor = rgbToHex(HSVtoRGB());
            geometryColors.push(hslColor);
        }
    }
    else if (type == MONOCHROMATIC_DISTRIBUTION) {
        for (let i = 0; i < n; i++) {
            const newColor = rgbToHex(r, g, b + i * step);
            monochromaticColors.push(newColor);
        }
    }
    else if (type == RECTANGLE_DISTRIBUTION) {
        for (let i = 1; i < n / 2; i++) {
            const hslColor1 = `hsl(${(angle * i) % 360}, 100%, 50%)`;
            const hslColor2 = `hsl(${(angle * (i + 3)) % 360}, 100%, 50%)`;
            geometryColors.push(hslColor1, hslColor2);
        }
    }
    else if (type == SPLIT_COMP_DISTRIBUTION) {
        const splitComplementaryColors = [
            color,
            `hsl(${(180 + angle) % 360}, 100%, 50%)`,
            `hsl(${(180 - angle) % 360}, 100%, 50%)`
        ];

    }
    else if (type == ANALOGOUS_DISTRIBUTION) {
        for (let i = 0; i < n; i++) {
            const hslColor = `hsl(${(i * angleStep) % 360}, 100%, 50%)`;
            analogousColors.push(hslColor);
        }
    }

    return geometryColors;
}

function generateComplementary(color) {
    return generateGeometricalColors(color, n, 180);
}

function generateTriadic(color, n) {
    return generateGeometricalColors(color, n, 120);
}

function generateSquare(color, n) {
    return generateGeometricalColors(color, n, 90);
}

function generateRectangle(color, n) {
    return generateGeometricalColors(color, n, 60, RECTANGLE_DISTRIBUTION);
}

function generateMonochromatic(color, n) {
    return generateGeometricalColors(color, n, 0, MONOCHROMATIC_DISTRIBUTION);
}

function generateSplitComplementary(color, angle = 30) {
    return generateGeometricalColors(color, n, angle, SPLIT_COMP_DISTRIBUTION);
}

function generateAnalogous(color, n, angleStep = 30) {
    return generateGeometricalColors(color, n, angleStep, ANALOGOUS_DISTRIBUTION);
}


const startingColor = "#FF0000";
const numberOfColors = 5;

const monochromatic = generateMonochromatic(startingColor, numberOfColors);
const analogous = generateAnalogous(startingColor, numberOfColors);
const complementary = generateComplementary(startingColor);
const splitComplementary = generateSplitComplementary(startingColor);
const triadic = generateTriadic(startingColor, numberOfColors);
const square = generateSquare(startingColor, numberOfColors);
const rectangle = generateRectangle(startingColor, numberOfColors);

console.log("Monochromatic:", monochromatic);
console.log("Analogous:", analogous);
console.log("Complementary:", complementary);
console.log("Split Complementary:", splitComplementary);
console.log("Triadic:", triadic);
console.log("Square:", square);
console.log("Rectangle:", rectangle);