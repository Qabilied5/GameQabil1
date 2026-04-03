const hasWonExpert = localStorage.getItem("expertWinner") === "true";

if (!hasWonExpert) {
    localStorage.setItem("insanityUnlocked", "false");
    console.log("Mode Insanity dikunci (Belum ada rekor menang Expert).");
} else {
    localStorage.setItem("insanityUnlocked", "true");
    console.log("Selamat datang kembali, Master Expert! Mode Insanity tetap aktif.");
}

(function spawnRunes() {
  const field = document.getElementById("rune-field");
  const runeSymbols = [
    "᛫",
    "ᚱ",
    "ᚢ",
    "ᚾ",
    "ᛖ",
    "ᛗ",
    "ᚠ",
    "ᚦ",
    "ᚨ",
    "ᛚ",
    "⬡",
    "✦",
    "⬢",
    "◈",
    "⟁",
    "⌘",
    "⍟",
    "⎊",
  ];
  for (let i = 0; i < 28; i++) {
    const r = document.createElement("div");
    r.className = "rune";
    r.innerText = runeSymbols[Math.floor(Math.random() * runeSymbols.length)];
    r.style.left = Math.random() * 100 + "vw";
    r.style.animationDuration = 18 + Math.random() * 22 + "s";
    r.style.animationDelay = -(Math.random() * 30) + "s";
    r.style.fontSize = 0.7 + Math.random() * 1.2 + "rem";
    r.style.opacity = (0.06 + Math.random() * 0.1).toString();
    field.appendChild(r);
  }
})();

let isPVP = false;
let selectedDiff = "normal";
let game = {
  turn: "p1",
  timer: 5.0,
  active: true,
  event: { type: "none", time: 0 },
  p1: { hp: 100, maxHp: 100, mana: 30, shield: 0, freeze: 0, burn: 0, sHeal: 0, cds: {}, isShielded: false, shieldTurns: 0 },
  bot: { 
    hp: 200, 
    maxHp: 200,
    mana: 40, 
    shield: 0, 
    freeze: 0, 
    burn: 0, 
    sHeal: 0, 
    cds: {} 
  },
};

// let isPVP = false; // true = main 2 player

// function togglePVP() {
//   isPVP = !isPVP;
//   log(isPVP ? "Mode: PLAYER VS PLAYER" : "Mode: PLAYER VS BOT");
// }

// let selectedDiff = "normal";

function selectDifficulty(level) {
  selectedDiff = level;

  document.body.classList.remove("insanity-active");
  const arena = document.getElementById("arena");
  if (arena) arena.style.animation = "";

  document.querySelectorAll(".difficulty-selector .diff-btn").forEach((btn) => {
    btn.classList.remove("active-diff", "active-insanity");
  });

  const targetBtn = document.getElementById(`${level}-btn`);
  
  if (targetBtn) {
    if (level === 'insanity') {
      document.body.classList.add("insanity-active");
      
      // document.getElementById("arena").style.animation = "insanity-shake 0.2s infinite";
      targetBtn.classList.add("active-insanity");
      targetBtn.classList.remove("locked");

      document.querySelectorAll(".rune").forEach((r) => {

        r.style.animationDelay = -(Math.random() * 30) + "s";

        r.style.left = Math.random() * 100 + "vw";
      });
    } else {
      targetBtn.classList.add("active-diff");
    }
  }

  if (!isPVP) {
    game.bot.hp = 200;
  }

  updateUI();
  log(`DIFFICULTY SET TO: ${level.toUpperCase()}`);
}

const strikeSound = new Audio("/audio/StrikeSound.mp3");
strikeSound.preload = "auto";
strikeSound.volume = 0.6;

const ultiSound = new Audio("/audio/UltimateSound.mp3");
ultiSound.preload = "auto";
ultiSound.volume = 1.0;

const SKILLS = [
  { id: "strike", name: "STRIKE", cost: 5, cd: 5000, color: "#6b7280" },
  { id: "heal", name: "HEAL", cost: 50, cd: 13000, color: "#16a34a" },
  { id: "burning", name: "BURNING", cost: 45, cd: 20000, color: "#ea580c" },
  { id: "vampire", name: "VAMPIRE", cost: 45, cd: 15000, color: "#9333ea" },
  { id: "shield", name: "SHIELD", cost: 20, cd: 10000, color: "#2563eb" },
  { id: "freeze", name: "FREEZE", cost: 15, cd: 30000, color: "#60a5fa" },
  { id: "ulti", name: "ULTI", cost: 65, cd: 30000, color: "#b91c1c" },
  {
    id: "super_punch",
    name: "SUPER PUNCH",
    cost: 30,
    cd: 15000,
    color: "#d97706",
    damage: 15,
    healPerHit: 5,
    hits: 3,
    interval: 2000,
  },
  {
    id: "super_heal",
    name: "SUPER HEAL",
    cost: 10,
    cd: 90000,
    color: "#059669",
    duration: 5,
  },
];

function setMode(mode) {
  isPVP = mode === "pvp";
  const botLabel = document.getElementById("bot-name-label");
  // const sentinelUI = document.getElementById("display-my-sentinel")?.parentElement;
  const gameWrapper = document.querySelector(".game-wrapper");
  const logContainer = document.getElementById("log-container");
  const cards = document.querySelectorAll(".card, .ornate-card");
  const diffButtons = document.querySelectorAll(
    ".difficulty-selector .diff-btn",
  );

  document
    .querySelectorAll(".mode-selector .diff-btn")
    .forEach((btn) => btn.classList.remove("active-diff"));

  if (isPVP) {
    // if (sentinelUI) sentinelUI.style.display = "none";

    document.getElementById("btn-pvp").classList.add("active-diff");
    game.bot.hp = 100;
    if (botLabel) botLabel.innerText = "PLAYER 2";

    gameWrapper.classList.add("pvp-mode");
    if (logContainer) logContainer.classList.add("pvp-log");
    cards.forEach((card) => card.classList.add("pvp-card"));

    diffButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("btn-disabled");
    });
  } else {

    // if (sentinelUI) sentinelUI.style.display = "block";
    updateSentinelUI();

    document.getElementById("btn-pve").classList.add("active-diff");
    game.bot.hp = 200;
    if (botLabel) botLabel.innerText = "JOVITA";

    gameWrapper.classList.remove("pvp-mode");
    if (logContainer) logContainer.classList.remove("pvp-log");
    cards.forEach((card) => card.classList.remove("pvp-card"));

    // ENABLE kembali tombol difficulty saat PvE
    diffButtons.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("btn-disabled");
    });
    log("MODE: PLAYER VS BOT (JOVITA)");
  }

  if (document.getElementById("p1-skills")) {
    init();
  }
}

// let game = {
//   turn: "p1",
//   timer: 5.0,
//   active: true,
//   event: { type: "none", time: 0 },
//   p1: {
//     hp: 100,
//     mana: 30,
//     shield: 0,
//     freeze: 0,
//     burn: 0,
//     sHeal: 0,
//     cds: {},
//   },
//   bot: {
//     hp: 200,
//     mana: 40,
//     shield: 0,
//     freeze: 0,
//     burn: 0,
//     sHeal: 0,
//     cds: {},
//   },
// };

["p1", "bot"].forEach((p) => SKILLS.forEach((s) => (game[p].cds[s.id] = 0)));

function init() {
  const P1_KEYS = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  const P2_KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  ["p1", "bot"].forEach((p) => {
    const cont = document.getElementById(`${p}-skills`);
    const keys = p === "p1" ? P1_KEYS : P2_KEYS;

    if (isPVP) {
      cont.classList.add("grid-3-col");
    } else {
      cont.classList.remove("grid-3-col");
    }

    cont.innerHTML = "";

    SKILLS.forEach((s, index) => {
      const keyLabel = keys[index];

      const hintClass = isPVP ? "visible-hint" : "hidden-hint";
      const displayKey = isPVP ? `[${keyLabel}]` : "";

      cont.innerHTML += `
        <div class="skill-box" style="display: flex; flex-direction: column; align-items: center; position: relative;">
            <div class="key-hint ${hintClass}" style="font-size: 9px; font-family: monospace;">
                ${displayKey}
            </div>
            <div id="${p}-${s.id}-txt" class="cd-text"></div>
            <button id="${p}-${s.id}-btn" 
                    onclick="useSkill('${s.id}','${p}')" 
                    style="border-bottom:2px solid ${s.color}; width: 100%; font-size: 10px; padding: 5px 0;">
                ${s.name}
            </button>
            <div id="${p}-${s.id}-cd" class="cd-overlay"></div>
        </div>`;
    });
  });

  if (typeof adjustGridToThreeColumns === "function") {
    adjustGridToThreeColumns();
  }
}

function startGame() {
  game.active = true;

  game.p1.hp = 100;
  game.p1.mana = 30;
  game.p1.freeze = 0;
  game.p1.burn = 0;
  game.p1.sHeal = 0;

  game.p1.isShielded = false; 
  game.p1.shieldTurns = 0;

  const startBtn = document.querySelector(".start-btn");
  
  if (typeof startSentinelLoop === "function" && !isPVP) {
    startSentinelLoop();
    console.log("Sentinel system initiated for PvE battle.");
  } else {
    if (typeof sentinelTimer !== 'undefined' && sentinelTimer) {
        clearInterval(sentinelTimer);
        sentinelTimer = null;
    }
    console.log("Sentinel system disabled for Duel (PVP).");
  }
  
  if (!isPVP) {
    game.bot.hp = 200;
    game.bot.maxHp = 200;
  } else {
    game.bot.hp = 100;
    game.bot.maxHp = 100;
  }

  if (startBtn) {
    startBtn.disabled = true;
    startBtn.innerText = "ENTERING THE ARENA...";
  }
  const overlay = document.getElementById("start-overlay");
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    setTimeout(() => overlay.remove(), 500);
  }
  init();

  const gameLoop = setInterval(() => {
    if (!game.active) {
      clearInterval(gameLoop);
      return;
    }

    if (game[game.turn].freeze > 0) {
      game[game.turn].freeze -= 0.1;
      if (game[game.turn].freeze <= 0) {
        game[game.turn].freeze = 0;
        document.getElementById(`${game.turn}-card`).classList.remove("frozen");
        log(`${game.turn.toUpperCase()} sudah tidak membeku!`);
        changeTurn();
      }
    } else {
      game.timer -= 0.1;
      if (game.timer <= 0) changeTurn();
    }

    ["p1", "bot"].forEach((p) => {
      if (game[p].burn > 0) {
        game[p].burn -= 0.1;
        game[p].hp -= 0.5;
        document.getElementById(`${p}-card`).classList.add("burning");
        if (game[p].hp <= 0) win(p === "p1" ? "bot" : "p1");
        if (game[p].burn <= 0) {
          game[p].burn = 0;
          document.getElementById(`${p}-card`).classList.remove("burning");
        }
      }
      const maxHP = p === "bot" ? 200 : 100; // --> HP BOT/PLAYER
      if (game[p].sHeal > 0) {
        game[p].sHeal -= 0.1;
        let healPerTick = (maxHP * 1) / 45;
        game[p].hp = Math.min(maxHP, game[p].hp + healPerTick);

        createHealParticle(p);

        const card = document.getElementById(`${p}-card`);
        if (card) card.classList.add("super-healing-active");

        if (game[p].sHeal <= 0) {
          game[p].sHeal = 0;
          if (card) card.classList.remove("super-healing-active");
        }
      }
      updateDebuffLabel(p);
    });

    let mR = 0.3,
      hR = 0;
    if (game.event.time > 0) {
      game.event.time -= 0.1;
      if (game.event.type === "MANA") mR = 1.2;
      if (game.event.type === "HEALTH") hR = 0.25;
      if (game.event.time <= 0) {
        document.getElementById("event-banner").className = "";
        document
          .querySelectorAll(".mana-fill")
          .forEach((el) => el.classList.remove("mana-shaking-active"));
      }
    } else if (Math.random() < 0.01) {
      startEvent();
    }

    ["p1", "bot"].forEach((i) => {
      const maxHP = i === "bot" && !isPVP ? 200 : 100;
      game[i].mana = Math.min(100, game[i].mana + mR);
      game[i].hp = Math.min(maxHP, game[i].hp + hR);
    });

    document.getElementById("global-timer").innerText = game.timer.toFixed(1);
    updateUI();
  }, 100);

  log("⚔ Pertarungan Dimulai!");

  let icon = "⚙️";
  if (selectedDiff === 'easy') icon = "🌱";
  else if (selectedDiff === 'normal') icon = "⚔️";
  else if (selectedDiff === 'hard') icon = "💀";
  else if (selectedDiff === 'expert') icon = "🔥";
  else if (selectedDiff === 'insanity') icon = "👁️";

  log(`${icon} MODE: ${selectedDiff.toUpperCase()} DIFFICULTY`);
}

function playIntro(callback) {
    const introDiv = document.getElementById("intro-cinematic");
    const normalCont = document.getElementById("intro-text-container");
    const splitCont = document.getElementById("mortal-split-container");
    const words = ["YOU", "CHALLENGE", "ME", "MORTAL?"];
    
    introDiv.style.display = "flex";
    introDiv.style.opacity = "1";
    introDiv.classList.remove("thunder-shock", "trigger-split", "fire-flash");
    
    normalCont.style.display = "flex";
    splitCont.style.display = "none";
    
    let currentWord = 0;

    const wordInterval = setInterval(() => {
        if (currentWord < words.length) {
            const word = words[currentWord];

        if (word === "MORTAL?") {
            clearInterval(wordInterval);
            normalCont.style.display = "none";
            splitCont.style.display = "flex";

            if (typeof ultiSound !== 'undefined') {
                ultiSound.currentTime = 0;
                ultiSound.play();
            }

            setTimeout(() => {
                introDiv.classList.add("thunder-shock");

                setTimeout(() => {
                    introDiv.classList.add("fire-flash"); 
                    
                    if (typeof strikeSound !== 'undefined') {
                        strikeSound.currentTime = 0;
                        strikeSound.play();
                    }

                    setTimeout(() => {

                        introDiv.classList.add("trigger-split");
                        
                        document.body.style.animation = "shake-screen 0.4s cubic-bezier(.36,.07,.19,.97) both";

                        setTimeout(() => {
                            introDiv.classList.add("trigger-final-flash");

                            setTimeout(() => {
                                introDiv.style.display = "none";
                                introDiv.classList.remove("thunder-shock", "fire-flash", "trigger-split", "trigger-final-flash");
                                document.body.style.animation = "";
                                
                                if (callback) callback(); 
                            }, 400);
                        }, 250);
                    }, 60);
                }, 300);
            }, 800); 
        } else {
                    normalCont.innerHTML = `
                        <span class="glitch-effect" data-text="${word}">
                            ${word}
                        </span>`;
                    
                    strikeSound.currentTime = 0;
                    strikeSound.play();
                    currentWord++;
                }
            }
        }, 1000);
    }

function initiateBattle() {
    const overlay = document.getElementById("start-overlay");
    
    if (selectedDiff === "insanity") {
        if (overlay) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            setTimeout(() => overlay.remove(), 500);
        }
        
        playIntro(startGame);
        
    } else {
        if (overlay) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            setTimeout(() => overlay.remove(), 500);
        }
        
        startGame();
    }
}

function updateDebuffLabel(p) {
  let txt = "";
  if (game[p].shield > 0) {
    txt += `🛡️Defflect ${game[p].shield} Attacks `;
  }
  if (game[p].freeze > 0) txt += `❄️ FROZEN (${game[p].freeze.toFixed(1)}s) `;
  if (game[p].burn > 0) txt += `🔥 BURNING (${game[p].burn.toFixed(1)}s) `;
  if (game[p].sHeal > 0) txt += `✨ REGEN (${game[p].sHeal.toFixed(1)}s)`;
  const el = document.getElementById(`${p}-debuff`);
  el.innerText = txt;
  if (game[p].freeze > 0) el.style.color = "var(--freeze)";
  else if (game[p].burn > 0) el.style.color = "var(--burn)";
  else if (game[p].shield > 0) el.style.color = "#fdff6bb0";
  else if (game[p].sHeal > 0) el.style.color = "#4ade80";
  else el.style.color = "";
}

function startEvent() {
  game.event.type = Math.random() > 0.3 ? "MANA" : "HEALTH";
  game.event.time = 30;
  const b = document.getElementById("event-banner");
  b.innerText = `✦ ${game.event.type} SURGE ACTIVE ✦`;
  b.className = "event-active";
  if (game.event.type === "MANA") {
    document
      .querySelectorAll(".mana-fill")
      .forEach((el) => el.classList.add("mana-shaking-active"));
  }
  log(`✦ EVENT: ${game.event.type} SURGE dimulai!`);
}

function useSkill(sid, pid) {
  if (pid !== game.turn || !game.active || game[pid].freeze > 0) return;
  const s = SKILLS.find((x) => x.id === sid);
  const now = Date.now();
  const opp = pid === "p1" ? "bot" : "p1";
  if (now < game[pid].cds[sid] || game[pid].mana < s.cost) return;

  game[pid].mana -= s.cost;

  if (selectedDiff === "insanity" && pid === "bot") {
    if (s.cd > 10000 && s.cd <= 30000) {
      game[pid].cds[sid] = now + 9900;
    } 
    else {
      game[pid].cds[sid] = now + s.cd;
    }
  } else {
    game[pid].cds[sid] = now + s.cd;
  }

  // game[pid].cds[sid] = now + s.cd; // ---> ORIGINAL CD YEHHH

  if (sid === "strike") {
    let d = (selectedDiff === "insanity" && pid === "bot") ? calc(15, 20, opp) : calc(10, 16, opp);
    game[opp].hp -= d;
    
    strikeSound.currentTime = 0;
    strikeSound.play();
    setTimeout(() => {
      strikeSound.pause();
      strikeSound.currentTime = 0;
    }, 2000);
    let manaGain = pid === "p1" ? 25 : 15;
    game[pid].mana = Math.min(100, game[pid].mana + manaGain);
    createStrikeVisual(opp);
    log(
      `${pid.toUpperCase()} Strike! ${opp.toUpperCase()} -${d} HP. (+${manaGain} Mana)`,
    );
  } else if (sid === "heal") {
    const maxHP = (pid === "bot" && !isPVP) ? 200 : 100;
    const healAmount = (pid === "bot" && !isPVP) ? 45 : 35;

    game[pid].hp = Math.min(maxHP, game[pid].hp + healAmount);
    
    const card = document.getElementById(`${pid}-card`);
    card.classList.add("healing-active");
    for (let i = 0; i < 5; i++) createHealParticle(pid);
    setTimeout(() => card.classList.remove("healing-active"), 800);
    
    log(`${pid.toUpperCase()} menggunakan Heal! (+${healAmount} HP)`);
  } else if (sid === "burning") {
    game[opp].burn = 6.0;
    log(
      `🔥 ${pid.toUpperCase()} membakar ${opp.toUpperCase()} selama 6 detik!`,
    );
  } else if (sid === "shield") {
    game[pid].shield = 2;
    updateDebuffLabel(pid);
    const card = document.getElementById(`${pid}-card`);
    card.style.transition = "all 0.3s ease";
    card.style.transform = "scale(1.1)";
    if (typeof createShieldBurst === "function") {
      createShieldBurst(pid);
    }
    for (let i = 0; i < 3; i++) {
      const p = document.createElement("div");
      p.className = "heal-particle";
      p.innerText = "🛡️";
      p.style.left =
        card.getBoundingClientRect().left + Math.random() * 100 + "px";
      p.style.top = card.getBoundingClientRect().top + "px";
      p.style.color = "#60a5fa";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
    setTimeout(() => (card.style.transform = "scale(1.02)"), 300);
    log(
      `🛡️ ${pid.toUpperCase()} Mengaktifkan Pelindung (75% Damage Reduction)!`,
    );
  } else if (sid === "vampire") {
    let baseDamage = 20;
    let d = game[opp].shield > 0 ? Math.floor(baseDamage * 0.25) : baseDamage;
    game[opp].hp -= d;

    let vampHeal = 25;
    const maxHP_vamp = (pid === "bot" && !isPVP) ? 200 : 100;
    game[pid].hp = Math.min(maxHP_vamp, game[pid].hp + vampHeal);
    
    createVampireVisual(pid, opp);
    log(`🦇 ${pid.toUpperCase()} Vampire! Sedot ${d} HP & Heal ${vampHeal} HP.`);
  } else if (sid === "freeze") {
    game[opp].freeze = 3.0;
    document.getElementById(`${opp}-card`).classList.add("frozen");
    log(`❄️ ${pid.toUpperCase()} membekukan ${opp.toUpperCase()}!`);
  } else if (sid === "ulti") {
    let d = (selectedDiff === "insanity" && pid === "bot") ? calc(50, 75, opp) : calc(35, 50, opp);
    ultiSound.currentTime = 0;
    ultiSound.play();
    setTimeout(() => {
      ultiSound.pause();
      ultiSound.currentTime = 0;
    }, 2000);
    const flash = document.createElement("div");
    flash.className = "ulti-flash";
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 700);
    const card = document.getElementById(`${pid}-card`);
    const rect = card.getBoundingClientRect();
    const wave = document.createElement("div");
    wave.className = "shockwave";
    wave.style.left = rect.left + rect.width / 2 + "px";
    wave.style.top = rect.top + rect.height / 2 + "px";
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
    const oppCard = document.getElementById(`${opp}-card`);
    const oppRect = oppCard.getBoundingClientRect();
    const popup = document.createElement("div");
    popup.className = "dmg-popup";
    popup.innerText = `-${d}`;
    popup.style.left = oppRect.left + oppRect.width / 2 - 30 + "px";
    popup.style.top = oppRect.top + oppRect.height / 2 + "px";
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 800);
    game[opp].hp -= d;
    document.getElementById("arena").classList.add("shake");
    setTimeout(
      () => document.getElementById("arena").classList.remove("shake"),
      500,
    );
    log(
      `💥 ULTIMATE: ${pid.toUpperCase()} Menghancurkan ${opp.toUpperCase()} sebesar ${d} HP!`,
    );
  } else if (sid === "super_punch") {
    executeSuperPunch(pid, opp);
    log(
      `👊 ${pid.toUpperCase()} Menggunakan SUPER PUNCH! (3x Serangan Beruntun)`,
    );
  } else if (sid === "super_heal") {
    const sk = SKILLS.find((x) => x.id === "super_heal");
    game[pid].sHeal = sk.duration;
    for (let i = 0; i < 15; i++)
      setTimeout(() => createHealParticle(pid), i * 50);
    createSuperHealVisual(pid);
    log(
      `✨ ${pid.toUpperCase()} mengaktifkan SUPER HEAL! (Heal Berkala)`,
    );
  }

  if (game[opp].hp <= 0) win(pid);
  else changeTurn();
}

function changeTurn() {
  if (!game.active) return;

  game.turn = game.turn === "p1" ? "bot" : "p1";
  game.timer = 5.0;

  document.body.classList.remove("active-p1", "active-bot");
  document.body.classList.add(`active-${game.turn}`);

  if (game.p1.isShielded) {
    game.p1.shieldTurns--;
    if (game.p1.shieldTurns <= 0) {
      game.p1.isShielded = false;
      log("🛡️ Efek perlindungan Thalor telah habis.");
    }
  }
  
  updateDebuffLabel("p1");
  updateDebuffLabel("bot");

  if (game[game.turn].shield > 0) game[game.turn].shield--;
  
  if (game[game.turn].freeze > 0) return;

  // Logika AI Bot
  if (game.turn === "bot" && !isPVP) {
    setTimeout(() => {
      if (selectedDiff === "easy") {
        botAIEasy();
      } else if (selectedDiff === "normal") {
        botAI();
      } else if (selectedDiff === "hard") {
        botAIHard();
      } else if (selectedDiff === "expert") {
        if (typeof botAIExpert === "function") botAIExpert();
        else botAIHard();
      } else if (selectedDiff === "insanity") {
        // Pastikan fungsi botAIInsanity sudah kamu buat
        if (typeof botAIInsanity === "function") botAIInsanity();
        else if (typeof botAIExpert === "function") botAIExpert();
        else botAIHard();
      } else {
        botAI();
      }
    }, 1000);
  }
}

// function changeTurn() {
//   if (!game.active) return;
//   game.turn = game.turn === "p1" ? "bot" : "p1";
//   game.timer = 5.0;
//   document.body.className = `active-${game.turn}`;
//   if (game[game.turn].shield > 0) game[game.turn].shield--;
//   if (game[game.turn].freeze > 0) return;
//   if (game.turn === "bot") {
//     setTimeout(() => {
//       if (selectedDiff === "easy") botAIEasy();
//       else if (selectedDiff === "hard") botAIHard();
//       else botAI();
//     }, 1000);
//   }
// }

function updateUI() {
  const now = Date.now();
  ["p1", "bot"].forEach((p) => {
    const maxHP = p === "bot" && !isPVP ? 200 : 100;
    const hpPercent = (game[p].hp / maxHP) * 100;
    const hpBar = document.getElementById(`${p}-hp`);
    if (hpBar) hpBar.style.width = Math.max(0, hpPercent) + "%";
    const hpText = document.getElementById(`${p}-hp-t`);
    if (hpText)
      hpText.innerText = `${Math.ceil(Math.max(0, game[p].hp))}/${maxHP}`;

    document.getElementById(`${p}-hp`).style.width =
      Math.max(0, hpPercent) + "%";
    document.getElementById(`${p}-mana`).style.width = game[p].mana + "%";
    document.getElementById(`${p}-hp-t`).innerText =
      `${Math.ceil(Math.max(0, game[p].hp))}/${maxHP}`;
    document.getElementById(`${p}-mana-t`).innerText =
      Math.floor(game[p].mana) + "/100";
    const card = document.getElementById(`${p}-card`);
    game[p].shield > 0
      ? card.classList.add("shield-active")
      : card.classList.remove("shield-active");
    SKILLS.forEach((s) => {
      const btn = document.getElementById(`${p}-${s.id}-btn`);
      const over = document.getElementById(`${p}-${s.id}-cd`);
      const txt = document.getElementById(`${p}-${s.id}-txt`);
      const rem = game[p].cds[s.id] - now;
      if (rem > 0) {
        over.style.height = (rem / s.cd) * 100 + "%";
        txt.innerText = (rem / 1000).toFixed(1);
        btn.disabled = true;
        if (s.id === "super_heal") btn.classList.remove("ready-to-use");
      } else {
        over.style.height = "0%";
        txt.innerText = "";
        if (s.id === "super_heal") {
          if (hpPercent < 30) {
            btn.disabled =
              game.turn !== p || game[p].mana < s.cost || game[p].freeze > 0;
            btn.classList.toggle("ready-to-use", !btn.disabled);
            btn.innerText = s.name;
            btn.style.fontSize = "";
          } else {
            btn.disabled = true;
            btn.innerText = "SUPER HEAL <30HP";
            btn.classList.remove("ready-to-use");
            btn.style.fontSize = "9px";
          }
        } else {
          btn.disabled =
            game.turn !== p || game[p].mana < s.cost || game[p].freeze > 0;
          btn.innerText = s.name;
          btn.style.fontSize = "";
        }
      }
    });
  });
}

function calc(min, max, t) {
  let b = Math.floor(Math.random() * (max - min + 1)) + min;
  
  if (game[t].shield > 0) {
    return Math.floor(b * 0.25);
  }
  
  if (game[t].isShielded) {
    return Math.floor(b * 0.25); 
  }

  return b;
}

function log(m) {
  const l = document.getElementById("log");
  if (selectedDiff === "insanity" && Math.random() > 0.7) {
      m = m.replace(/[a-z]/g, "☠");
  }
  l.innerHTML = `<div>◈ ${m}</div>` + l.innerHTML;
}

function win(id) {
  game.active = false;

  document.body.classList.remove("insanity-active");
  const arena = document.getElementById("arena");
  if (arena) {
    arena.style.animation = "";
    arena.classList.remove("shake");
  }

  const resOverlay = document.getElementById("result-overlay");
  const resTitle = document.getElementById("result-title");
  const resMsg = document.getElementById("result-message");
  const resWinner = document.getElementById("winner-name");
  resOverlay.style.display = "flex";
  if (id === "p1") {
    resTitle.innerText = "VICTORY";
    resTitle.style.color = "#4ade80";
    resWinner.innerText = "THE ENTITY IS VANQUISHED";
    resWinner.style.color = "#4ade80";
    if (!isPVP && selectedDiff === "expert") {
      unlockInsanityMode();
      resMsg.innerText = "The whispers grow louder... The INSANITY has been unleashed. There is no turning back.";
      resMsg.style.color = "#ff4444";

      const gachaBtn = document.createElement("button");
      gachaBtn.className = "start-btn";
      gachaBtn.style.marginTop = "10px";
      gachaBtn.innerText = "✨ SUMMON SENTINEL ✨";
      gachaBtn.onclick = () => openGacha();
      document.querySelector("#result-overlay .popup-content").appendChild(gachaBtn);

    } else {
      resMsg.innerText = "The entity Jovita is banished back into the starless void. Your soul remains... for now.";
      resMsg.style.color = "";
    }
  } else {
    resTitle.innerText = "DEFEAT";
    resTitle.style.color = "#f87171";
    resMsg.innerText = "Your blood shall stain the altar. Die in silence, or rise to fail again.";
    resWinner.innerText = "CRUSHED INTO OBLIVION";
    resWinner.style.color = "#f87171";
  }
  const startBtn = document.querySelector(".start-btn");
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.innerText = "TRY AGAIN";
    startBtn.onclick = () => location.reload();
  }
}

// Key  untuk P1 dan P2/Bot
const P1_KEYS = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
const P2_KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

window.addEventListener("keydown", (e) => {
  if (!game.active) return;

  const key = e.key.toLowerCase();

  // Kontrol Player 1
  if (P1_KEYS.includes(key)) {
    const index = P1_KEYS.indexOf(key);
    if (SKILLS[index]) useSkill(SKILLS[index].id, "p1");
  }

  // Kontrol Player 2 (Hanya jika isPVP aktif)
  if (isPVP && P2_KEYS.includes(key)) {
    const index = P2_KEYS.indexOf(key);
    if (SKILLS[index]) useSkill(SKILLS[index].id, "bot");
  }
});

function executeSuperPunch(pid, opp) {
  let hitsDone = 0;
  const s = SKILLS.find((x) => x.id === "super_punch");

  function performPunch() {
    if (!game.active) return false;

    let baseDmg = (selectedDiff === "insanity" && pid === "bot") ? 20 : s.damage;
    let d = calc(baseDmg, baseDmg, opp);

    game[opp].hp -= d;

    const currentMaxHP = (pid === "bot" && !isPVP) ? 200 : 100;

    let healAmount, manaGain;
    if (isPVP || pid === "p1") {
      healAmount = 7;
      manaGain = 8;
    } else {
      healAmount = s.healPerHit;
      manaGain = 5;
    }

    game[pid].hp = Math.min(currentMaxHP, game[pid].hp + healAmount);
    game[pid].mana = Math.min(100, game[pid].mana + manaGain);

    createSuperPunchVisual(opp);
    createHealParticle(pid);

    let mText = manaGain > 0 ? ` (+${manaGain} Mana)` : "";
    let hText = ` (+${healAmount} HP)`;
    log(`👊 PUNCH ${hitsDone + 1}: ${opp.toUpperCase()} -${d} HP!${hText}${mText}`);

    if (game[opp].hp <= 0) {
      win(pid);
      return true;
    }

    updateUI();
    return false;
  }

  // Jalankan Pukulan Pertama Secara Instan
  if (performPunch()) return;
  hitsDone++;

  // Jalankan Pukulan ke-2 dan ke-3 dengan Jeda (Interval)
  const punchTimer = setInterval(() => {
    if (hitsDone >= 3 || !game.active) {
      clearInterval(punchTimer);
      return;
    }
    
    const isDead = performPunch();
    if (isDead) {
      clearInterval(punchTimer);
    }
    hitsDone++;
  }, s.interval);
}

