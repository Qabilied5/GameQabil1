const pid = "p1";

const SENTINELS = {
    hera: {
        name: "Hera",
        color: "#0ff040d8",
        desc: "The Ancient Healer",

        action: function(owner, target) {
            owner.hp = Math.min(owner.maxHp, owner.hp + 13);
            createSentinelVisual("p1", "+13HP", "#22af24d3"); // -- SENTINEL POPUP
            log(`Hera: Healing +13 HP Berkala!`);
            for (let i = 0; i < 3; i++) {
                createHealParticle("p1"); 
            }
            
            const card = document.getElementById("p1-card");
            card.classList.add("healing-active");
            setTimeout(() => card.classList.remove("healing-active"), 500);
            
            if (Math.random() < 0.1) {
                target.hp -= 15;
                createStrikeVisual("bot");
                createSentinelVisual("p1", "PASSIVE STRIKE", "#cc1414d3"); // -- SENTINEL POPUP
                createSentinelVisual("bot", "-15HP", "#cc1414d3"); // -- SENTINEL POPUP
                log("Hera: Ooopss, I wont hurt you.. STRIKE!");
            }
        }
    },
    thalor: {
    name: "Thalor",
    color: "#4da6ff",
    desc: "Eternal Warden - Defender",
    action: (owner, target, elapsed) => {
        if (elapsed % 10 === 0) { 
            
            game[pid].shield = 2;
            updateDebuffLabel(pid);
            
            createSentinelVisual("p1", "SHIELDED!", "#e6cf23d3");

            const card = document.getElementById(`${pid}-card`);
            if (card) {
                card.style.transition = "all 0.3s ease";
                card.style.transform = "scale(1.1)";
                setTimeout(() => (card.style.transform = "scale(1.02)"), 300);

                for (let i = 0; i < 3; i++) {
                    const p = document.createElement("div");
                    p.className = "heal-particle";
                    p.innerText = "🛡️";
                    p.style.left = card.getBoundingClientRect().left + Math.random() * 100 + "px";
                    p.style.top = card.getBoundingClientRect().top + "px";
                    p.style.color = "#60a5fa";
                    document.body.appendChild(p);
                    setTimeout(() => p.remove(), 1000);
                }
            }

            if (typeof createShieldBurst === "function") {
                createShieldBurst(pid);
            }

            log(`🛡️ Thalor: GREAT SHIELD ACTIVATED!`);
        } else {
            log("Thalor: Standing guard...");
        }
        
        if (Math.random() < 0.05) { 
            target.hp -= 15;
            createStrikeVisual("bot");
            createSentinelVisual("p1", "PASSIVE ACTIVE", "#e6cf23d3");
            createSentinelVisual("bot", "-15HP", "#e62323d3");
            log("Thalor strikes for 15 DMG!");
        }
    }
},
    hades: {
        name: "Hades",
        color: "#ff0000cd",
        desc: "Soul Reaper - Executor",
        action: (owner, target) => {
            let dmg = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
            target.hp -= dmg;
            createStrikeVisual("bot");
            createSoulSiphonEffect();
            createSentinelVisual("p1", "OBLIVION STRIKE!", "#c81818d3");
            log(`Hades: OBLIVION ${dmg} DMG!`);
            
            if (Math.random() < 0.01) {
                let executeDmg = Math.floor(target.hp * 0.8);
                target.hp -= executeDmg;
                
                document.getElementById("arena").classList.add("shake");
                setTimeout(() => document.getElementById("arena").classList.remove("shake"), 500);
                createSentinelVisual("p1", "YOUR SOUL IS MINE!", "#c81818d3");    
                createSoulSiphonEffect();
                log("HADES: REAPS THE SOUL (80% HP)!");
            }
        }
    }
    // ,
    // For now, yun huang deactive.
    // yun_huang: {
    //     name: "Yun Huang",
    //     color: "#ffd700",
    //     desc: "Greates Support",
    //     action: (owner, target) => {
    //         if (Math.random() > 0.5) {
    //             target.isFrozen = true;
    //             log("Yun Huang: Freeze!");
    //         } else {
    //             target.isBurning = true;
    //             log("Yun Huang: Burn!");
    //         }

    //         if (Math.random() < 0.4) {
    //             owner.hp = Math.min(owner.maxHp, owner.hp + 10);
    //             log("Yun Huang: +10 HP Heal!");
    //         }
    //     }
    // }

};

function createSentinelVisual(targetId, text, color) {
    const card = document.getElementById(`${targetId}-card`);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const popup = document.createElement("div");
    
    popup.className = "sentinel-active-popup";
    popup.innerText = text;
    popup.setAttribute("data-text", text); 


    popup.style.setProperty('--sentinel-color', color);

    popup.style.left = (rect.left + rect.width / 2) + "px";
    popup.style.top = (rect.top + 10) + "px"; 
    popup.style.transform = "translateX(-50%)";

    document.body.appendChild(popup);
    
    setTimeout(() => {
        if (popup.parentNode) popup.remove();
    }, 2000);
}

let playerSentinel = localStorage.getItem("mySentinel") || null;

function openGacha() {
    document.getElementById("gacha-overlay").style.display = "flex";
}

function rollGacha() {
    const keys = Object.keys(SENTINELS);
    const resultKey = keys[Math.floor(Math.random() * keys.length)];
    const sentinel = SENTINELS[resultKey];

    playerSentinel = resultKey;
    localStorage.setItem("mySentinel", resultKey);

    const display = document.getElementById("gacha-result-display");
    display.innerHTML = `
        <div class="sentinel-card-win" style="border-color: ${sentinel.color}">
            <h2 style="color: ${sentinel.color}">${sentinel.name}</h2>
            <p>${sentinel.desc}</p>
        </div>
    `;
    
    updateSentinelUI();
    
    document.getElementById("gacha-btn-roll").style.display = "none";
    document.getElementById("gacha-btn-close").style.display = "block";
}

let sentinelTimer = null;
let isSentinelActivePeriod = true;
let elapsedInCycle = 0;

function startSentinelLoop() {
    // --- PERBAIKAN UTAMA: Hentikan interval lama jika ada ---
    if (sentinelTimer) {
        clearInterval(sentinelTimer);
        sentinelTimer = null; // Reset ke null
    }

    const savedKey = localStorage.getItem("mySentinel");
    if (!savedKey || !SENTINELS[savedKey]) return;

    const currentSentinel = SENTINELS[savedKey];
    console.log("Sentinel System Initiated:", currentSentinel.name);

    isSentinelActivePeriod = true;
    elapsedInCycle = 0;

    sentinelTimer = setInterval(() => {
        // Jika game sudah tidak aktif, bersihkan interval
        if (!game.active) {
            clearInterval(sentinelTimer);
            sentinelTimer = null;
            return;
        }

        elapsedInCycle += 5;

        // Logika Pergantian Siklus
        if (elapsedInCycle > 30) {
            isSentinelActivePeriod = !isSentinelActivePeriod;
            elapsedInCycle = 5; 
            
            if (isSentinelActivePeriod) {
                createSentinelVisual("p1", "SENTINEL ACTIVE!", "#ffd900d3");
                log(`${currentSentinel.name}: I'm back! (ACTIVE)`);
            } else {
                createSentinelVisual("p1", "SENTINEL RESTING!", "#ffd900d3");
                // createSentinelVisual("bot", "IT'S MY TURN!", "#d71919d3");
                log(`${currentSentinel.name}: Resting... (COOLDOWN)`);
            }
        }

        // Eksekusi Aksi (1 blok only biar g double)
        if (isSentinelActivePeriod) {
            currentSentinel.action(game.p1, game.bot, elapsedInCycle); 
            // createSentinelVisual("p1", "ACTIVE", currentSentinel.color); -- [NGETEST ACTIVE ATAU ENGGA]
            
            // Cek darah bot
            if (game.bot.hp <= 0) {
                game.bot.hp = 0;
                updateUI();
                log(`${currentSentinel.name} has finished the enemy!`);
                win("p1"); 
                
                clearInterval(sentinelTimer);
                sentinelTimer = null;
                return;
            }

            updateUI();
        }
    }, 5000); 
}


function updateSentinelUI() {
    const displayContainer = document.getElementById("display-my-sentinel");
    if (!displayContainer) return;

    const savedSentinelKey = localStorage.getItem("mySentinel");
    const p1Card = document.getElementById("p1-card");


    if (savedSentinelKey && SENTINELS[savedSentinelKey]) {
        const data = SENTINELS[savedSentinelKey];
        
        displayContainer.innerHTML = `
            <span style="color: ${data.color}; font-weight: bold; text-shadow: 0 0 5px ${data.color}66;">
                ${data.name.toUpperCase()}
            </span><br>
            <span style="font-size: 0.75rem; opacity: 0.8;">${data.desc}</span>
        `;
        
        displayContainer.parentElement.style.boxShadow = `inset 0 0 10px ${data.color}33`;
        displayContainer.parentElement.style.borderColor = data.color;

        if (p1Card) {
            p1Card.style.boxShadow = `0 8px 32px 0 ${data.color}33`;
            p1Card.style.border = `1px solid ${data.color}44`;
        }
    } else {

        displayContainer.innerHTML = `<span style="opacity: 0.5;">None (Defeat Expert Mode)</span>`;
    }
}

document.addEventListener("DOMContentLoaded", updateSentinelUI);