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

function generateColorScheme(baseColor) {
    const baseHue = parseInt(baseColor.replace(/[^\d]/g, ''), 10);
    const analogous1 = (baseHue + 30) % 360;
    const analogous2 = (baseHue - 30 + 360) % 360;
    const complementary = (baseHue + 180) % 360;
    const splitComplementary1 = (baseHue + 150) % 360;
    const splitComplementary2 = (baseHue - 150 + 360) % 360;
    const triadic1 = (baseHue + 120) % 360;
    const triadic2 = (baseHue - 120 + 360) % 360;
    const square1 = (baseHue + 90) % 360;
    const square2 = (baseHue + 180) % 360;
    const square3 = (baseHue - 90 + 360) % 360;
    const rectangle1 = (baseHue + 60) % 360;
    const rectangle2 = (baseHue + 180) % 360;
    const rectangle3 = (baseHue - 60 + 360) % 360;
    const rectangle4 = (baseHue + 120) % 360;
}