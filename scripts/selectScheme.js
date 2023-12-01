var matches = document.querySelectorAll('.schemeSelection');

for (match in matches) {
  matches[match].onchange = function() {
    console.log(this.value)
  }
}