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