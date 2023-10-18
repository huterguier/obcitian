document.addEventListener("DOMContentLoaded", function() {
    let collectBtn = document.getElementById("collectBtn");

    collectBtn.addEventListener("click", function() {
        collectReferences();
    });
});

function collectReferences() {
    // Your code for collecting references here
    console.log("Collecting references...");
}
