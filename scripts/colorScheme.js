window.schemeUsed = 0
schemesIDs = {
    randomValue:0,
    monochromaticValue:1,
    analogousValue:2,
    complementaryValue:3,
    splitcomplementaryValue:4,
    triadicValue:5,
    squareValue:6,
    rectangleValue:7,
}

function generateMonochromatic(color, n) {
    const [r, g, b] = hexToRgb(color);
    const step = 20;
    const monochromaticColors = [];

    for (let i = 0; i < n; i++) {
        const newColor = rgbToHex(r, g, b + i * step);
        monochromaticColors.push(newColor);
    }

    return monochromaticColors;
}

function generateAnalogous(color, n) {
    const [r, g, b] = hexToRgb(color);
    const angleStep = 30;
    const analogousColors = [];

    for (let i = 0; i < n; i++) {
        const hslColor = `hsl(${(i * angleStep) % 360}, 100%, 50%)`;
        analogousColors.push(hslColor);
    }

    return analogousColors;
}

// Function to generate split complementary colors
function generateSplitComplementary(color) {
    const [r, g, b] = hexToRgb(color);
    const angle = 30; // Adjust this value to control the color difference
    const splitComplementaryColors = [
        color,
        `hsl(${(180 + angle) % 360}, 100%, 50%)`,
        `hsl(${(180 - angle) % 360}, 100%, 50%)`
    ];

    return splitComplementaryColors;
}

function generateGeometricalColors(base, n, angle, rectangle = false) {
    const [r, g, b] = hexToRgb(color);
    const angle = 60; // Adjust this value to control the color difference
    const geometryColors = [color];


    for (let i = 1; i < n / 2; i++) {
        const hslColor1 = `hsl(${(angle * i) % 360}, 100%, 50%)`;
        const hslColor2 = `hsl(${(angle * (i + 3)) % 360}, 100%, 50%)`;
        geometryColors.push(hslColor1, hslColor2);
    }


    for (let i = 1; i < n; i++) {
        let hsvColor = {h:(angle * i) % 360, }
        const dhslColor = rgbToHex(HSVtoRGB());
        geometryColors.push(hslColor);
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
    return generateGeometricalColors(color, n, 60, true);
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