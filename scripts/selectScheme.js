document.addEventListener("DOMContentLoaded", function() {
    var matches = document.querySelectorAll('.schemeSelection');
  
    matches.forEach(function(match) {
      match.addEventListener('change', function() {
        console.log(`Color Scheme := ${this.value}`);
        window.schemeUsed = schemesIDs[this.value]
      });
    });
  });