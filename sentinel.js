const pid = "p1";

const SENTINELS = {
    hera: {
        name: "Hera",
        color: "#0ff040d8",
        desc: "The Ancient Healer",
        action: function(ownerId, targetId) {
            const owner = game[ownerId];
            const target = game[targetId];

            owner.hp = Math.min(owner.maxHp, owner.hp + 13);
            createSentinelVisual(ownerId, "+13HP", "#22af24d3");
            log(`Hera (${ownerId.toUpperCase()}): Healing +13 HP!`);
            
            for (let i = 0; i < 3; i++) createHealParticle(ownerId);
            
            const card = document.getElementById(`${ownerId}-card`);
            card.classList.add("healing-active");
            setTimeout(() => card.classList.remove("healing-active"), 500);
            
            if (Math.random() < 0.15) {
                target.hp -= 15;
                createStrikeVisual(targetId);
                createSentinelVisual(ownerId, "PASSIVE STRIKE", "#cc1414d3");
                createSentinelVisual(targetId, "-15HP", "#cc1414d3");
                log(`Hera (${ownerId.toUpperCase()}): Surprise Strike!`);
            }
        }
    },
    thalor: {
        name: "Thalor",
        color: "#4da6ff",
        desc: "Eternal Warden - Defender",
        action: (ownerId, targetId, elapsed) => {
            if (elapsed % 10 === 0) {
                game[ownerId].shield = 2;
                updateDebuffLabel(ownerId);
                createSentinelVisual(ownerId, "SHIELDED!", "#e6cf23d3");

                const card = document.getElementById(`${ownerId}-card`);
                if (card) {
                    card.style.transform = "scale(1.1)";
                    setTimeout(() => (card.style.transform = ""), 300);
                }
                log(`🛡️ Thalor (${ownerId.toUpperCase()}): GREAT SHIELD!`);
            }
            
            if (Math.random() < 0.1) {
                game[targetId].hp -= 15;
                createStrikeVisual(targetId);
                createSentinelVisual(targetId, "-15HP", "#e62323d3");
            }
        }
    },
    hades: {
        name: "Hades",
        color: "#ff0000cd",
        desc: "Soul Reaper - Executor",
        action: (ownerId, targetId) => {
            let dmg = Math.floor(Math.random() * 11) + 15;
            game[targetId].hp -= dmg;
            createStrikeVisual(targetId);
            createSentinelVisual(ownerId, "OBLIVION!", "#c81818d3");
            createSentinelVisual(targetId, `-${dmg}HP`, "#c81818d3");
            log(`Hades (${ownerId.toUpperCase()}): OBLIVION ${dmg} DMG!`);
            
            if (Math.random() < 0.02) {
                let executeDmg = Math.floor(game[targetId].hp * 0.5);
                game[targetId].hp -= executeDmg;
                document.getElementById("arena").classList.add("shake");
                setTimeout(() => document.getElementById("arena").classList.remove("shake"), 500);
                createSentinelVisual(ownerId, "DIE!", "#000");
                log(`HADES (${ownerId.toUpperCase()}): EXECUTION!`);
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

// sentinel.js

function startSentinelLoop() {

    if (sentinelTimer) {
        clearInterval(sentinelTimer);
        sentinelTimer = null;
    }

    let activeSentinels = [];

    if (isPVP) {
        const pvpData = JSON.parse(localStorage.getItem("pvpSentinel"));
        if (pvpData) {
            if (pvpData.p1 && SENTINELS[pvpData.p1]) {
                activeSentinels.push({ owner: "p1", target: "bot", key: pvpData.p1 });
            }
            if (pvpData.p2 && SENTINELS[pvpData.p2]) {
                activeSentinels.push({ owner: "bot", target: "p1", key: pvpData.p2 });
            }
        }
    } else {
        // --- LOGIKA PVE ---
        const savedKey = localStorage.getItem("mySentinel");
        if (savedKey && SENTINELS[savedKey]) {
            activeSentinels.push({ owner: "p1", target: "bot", key: savedKey });
        }
    }

    if (activeSentinels.length === 0) return;

    elapsedInCycle = 0;
    isSentinelActivePeriod = true;

    sentinelTimer = setInterval(() => {
        if (!game.active) {
            clearInterval(sentinelTimer);
            return;
        }

        elapsedInCycle += 5;
        if (elapsedInCycle > 30) {
            isSentinelActivePeriod = !isSentinelActivePeriod;
            elapsedInCycle = 5;
        }

        if (isSentinelActivePeriod) {
            activeSentinels.forEach(s => {
                const config = SENTINELS[s.key];
                if (config && config.action) {
                    config.action(s.owner, s.target, elapsedInCycle);
                }
            });

            // Cek kematian setelah aksi sentinel
            if (game.p1.hp <= 0) win("bot");
            if (game.bot.hp <= 0) win("p1");
            
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