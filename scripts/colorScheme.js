window.schemeUsed = 0
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

const UNIFORM_DISTRIBUTION = 0;
const MONOCHROMATIC_DISTRIBUTION = 1;
const ANALOGOUS_DISTRIBUTION = 2;
const RECTANGLE_DISTRIBUTION = 3;
const SPLIT_COMP_DISTRIBUTION = 4;
const DOUBLE_SPLIT_COMP_DISTRIBUTION = 5;
const COMPOUND_DISTRIBUTION = 6;

const VARIATION_FACTOR = 0.75;

function generateGeometricalColors(base, n, angle, type = UNIFORM_DISTRIBUTION, cycleSize = 360 / angle) {
    const prefix = base.startsWith("#");
    const rgbBase = hexToRgb((prefix ? "" : "#") + base);
    const hsvBase = RGBtoHSV(rgbBase)

    const geometryColors = [base];
    const baseHue = hsvBase.h;
    const baseSat = hsvBase.s;
    const baseVal = hsvBase.v;

    let minVariations, maxVariations, maxVariationsUntil;
    let hasVariations = false;

    if (type == MONOCHROMATIC_DISTRIBUTION) cycleSize = 1;
    else if (type == ANALOGOUS_DISTRIBUTION) cycleSize = -1;
    else if (type == RECTANGLE_DISTRIBUTION) cycleSize = 4;
    else if (type == SPLIT_COMP_DISTRIBUTION) cycleSize = 3;
    else if (type == DOUBLE_SPLIT_COMP_DISTRIBUTION) cycleSize = 5;
    else if (type == COMPOUND_DISTRIBUTION) cycleSize = 4;

    if (cycleSize > 0) {
        minVariations = Math.floor(n / cycleSize);
        hasVariations = n % cycleSize != 0;
        maxVariations = minVariations + (hasVariations ? 1 : 0);
        maxVariationsUntil = cycleSize - (maxVariations * cycleSize - n);
    }

    if (type == UNIFORM_DISTRIBUTION) {
        if (cycleSize > 0) {
            for (let varnb = 1; varnb < maxVariations; varnb++) {
                let hsvColor = { h: baseHue, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
                const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
                if (prefix)
                    geometryColors.push(newColor);
                else
                    geometryColors.push(newColor.replace("#", ""));
            }
            for (let colornb = 1; colornb < cycleSize; colornb++) {
                let nbvariations = colornb < maxVariationsUntil ? maxVariations : minVariations;

                for (let varnb = 0; varnb < nbvariations; varnb++) {
                    let hsvColor = { h: (baseHue + angle * colornb) % 360, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
                    const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
                    if (prefix)
                        geometryColors.push(newColor);
                    else
                        geometryColors.push(newColor.replace("#", ""));
                }
            }
        }
        else {
            for (let i = 1; i < n; i++) {
                let hsvColor = { h: (baseHue + angle * i) % 360, s: baseSat, v: baseVal }
                const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
                if (prefix)
                    geometryColors.push(newColor);
                else
                    geometryColors.push(newColor.replace("#", ""));
            }
        }
    }
    else if (type == MONOCHROMATIC_DISTRIBUTION) {
        for (let varnb = 1; varnb < n; varnb++) {
            let hsvColor = { h: baseHue, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
            const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
            if (prefix)
                geometryColors.push(newColor);
            else
                geometryColors.push(newColor.replace("#", ""));
        }
    }
    else if (type == ANALOGOUS_DISTRIBUTION) {
        let before = Math.floor((n - 1) / 2);
        let after = before + ((n - 1) % 2 == 0 ? 0 : 1);

        for (let anb = 1; anb < after + 1; anb++) {
            let hsvColor = { h: (baseHue + angle * anb / after) % 360, s: baseSat, v: baseVal }
            const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
            if (prefix)
                geometryColors.push(newColor);
            else
                geometryColors.push(newColor.replace("#", ""));
        }

        for (let anb = 1; anb < before + 1; anb++) {
            let hsvColor = { h: (baseHue - angle * anb / before) % 360, s: baseSat, v: baseVal }
            const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
            if (prefix)
                geometryColors.push(newColor);
            else
                geometryColors.push(newColor.replace("#", ""));
        }
    }

    else if (type == RECTANGLE_DISTRIBUTION) {
        for (let varnb = 1; varnb < maxVariations; varnb++) {
            let hsvColor = { h: baseHue, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
            const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
            if (prefix)
                geometryColors.push(newColor);
            else
                geometryColors.push(newColor.replace("#", ""));
        }
        for (let colornb = 1; colornb < cycleSize; colornb++) {
            let nbvariations = colornb < maxVariationsUntil ? maxVariations : minVariations;

            let newAngle = baseHue;
            if (colornb % 4 == 1) {
                newAngle = (baseHue + angle) % 360;
            }
            else if (colornb % 4 == 2) {
                newAngle = (baseHue + 180) % 360;
            }
            else if (colornb % 4 == 3) {
                newAngle = (baseHue + 180 + angle) % 360;
            }

            for (let varnb = 0; varnb < nbvariations; varnb++) {
                let hsvColor = { h: newAngle, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
                const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
                if (prefix)
                    geometryColors.push(newColor);
                else
                    geometryColors.push(newColor.replace("#", ""));
            }
        }
    }
    else if (type == SPLIT_COMP_DISTRIBUTION) {
        const splitComplementaryColors = [
            color,
            `hsl(${(180 + angle) % 360}, 100%, 50%)`,
            `hsl(${(180 - angle) % 360}, 100%, 50%)`
        ];

    }
    else if (type == DOUBLE_SPLIT_COMP_DISTRIBUTION) {
        const splitComplementaryColors = [
            color,
            `hsl(${(180 + angle) % 360}, 100%, 50%)`,
            `hsl(${(180 - angle) % 360}, 100%, 50%)`,
            `hsl(${(0 + angle) % 360}, 100%, 50%)`,
            `hsl(${(0 - angle) % 360}, 100%, 50%)`
        ];

    }
    else if (type == COMPOUND_DISTRIBUTION) {
        for (let varnb = 1; varnb < maxVariations; varnb++) {
            let hsvColor = { h: baseHue, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
            const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
            if (prefix)
                geometryColors.push(newColor);
            else
                geometryColors.push(newColor.replace("#", ""));
        }
        for (let colornb = 1; colornb < cycleSize; colornb++) {
            let nbvariations = colornb < maxVariationsUntil ? maxVariations : minVariations;

            let newAngle = baseHue;
            if (colornb % 4 == 1) {
                newAngle = (baseHue - angle) % 360;
            }
            else if (colornb % 4 == 2) {
                newAngle = (baseHue + 180) % 360;
            }
            else if (colornb % 4 == 3) {
                newAngle = (baseHue + 180 + angle) % 360;
            }

            for (let varnb = 0; varnb < nbvariations; varnb++) {
                let hsvColor = { h: newAngle, s: baseSat * VARIATION_FACTOR ** varnb, v: baseVal * VARIATION_FACTOR ** varnb }
                const newColor = rgbColorToHex(HSVtoRGB(hsvColor));
                if (prefix)
                    geometryColors.push(newColor);
                else
                    geometryColors.push(newColor.replace("#", ""));
            }
        }
    }
    else {
        // by default push only base color
        for (let varnb = 1; varnb < n; varnb++) {
            geometryColors.push(base);
        }
    }

    return geometryColors;
}

function generateComplementary(color, n) {
    return generateGeometricalColors(color, n, 180, UNIFORM_DISTRIBUTION);
}

function generateTriadic(color, n) {
    return generateGeometricalColors(color, n, 120, UNIFORM_DISTRIBUTION);
}

function generateSquare(color, n) {
    return generateGeometricalColors(color, n, 90, UNIFORM_DISTRIBUTION);
}

function generateRectangle(color, n) {
    return generateGeometricalColors(color, n, 60, RECTANGLE_DISTRIBUTION, 4);
}

function generateMonochromatic(color, n) {
    return generateGeometricalColors(color, n, 0, MONOCHROMATIC_DISTRIBUTION, -1);
}

function generateSplitComplementary(color, n, angle = 30) {
    return generateGeometricalColors(color, n, angle, SPLIT_COMP_DISTRIBUTION, 3);
}

function generateDoubleSplitComplementary(color, n, angle = 30) {
    return generateGeometricalColors(color, n, angle, DOUBLE_SPLIT_COMP_DISTRIBUTION, 5);
}

function generateCompound(color, n, angle = 30) {
    return generateGeometricalColors(color, n, angle, COMPOUND_DISTRIBUTION, 4);
}

function generateAnalogous(color, n, angleMax = 36) {
    return generateGeometricalColors(color, n, angleMax, ANALOGOUS_DISTRIBUTION, -1);
}


let startingColor = "#FF0000";
const numberOfColors = 6;

const monochromatic = generateMonochromatic(startingColor, numberOfColors);
const analogous = generateAnalogous(startingColor, numberOfColors);
const complementary = generateComplementary(startingColor, numberOfColors);
// const splitComplementary = generateSplitComplementary(startingColor, numberOfColors);
// const doubleSplitComplementary = generateDoubleSplitComplementary(startingColor, numberOfColors);
// const compound = generateCompound(startingColor, numberOfColors);
const triadic = generateTriadic(startingColor, numberOfColors);
const square = generateSquare(startingColor, numberOfColors);
const rectangle = generateRectangle(startingColor, numberOfColors);

console.log("Monochromatic:", monochromatic);
console.log("Analogous:", analogous);
console.log("Complementary:", complementary);
// console.log("Split Complementary:", splitComplementary);
// console.log("Double Split Complementary:", doubleSplitComplementary);
// console.log("Compound:", compound);
console.log("Triadic:", triadic);
console.log("Square:", square);
console.log("Rectangle:", rectangle);