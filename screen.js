/**
 * screen.js - Immersive Mode Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    // Menghapus pengecekan hasSeenFS agar popup SELALU muncul saat load/refresh
    const popup = document.getElementById("fs-popup-overlay");
    if (popup) {
        popup.style.display = "flex";
    }
});

function handleFSChoice(isYes) {
    // Kita tidak perlu menyimpan apa-apa ke sessionStorage/localStorage 
    // karena kita ingin popup ini muncul lagi setiap web dibuka/refresh
    
    const popup = document.getElementById("fs-popup-overlay");
    if (popup) popup.style.display = "none";

    if (isYes) {
        enterFullScreen();
    }
}

function enterFullScreen() {
    const doc = document.documentElement;
    
    // Request Fullscreen (Support berbagai browser)
    if (doc.requestFullscreen) {
        doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) { // Firefox
        doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) { // Chrome/Safari
        doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) { // IE/Edge
        doc.msRequestFullscreen();
    }
}

// Deteksi perubahan status (Optional untuk log)
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        console.log("Status: Windowed Mode");
    } else {
        console.log("Status: Full Screen Mode");
    }
});