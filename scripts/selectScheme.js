document.addEventListener("DOMContentLoaded", function() {
    var matches = document.querySelectorAll('.hueTypeSelection');
  
    matches.forEach(function(match) {
      match.addEventListener('change', function() {
        console.log(`Hue type := ${this.value}`);
        window.hueType = hueTypeIDs[this.value]
        generateNewColors();
      });
    });
  });