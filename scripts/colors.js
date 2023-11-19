document.getElementById("body").addEventListener("keyup", (e) => {
    if (e.key === " ")
        generateNewColors();
    //console.log(`Key "${e.key}" released [event: keyup]`, e);
});

window.pageColors = [];
window.numberOfColors = 5;

function generateNewColors(first = false) {
    console.log("NOT IMPLEMENTED YET");
    let newContent = "";
    window.pageColors = colorsGenerator(first, window.numberOfColors, window.pageColors);
    for (const color of window.pageColors) {
        newContent += `<div class="color" style="background:#${color.hex}; width:${100 / numberOfColors}vw; height:${100 / numberOfColors}vh; color:${isColorBright(color.hex) ? "black" : "white"};">
        <span class="colorHex" onclick=" if (!copytcb('#${color.hex}')) copied(this);" ontouchstart=" if (!copytcb('#${color.hex}')) copied(this);">#${color.hex}</span>
        <span class="colorValue">${color.hex}</span>
        </div>`;
    }
    document.getElementById("colors").innerHTML = newContent;
}

function colorsGenerator(isFirst, colorNumber = 5, existingColors = []) {
    if (isFirst) {
        let colors = []
        for (let i = 0; i < colorNumber; i++) {
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
            colors = [...colors, { index: i + 1, isBlocked: false, hex: color }]
        }
        return colors
    }
    if (isFirst === false) {
        let colors = []
        existingColors.map((col) => {
            if (col.isBlocked === false) {
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
                col.hex = color
                colors = [...colors, col]
            }
            if (col.isBlocked === true) {
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
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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

generateNewColors(true);