function newColor() {
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
            let color = newColor()
            colors = [...colors, { isLocked: false, hex: color }]
        }
        return colors
    }
    if (isFirst === false) {
        let colors = []
        existingColors.map((col) => {
            if (col.isLocked === false) {
                let color = newColor()
                col.hex = color
                colors = [...colors, col]
            }
            if (col.isLocked === true) {
                colors = [...colors, col]
            }
        })
        return colors
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase();
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
    var r, g, b, h, s, v;
    r = color.r / 255;
    g = color.g / 255;
    b = color.b / 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);


    v = max;
    delta = max - min;
    if (max != 0)
        s = delta / max;        // s
    else {
        // r = g = b = 0        // s = 0, v is undefined
        s = 0;
        h = -1;
        return { h: 0, s: 0, v: 0 };
    }
    if (r === max)
        h = (g - b) / delta;      // between yellow & magenta
    else if (g === max)
        h = 2 + (b - r) / delta;  // between cyan & yellow
    else
        h = 4 + (r - g) / delta;  // between magenta & cyan
    h *= 60;                // degrees
    if (h < 0)
        h += 360;
    if (isNaN(h))
        h = 0;
    return { h: h, s: s, v: v };
};

HSVtoRGB = function (color) {
    var i;
    var h, s, v, r, g, b;
    h = color.h;
    s = color.s;
    v = color.v;
    if (s === 0) {
        // achromatic (grey)
        r = g = b = v;
        return { r: parseInt(r * 255), g: parseInt(g * 255), b: parseInt(b * 255) };
    }
    h /= 60;            // sector 0 to 5
    i = Math.floor(h);
    f = h - i;          // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return { r: parseInt(r * 255), g: parseInt(g * 255), b: parseInt(b * 255) };
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