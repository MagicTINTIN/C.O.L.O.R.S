document.getElementById("body").addEventListener("keyup", (e) => {
    if (e.key === " ")
        generateNewColors();
    //console.log(`Key "${e.key}" released [event: keyup]`, e);
});

window.pageColors = [];
window.numberOfColors = 5;

function generateNewColors(first = false) {
    console.log("NOT IMPLEMENTED YET");
    let newContent="";
    window.pageColors = colorsGenerator(first, window.numberOfColors, window.pageColors);
    for (const color of window.pageColors) {
        newContent += `<div class="color" style="background:#${color.hex}; width:${100/numberOfColors}vw; height:${100/numberOfColors}vh;"><span class="colorHex" onclick=" if (copytcb('#${color.hex}')) copied(this);" ontouchstart=" if (copytcb('#${color.hex}')) copied(this);">#${color.hex}</span></div>`;
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

generateNewColors(true);