window.MAX_COLORS = 30;
window.displayNames = true;

document.getElementById("body").addEventListener("keyup", (e) => {
    //console.log(e, e.key);
    if (e.key == "ArrowUp")
        openPanel()
    if (e.key == "ArrowDown")
        closePanel()
    if (e.key == "ArrowLeft")
        previous();
    if (e.key == "ArrowRight")
        next();
    if (e.key === " ")
        generateNewColors();
    if (e.key == "Escape")
        selectMethod();
    if (e.key == "Control")
        toggleOptions();
    if (e.key.toUpperCase() == "O")
        toggleModifySelected();
});

window.pageColors = [];
window.numberOfColors = 5;
window.colorsHistory = [];
window.colorHistoryID = -1;

function updateColors() {
    let i = 0;
    let newContent = "";//'<apex:repeat value="{!lstScheduledUser}" var="scheduledUser">';
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
            newContent += `<div id="color${color.hex}${color.isLocked ? "L" : ""}" class="color" style="background:#${color.hex}; width:calc( ${100 / numberOfColors}vw - 10px ); height:calc( ${100 / numberOfColors}vh - 10px ); color:${isColorBright(color.hex) ? "black" : "white"};">`;
        else
            newContent += `<div id="color${color.hex}${color.isLocked ? "L" : ""}" class="color" style="background:#${color.hex}; width:${100 / numberOfColors}vw; height:${100 / numberOfColors}vh; color:${isColorBright(color.hex) ? "black" : "white"};">`;
        newContent += `<span class="colorName static">${getClosestColor(color.hex)}</span>
        <input onpaste="updateColorHex(this)" oninput="updateColorHex(this)" size="7" maxlength="7" class="colorHex static" ${isColorBright(color.hex) ? "" : "style=\"filter: invert(1) hue-rotate(180deg);\""} type="text" name="updatePseudo" id="hex${color.hex}" value="#${color.hex}">
        <span class="deleteContainer static"><span class="delete static" ${isColorBright(color.hex) ? "" : "style=\"filter: invert(1) hue-rotate(180deg);\""} onclick=" if (!copytcb('#${color.hex}')) copied(this);">⧉</span></span>
        <span class="deleteContainer static"><span class="lock static ${color.isLocked ? "locked" : "unlocked"}" ${isColorBright(color.hex) ? "" : "style=\"filter: invert(1) hue-rotate(180deg);\""}  onclick="lockColor(this, '${color.hex}')">${color.isLocked ? "☑" : "☐"}</span></span>
        ${(window.numberOfColors <= 2) ? "" : `<span class="deleteContainer static"><span class="delete static" ${isColorBright(color.hex) ? "" : "style=\"filter: invert(1) hue-rotate(180deg);\""}  onclick="deleteColor('${color.hex}')">×</span></span>`}
        <span class="rgbValues static">R: ${formatNumber(colorRGB.r, 255)}<br>G: ${formatNumber(colorRGB.g, 255)}<br>B: ${formatNumber(colorRGB.b, 255)}</span>
        <span class="colorVoid"></span>
        <span class="colorValue static">${color.hex}</span>
        </div>`; //</apex:repeat>

        if (window.numberOfColors <= window.MAX_COLORS)
            newContent += "<div class=\"addBetween static\" style=\"background:" + midColor + "; color:" + (isColorBright(midColor) ? "black" : "white") + ";\" onclick=\"genNewColor(" + i + ", '" + midColor + "')\"></div>";
        i++
    }
    window.history.pushState("Generating colors", "C.O.L.O.R.S", newUrl);
    updateButtons();
    document.getElementById("colors").innerHTML = newContent;
}

function generateNewColors(first = false) {
    window.pageColors = colorsGenerator(first, window.numberOfColors, window.pageColors);
    saveColorsToHistory();
    updateColors();
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
    saveColorsToHistory();
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
    saveColorsToHistory();
    updateColors();
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
        if (isValidHexColor(color))
            newColors = [...newColors, { isLocked: locked, hex: color }]
    }
    window.pageColors = newColors;
    window.numberOfColors = window.pageColors.length;
    saveColorsToHistory();
    updateColors();
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
    document.getElementById("openControl").style.transform = "translateY(0px)";
}

function openPanel() {
    document.getElementById("panelControl").style.transform = "translateY(0px)";
    document.getElementById("openControl").style.transform = "translateY(calc( 10vh + 50px ))";
}
openPanel();

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

function updateButtons() {
    const prev = document.getElementById("previousButton");
    if (window.colorHistoryID > 0) {
        prev.classList.add("btnIcon");
        prev.classList.remove("btnDisabled");
    }
    else {
        prev.classList.remove("btnIcon");
        prev.classList.add("btnDisabled");
    }

    const next = document.getElementById("nextButton");
    if (window.colorHistoryID < window.colorsHistory.length - 1) {
        next.classList.add("btnIcon");
        next.classList.remove("btnDisabled");
    }
    else {
        next.classList.remove("btnIcon");
        next.classList.add("btnDisabled");
    }
}

function updateColorHex(object) {
    if (!isValidHexColor(object.value))
        return object.classList.add("invalidColor");
    object.classList.remove("invalidColor");
    let color = object.value.toUpperCase().split("#").join("");
    newColors = []
    for (const key in window.pageColors) {
        const element = window.pageColors[key];
        if (element.hex == object.id.toUpperCase().split("HEX").join(""))
            newColors = [...newColors, { isLocked: element.isLocked, hex: color }];
        else
            newColors = [...newColors, element];
    }
    window.pageColors = newColors;
    saveColorsToHistory();
    updateColors();
}

window.displayRules = false;
function selectMethod() {
    window.displayRules = !window.displayRules;
    if (window.displayRules)
        showMethods();
    else
        hideMethods();

}

function showMethods() {
    const rulesbg = document.getElementById("rulesBackground");
    const rules = document.getElementById("rulesPanel");
    rulesbg.style.transform = "scale(1.1)";
    rules.style.transform = "scale(1)";
}

function hideMethods() {
    const rulesbg = document.getElementById("rulesBackground");
    const rules = document.getElementById("rulesPanel");
    rulesbg.style.transform = "scale(0)";
    rules.style.transform = "scale(0)";
}

window.displayOptions = false;
function toggleOptions() {
    window.displayOptions = !window.displayOptions;
    if (window.displayOptions)
        showOptions();
    else
        hideOptions();

}

function showOptions() {
    const optionsDiv = document.getElementById("moreControl");
    optionsDiv.style.transform = "translateY(0px)";
}

function hideOptions() {
    const optionsDiv = document.getElementById("moreControl");
    optionsDiv.style.transform = "translateY(calc( 20vh + 30px ))";
}

hideOptions()

window.modifyOnlySelected = false;
function toggleModifySelected() {
    window.modifyOnlySelected = !window.modifyOnlySelected;
    if (window.modifyOnlySelected)
        document.getElementById("modifyOnlySelected").innerHTML = "☑";
    else
        document.getElementById("modifyOnlySelected").innerHTML = "☐";
}

function applyModifiers(hFactor, sFactor, vFactor) {
    newColors = []
    for (const key in window.pageColors) {
        const element = window.pageColors[key];
        if (element.isLocked || !window.modifyOnlySelected)
            newColors = [...newColors, { isLocked: element.isLocked, hex: modifyHSVColor(element.hex, hFactor, sFactor, vFactor) }];
        else
            newColors = [...newColors, element];
    }
    window.pageColors = newColors;
    saveColorsToHistory();
    updateColors();
}