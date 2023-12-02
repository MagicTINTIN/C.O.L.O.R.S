/* Colors in different hue wheels
 * 
 * NORMAL:
 * R: 0
 * Y: 60
 * G: 120
 * C: 180
 * B: 240
 * M: 300
 * 
 * ADOBE:
 * R: 0
 * Y: 122
 * G: 165
 * C: 218
 * B: 275
 * M: 330
 * 
 */

const HUE_MAX = 360;

const NORMAL_R = 0;
const NORMAL_Y = 60;
const NORMAL_G = 120;
const NORMAL_C = 180;
const NORMAL_B = 240;
const NORMAL_M = 300;

const ADOBE_R = 0;
const ADOBE_Y = 122;
const ADOBE_G = 165;
const ADOBE_C = 218;
const ADOBE_B = 275;
const ADOBE_M = 330;

const
    scale = (fromRange, toRange) => {
        const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
        return from => (from - fromRange[0]) * d + toRange[0];
    };

/////////////////// HSV TO RGB \\\\\\\\\\\\\\\\\\\

function classicHSVtoRGB(color) {
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

function adobeHSVtoRGB(color) {
    let newHue = 0
    console.log("before correction:", color.h);
    if (color.h < ADOBE_Y)
        newHue = scale([ADOBE_R, ADOBE_Y], [NORMAL_R, NORMAL_Y])(color.h);
    else if (color.h < ADOBE_G)
        newHue = scale([ADOBE_Y, ADOBE_G], [NORMAL_Y, NORMAL_G])(color.h);
    else if (color.h < ADOBE_C)
        newHue = scale([ADOBE_G, ADOBE_C], [NORMAL_G, NORMAL_C])(color.h);
    else if (color.h < ADOBE_B)
        newHue = scale([ADOBE_C, ADOBE_B], [NORMAL_C, NORMAL_B])(color.h);
    else if (color.h < ADOBE_M)
        newHue = scale([ADOBE_B, ADOBE_M], [NORMAL_B, NORMAL_M])(color.h);
    else
        newHue = scale([ADOBE_M, HUE_MAX], [NORMAL_M, HUE_MAX])(color.h);
    newHue %= 360;
    console.log("after correction:", newHue);
    color.h = newHue;
    return classicHSVtoRGB(color);
}


/////////////////// RGB TO HSV \\\\\\\\\\\\\\\\\\\

function classicRGBtoHSV(color) {
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
}

function adobeRGBtoHSV(color) {
    let hsv = classicRGBtoHSV(color);
    console.log("normal (before adobe):", hsv.h);
    console.log("Scaling 0 ?", scale([0, 60], [0, 120])(0));
    let newHue = 0;
    if (hsv.h < NORMAL_Y)
        newHue = scale([NORMAL_R, NORMAL_Y], [ADOBE_R, ADOBE_Y])(hsv.h);
    else if (hsv.h < NORMAL_G)
        newHue = scale([NORMAL_Y, NORMAL_G], [ADOBE_Y, ADOBE_G])(hsv.h);
    else if (hsv.h < NORMAL_C)
        newHue = scale([NORMAL_G, NORMAL_C], [ADOBE_G, ADOBE_C])(hsv.h);
    else if (hsv.h < NORMAL_B)
        newHue = scale([NORMAL_C, NORMAL_B], [ADOBE_C, ADOBE_B])(hsv.h);
    else if (hsv.h < NORMAL_M)
        newHue = scale([NORMAL_B, NORMAL_M], [ADOBE_B, ADOBE_M])(hsv.h);
    else
        newHue = scale([NORMAL_M, HUE_MAX], [ADOBE_M, HUE_MAX])(hsv.h);
    newHue %= 360;
    console.log("adobe value:", newHue);
    return { h: newHue, s: hsv.s, v: hsv.v };
}