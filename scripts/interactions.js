window.MAX_COLORS = 30;
window.displayNames = true;

document.getElementById("body").addEventListener("keyup", (e) => {
    if (e.key === " ")
        generateNewColors();
});

window.pageColors = [];
window.numberOfColors = 5;

function updateColors() {
    let i = 0;
    let newContent = "";
    for (const color of window.pageColors) {
        let midColor = "";
        if (i < window.pageColors.length - 1)
            midColor = findMediumColor(color.hex, window.pageColors[i + 1].hex)
        else
            midColor = "#" + newColor()
        let colorRGB = hexToRgb(color.hex);

        if (window.numberOfColors <= window.MAX_COLORS)
            newContent += `<div class="color" style="background:#${color.hex}; width:calc( ${100 / numberOfColors}vw - 10px ); height:calc( ${100 / numberOfColors}vh - 10px ); color:${isColorBright(color.hex) ? "black" : "white"};">`;
        else
            newContent += `<div class="color" style="background:#${color.hex}; width:${100 / numberOfColors}vw; height:${100 / numberOfColors}vh; color:${isColorBright(color.hex) ? "black" : "white"};">`;
        newContent += `<span class="colorName">${getClosestColor(color.hex)}</span>
        <span class="colorHex" onclick=" if (!copytcb('#${color.hex}')) copied(this);" ontouchstart=" if (!copytcb('#${color.hex}')) copied(this);">#${color.hex}</span>
        <span class="lock ${color.isLocked ? "locked" : "unlocked"}" onclick="lockColor(this, '${color.hex}')" ontouchstart="lockColor(this, '${color.hex}')">LOCK</span>
        <span class="deleteContainer"><span class="delete" onclick="deleteColor(this, '${color.hex}')" ontouchstart="deleteColor(this, '${color.hex}')">×</span></span>
        <span class="rgbValues">R: ${formatNumber(colorRGB.r, 255)}<br>G: ${formatNumber(colorRGB.g, 255)}<br>B: ${formatNumber(colorRGB.b, 255)}</span>
        <span class="colorValue">${color.hex}</span>
        </div>`;

        if (window.numberOfColors <= window.MAX_COLORS)
            newContent += "<div class=\"addBetween\" style=\"background:" + midColor + "; color:" + (isColorBright(midColor) ? "black" : "white") + ";\" onclick=\"genNewColor(" + i + ", '" + midColor + "')\" ontouchstart=\"genNewColor(" + i + ", '" + midColor + "')\"></div>";
        i++
    }
    document.getElementById("colors").innerHTML = newContent;
}

function generateNewColors(first = false) {
    window.pageColors = colorsGenerator(first, window.numberOfColors, window.pageColors);
    updateColors()
}

function genNewColor(index, newcolor) {
    let newColors = []
    let i = 0;
    for (const color of window.pageColors) {
        newColors = [...newColors, color];
        if (i == index)
            newColors = [...newColors, { isLocked: false, hex: newcolor.replace("#", "") }];
        i++;
    }
    window.pageColors = newColors;
    window.numberOfColors++;
    updateColors();
}

function lockColor(object, color) {
    object.classList.toggle('locked');
    object.classList.toggle('unlocked');
    for (const key in window.pageColors) {
        const element = window.pageColors[key];
        if (element.hex == color)
            window.pageColors[key].isLocked = !window.pageColors[key].isLocked;
    }
}

generateNewColors(true);