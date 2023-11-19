window.MAX_COLORS = 30;
window.displayNames = true;

document.getElementById("body").addEventListener("keyup", (e) => {
    //console.log(e, e.key);
    if (e.key == "ArrowUp" || e.key == "z")
        document.getElementById("panelControl").style.transform = "translateY(0px)";
    if (e.key == "ArrowDown" || e.key == "s")
        document.getElementById("panelControl").style.transform = "translateY(calc( 10vh + 30px ))";
    if (e.key == "ArrowLeft" || e.key == "q")
        previous();
    if (e.key == "ArrowRight" || e.key == "d")
        next();
    if (e.key === " ")
        generateNewColors();
});

window.pageColors = [];
window.numberOfColors = 5;
window.colorsHistory = [];
window.colorHistoryID = -1;

function updateColors() {
    let i = 0;
    let newContent = "";
    let newUrl = window.location.href.substring(0, window.location.href.indexOf("?")) + "?";
    for (const color of window.pageColors) {
        if (i > 0)
            newUrl += "-";
        newUrl += color.hex;
        if (color.isLocked)
            newUrl += "L";

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
        ${(window.numberOfColors <= 2) ? "" : `<span class="deleteContainer"><span class="delete" onclick="deleteColor('${color.hex}')" ontouchstart="deleteColor('${color.hex}')">×</span></span>`}
        <span class="rgbValues">R: ${formatNumber(colorRGB.r, 255)}<br>G: ${formatNumber(colorRGB.g, 255)}<br>B: ${formatNumber(colorRGB.b, 255)}</span>
        <span class="colorValue">${color.hex}</span>
        </div>`;

        if (window.numberOfColors <= window.MAX_COLORS)
            newContent += "<div class=\"addBetween\" style=\"background:" + midColor + "; color:" + (isColorBright(midColor) ? "black" : "white") + ";\" onclick=\"genNewColor(" + i + ", '" + midColor + "')\" ontouchstart=\"genNewColor(" + i + ", '" + midColor + "')\"></div>";
        i++
    }
    window.history.pushState("Generating colors", "C.O.L.O.R.S", newUrl);
    document.getElementById("colors").innerHTML = newContent;
}

function generateNewColors(first = false) {
    window.pageColors = colorsGenerator(first, window.numberOfColors, window.pageColors);
    updateColors()
    saveColorsToHistory()
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
    saveColorsToHistory()
}

function lockColor(object, color) {
    object.classList.toggle('locked');
    object.classList.toggle('unlocked');
    for (const key in window.pageColors) {
        const element = window.pageColors[key];
        if (element.hex == color)
            window.pageColors[key].isLocked = !window.pageColors[key].isLocked;
    }
    updateColors();
}

function deleteColor(color) {
    if (window.numberOfColors <= 2)
        return;
    newColors = []
    for (const key in window.pageColors) {
        const element = window.pageColors[key];
        if (element.hex != color)
            newColors = [...newColors, window.pageColors[key]];
    }

    window.numberOfColors--;
    window.pageColors = newColors;
    updateColors();
    saveColorsToHistory()
}

if (window.location.href.indexOf("?") > -1) {
    let colorsString = window.location.href;
    colorsString = colorsString.slice(colorsString.indexOf('?') + 1)
    let colorsStringsArr = colorsString.split("#").join("").split("-");
    let newColors = [];
    for (const colorString of colorsStringsArr) {
        let color = colorString;
        let locked = false;
        if (colorString.toUpperCase().endsWith("L")) {
            color = color.slice(0, -1);
            locked = true;
        }
        newColors = [...newColors, { isLocked: locked, hex: color }]
    }
    window.pageColors = newColors;
    window.numberOfColors = window.pageColors.length;
    updateColors();
    saveColorsToHistory()
}
else
    generateNewColors(true);

function saveColorsToHistory() {
    window.colorHistoryID++;
    if (window.colorHistoryID < window.colorsHistory.length)
        window.colorsHistory[window.colorHistoryID] = window.pageColors;
    else
        window.colorsHistory = [...window.colorsHistory, JSON.parse(JSON.stringify(window.pageColors))];
}

function loadColorsFromHistory() {
    window.pageColors = window.colorsHistory[window.colorHistoryID];
    window.numberOfColors = window.pageColors.length;
    updateColors();
}

function closePanel() {
    document.getElementById("panelControl").style.transform = "translateY(calc( 10vh + 30px ))";
}

function previous() {
    if (window.colorHistoryID > 0) {
        window.colorHistoryID--;
        loadColorsFromHistory()
    }
}

function next() {
    if (window.colorHistoryID < window.colorsHistory.length - 1) {
        window.colorHistoryID++;
        loadColorsFromHistory()
    }
}