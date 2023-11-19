$(document).ready(function (e) {
    $(".sortable").sortable({
        items: ':not(.static)',
        connectWith: ".sortable",
        stop: function (event, ui) {
            getOrder();
        }
    });
    $(".sortable").disableSelection();
});

function getOrder() {
    const colorsDivs = document.getElementById("colors");
    newColors = [];
    for (const colorDiv of colorsDivs.children) {
        if (colorDiv.id.toUpperCase().startsWith("COLOR")) {
            let idname = colorDiv.id.toUpperCase().split("COLOR").join("");
            let locked = false;
            if (idname.toUpperCase().endsWith("L")) {
                idname = idname.slice(0, -1);
                locked = true;
            }
            newColors = [...newColors, { isLocked: locked, hex: idname }];
        }
    }

    window.pageColors = newColors;
    window.numberOfColors = window.pageColors.length;
    saveColorsToHistory();
    updateColors();
}