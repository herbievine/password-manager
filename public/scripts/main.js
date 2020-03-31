let msgSent = false;

function getWidth() {
    const w = window.innerWidth;
    if (w < 1300 && !msgSent) {
        msgSent = true;
        alert('This website may not be suitable for your device');
    }

    if (w < 1000) {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay-box").style.display = "block";
    } else {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("overlay-box").style.display = "none";
    }

    setTimeout(getWidth, 1000);
}