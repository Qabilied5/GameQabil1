let selectedDiff = "normal";

function selectDifficulty(level) {
  selectedDiff = level;

  document
    .querySelectorAll(".diff-btn")
    .forEach((btn) => btn.classList.remove("active-diff"));
  document.getElementById(`${level}-btn`).classList.add("active-diff");
}

// GAME BEGIN ---------------------------------------------------------
const strikeSound = new Audio("/audio/StrikeSound.mp3");
strikeSound.preload = "auto";
strikeSound.volume = 0.6;

const ultiSound = new Audio("/audio/UltimateSound.mp3");
ultiSound.preload = "auto";
ultiSound.volume = 1.0;

const SKILLS = [
  { id: "strike", name: "STRIKE", cost: 5, cd: 5000, color: "#555" },
  { id: "heal", name: "HEAL", cost: 50, cd: 13000, color: "#27ae60" },
  { id: "burning", name: "BURNING", cost: 45, cd: 20000, color: "#e67e22" },
  { id: "vampire", name: "VAMPIRE", cost: 45, cd: 15000, color: "#8e44ad" },
  { id: "shield", name: "SHIELD", cost: 20, cd: 10000, color: "#2980b9" },
  { id: "freeze", name: "FREEZE", cost: 15, cd: 30000, color: "#74b9ff" },
  { id: "ulti", name: "ULTI", cost: 65, cd: 30000, color: "#c0392b" },
  {
    id: "super_punch",
    name: "SUPER PUNCH",
    cost: 30,
    cd: 15000,
    color: "#f1c40f",
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
    color: "#00ff88",
    duration: 5,
    percent: 0.9,
  },
];

let game = {
  turn: "p1",
  timer: 5.0,
  active: true,
  event: { type: "none", time: 0 },
  p1: { hp: 100, mana: 30, shield: 0, freeze: 0, burn: 0, sHeal: 0, cds: {} },
  bot: { hp: 200, mana: 40, shield: 0, freeze: 0, burn: 0, sHeal: 0, cds: {} },
};

// Init CDs
["p1", "bot"].forEach((p) => SKILLS.forEach((s) => (game[p].cds[s.id] = 0)));

function init() {
  ["p1", "bot"].forEach((p) => {
    const cont = document.getElementById(`${p}-skills`);
    SKILLS.forEach((s) => {
      cont.innerHTML += `
                        <div class="skill-box">
                            <div id="${p}-${s.id}-txt" class="cd-text"></div>
                            <button id="${p}-${s.id}-btn" onclick="useSkill('${s.id}', '${p}')" style="border-bottom: 3px solid ${s.color}">${s.name}</button>
                            <div id="${p}-${s.id}-cd" class="cd-overlay"></div>
                        </div>`;
    });
  });
}

// Fungsi untuk memulai game dari Popup
function startGame() {
  const startBtn = document.querySelector(".start-btn");
  if (startBtn) {
    startBtn.disabled = true; // Matikan tombol agar tidak bisa diklik lagi
    startBtn.innerText = "LOADING..."; // Opsional: Beri feedback visual
  }

  const overlay = document.getElementById("start-overlay");
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none"; // Tambahan: Agar klik tidak tembus
    setTimeout(() => overlay.remove(), 500);
  }

  init();

  const gameLoop = setInterval(() => {
    if (!game.active) {
      clearInterval(gameLoop); // Berhenti jika ada yang menang
      return;
    }

    // --- LOGIKA FREEZE & TIMER ---
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

    // --- LOGIKA BURNING & REGEN ---
    ["p1", "bot"].forEach((p) => {
      // Burning logic
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

      // Super Heal logic
      const maxHP = p === "bot" ? 200 : 100;
      if (game[p].sHeal > 0) {
        game[p].sHeal -= 0.1;
        let healPerTick = (maxHP * 0.7) / 100;
        game[p].hp = Math.min(maxHP, game[p].hp + healPerTick);
        createHealParticle(p);
        document
          .getElementById(`${p}-card`)
          .classList.add("super-healing-active");
        if (game[p].sHeal <= 0) {
          game[p].sHeal = 0;
          document
            .getElementById(`${p}-card`)
            .classList.remove("super-healing-active");
        }
      }
      updateDebuffLabel(p);
    });

    // --- LOGIKA EVENT & REGEN MANA ---
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
      const maxHP = i === "bot" ? 200 : 100;
      game[i].mana = Math.min(100, game[i].mana + mR);
      game[i].hp = Math.min(maxHP, game[i].hp + hR);
    });

    document.getElementById("global-timer").innerText = game.timer.toFixed(1);
    updateUI();
  }, 100);

  log("Pertarungan Dimulai!");
}

// function updateDebuffLabel(p) {
//     let txt = "";
//     if (game[p].freeze > 0) txt += `❄️ FROZEN (${game[p].freeze.toFixed(1)}s) `;
//     if (game[p].burn > 0) txt += `🔥 BURNING (${game[p].burn.toFixed(1)}s)`;
//     document.getElementById(`${p}-debuff`).innerText = txt;
//     document.getElementById(`${p}-debuff`).style.color = game[p].freeze > 0 ? "var(--freeze)" : "var(--burn)";
// }

function updateDebuffLabel(p) {
  let txt = "";
  if (game[p].freeze > 0) txt += `❄️ FROZEN (${game[p].freeze.toFixed(1)}s) `;
  if (game[p].burn > 0) txt += `🔥 BURNING (${game[p].burn.toFixed(1)}s) `;
  if (game[p].sHeal > 0) txt += `✨ REGEN (${game[p].sHeal.toFixed(1)}s)`; // Tambahkan ini

  const el = document.getElementById(`${p}-debuff`);
  el.innerText = txt;

  // Atur warna label: Prioritas Freeze > Burn > Regen
  if (game[p].freeze > 0) el.style.color = "var(--freeze)";
  else if (game[p].burn > 0) el.style.color = "var(--burn)";
  else if (game[p].sHeal > 0) el.style.color = "#00ff88";
}

function startEvent() {
  // 1. Tentukan Tipe (Contoh 60% MANA, 40% HEALTH)
  game.event.type = Math.random() > 0.3 ? "MANA" : "HEALTH";

  // 2. Set Durasi
  game.event.time = 30;

  // 3. Update Banner
  const b = document.getElementById("event-banner");
  b.innerText = `${game.event.type} BOOST ACTIVE!`;
  b.className = "event-active";

  // 4. Picu Efek Visual Segera
  if (game.event.type === "MANA") {
    document.querySelectorAll(".mana-fill").forEach((el) => {
      el.classList.add("mana-shaking-active");
    });
  }

  log(`!!! EVENT: ${game.event.type} BOOST DIMULAI !!!`);
}

function useSkill(sid, pid) {
  if (pid !== game.turn || !game.active || game[pid].freeze > 0) return;
  const s = SKILLS.find((x) => x.id === sid);
  const now = Date.now();
  const opp = pid === "p1" ? "bot" : "p1";

  if (now < game[pid].cds[sid] || game[pid].mana < s.cost) return;

  game[pid].mana -= s.cost;
  game[pid].cds[sid] = now + s.cd;

  if (sid === "strike") {
    let d = calc(10, 16, opp);
    game[opp].hp -= d;

    strikeSound.currentTime = 0;
    strikeSound.play();

    setTimeout(() => {
      strikeSound.pause();
      strikeSound.currentTime = 0;
    }, 2000);

    // LOGIKA BARU: Cek jika yang memukul adalah player ('p1')
    // Jika iya, beri mana 25 (lebih besar), jika bot beri 15.
    let manaGain = pid === "p1" ? 25 : 15;
    game[pid].mana = Math.min(100, game[pid].mana + manaGain);

    createStrikeVisual(opp);

    log(
      `${pid.toUpperCase()} Strike! ${opp.toUpperCase()} -${d} HP. (+${manaGain} Mana)`,
    );
  } else if (sid === "heal") {
    // 1. Tentukan batas HP maksimal dan jumlah heal berdasarkan siapa yang pakai
    const isBot = pid === "bot";
    const maxHP = isBot ? 200 : 100;
    const healAmount = isBot ? 50 : 30;

    // 2. Terapkan penambahan HP dengan batas yang sesuai
    game[pid].hp = Math.min(maxHP, game[pid].hp + healAmount);

    // --- EFEK VISUAL HEAL ---
    const card = document.getElementById(`${pid}-card`);
    card.classList.add("healing-active");

    // Munculkan partikel "+" Heal
    for (let i = 0; i < 5; i++) {
      createHealParticle(pid);
    }

    setTimeout(() => card.classList.remove("healing-active"), 800);

    // Log pesan dengan jumlah heal yang dinamis
    log(`${pid.toUpperCase()} menggunakan Heal! (+${healAmount} HP)`);
  } else if (sid === "burning") {
    game[opp].burn = 6.0;
    log(
      `🔥 ${pid.toUpperCase()} membakar ${opp.toUpperCase()} selama 6 detik!`,
    );
  } else if (sid === "shield") {
    // Memberikan 2 poin shield (akan berkurang tiap turn)
    game[pid].shield = 2;

    // Efek Visual Instan saat diaktifkan
    const card = document.getElementById(`${pid}-card`);
    card.style.transition = "all 0.3s ease";
    card.style.transform = "scale(1.1)";

    // Partikel Shield
    for (let i = 0; i < 3; i++) {
      const p = document.createElement("div");
      p.className = "heal-particle"; // Kita pinjam class heal tapi ganti warna di bawah
      p.innerText = "🛡️";
      p.style.left =
        card.getBoundingClientRect().left + Math.random() * 100 + "px";
      p.style.top = card.getBoundingClientRect().top + "px";
      p.style.color = "#3498db";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }

    setTimeout(() => (card.style.transform = "scale(1.02)"), 300);

    log(
      `🛡️ ${pid.toUpperCase()} Mengaktifkan Pelindung (75% Damage Reduction)!`,
    );
  } else if (sid === "vampire") {
    let baseDamage = 20;
    // 0.25 untuk pengurangan 75%
    let d = game[opp].shield > 0 ? Math.floor(baseDamage * 0.25) : baseDamage;

    game[opp].hp -= d;
    game[pid].hp = Math.min(100, game[pid].hp + 20);

    createVampireVisual(pid, opp);
    log(`🦇 ${pid.toUpperCase()} Vampire! Sedot ${d} HP & Heal 20 HP.`);
  } else if (sid === "freeze") {
    game[opp].freeze = 3.0;
    document.getElementById(`${opp}-card`).classList.add("frozen");
    log(`❄️ ${pid.toUpperCase()} membekukan ${opp.toUpperCase()}!`);
  } else if (sid === "ulti") {
    let d = calc(35, 50, opp);

    ultiSound.currentTime = 0;
    ultiSound.play();

    setTimeout(() => {
      ultiSound.pause();
      ultiSound.currentTime = 0;
    }, 2000);

    // --- DRAMATIC ULTI EFFECTS ---
    // 1. Flash Layar
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

    // 3. Damage Popup di kartu musuh
    const oppCard = document.getElementById(`${opp}-card`);
    const oppRect = oppCard.getBoundingClientRect();
    const popup = document.createElement("div");
    popup.className = "dmg-popup";
    popup.innerText = `-${d}`;
    popup.style.left = oppRect.left + oppRect.width / 2 - 30 + "px";
    popup.style.top = oppRect.top + oppRect.height / 2 + "px";
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 800);

    // Eksekusi damage & shake
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
    const s = SKILLS.find((x) => x.id === "super_heal");
    game[pid].sHeal = s.duration; // Set durasi 10 detik

    // Efek visual awal (ledakan partikel banyak)
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createHealParticle(pid), i * 50);
    }

    createSuperHealVisual(pid);

    log(
      `✨ ${pid.toUpperCase()} mengaktifkan SUPER HEAL! (Regen 70% HP selama 10 detik)`,
    );
  }

  if (game[opp].hp <= 0) win(pid);
  else changeTurn();
}

function changeTurn() {
  if (!game.active) return; // Jangan ganti turn kalau game sudah selesai

  game.turn = game.turn === "p1" ? "bot" : "p1";
  game.timer = 5.0;

  document.body.className = `active-${game.turn}`;

  if (game[game.turn].shield > 0) game[game.turn].shield--;

  if (game[game.turn].freeze > 0) return;

  if (game.turn === "bot") {
    setTimeout(() => {
      if (selectedDiff === "easy") {
        botAIEasy();
      } else if (selectedDiff === "hard") {
        botAIHard();
      } else {
        botAI();
      }
    }, 1000);
  }
}

function updateUI() {
  const now = Date.now();
  ["p1", "bot"].forEach((p) => {
    // 1. Deklarasi HP Maksimal
    const maxHP = p === "bot" ? 200 : 100;
    const hpPercent = (game[p].hp / maxHP) * 100;

    // 2. Update Visual Bar & Teks
    document.getElementById(`${p}-hp`).style.width =
      Math.max(0, hpPercent) + "%";
    document.getElementById(`${p}-mana`).style.width = game[p].mana + "%";
    document.getElementById(`${p}-hp-t`).innerText =
      Math.ceil(Math.max(0, game[p].hp)) + "/" + maxHP;
    document.getElementById(`${p}-mana-t`).innerText =
      Math.floor(game[p].mana) + "/100";

    // 3. Update Shield Visual
    const card = document.getElementById(`${p}-card`);
    if (game[p].shield > 0) {
      card.classList.add("shield-active");
    } else {
      card.classList.remove("shield-active");
    }

    // 4. Update Semua Tombol Skill
    SKILLS.forEach((s) => {
      const btn = document.getElementById(`${p}-${s.id}-btn`);
      const over = document.getElementById(`${p}-${s.id}-cd`);
      const txt = document.getElementById(`${p}-${s.id}-txt`);
      const rem = game[p].cds[s.id] - now;

      if (rem > 0) {
        // KONDISI: SEDANG COOLDOWN
        over.style.height = (rem / s.cd) * 100 + "%";
        txt.innerText = (rem / 1000).toFixed(1);
        btn.disabled = true;
        if (s.id === "super_heal") btn.classList.remove("ready-to-use");
      } else {
        // KONDISI: TIDAK COOLDOWN
        over.style.height = "0%";
        txt.innerText = "";

        // --- LOGIKA KHUSUS LOCK SUPER HEAL 30% ---
        if (s.id === "super_heal") {
          if (hpPercent < 30) {
            // Jika HP di bawah 30%, cek Mana, Turn, dan Status Freeze
            btn.disabled =
              game.turn !== p || game[p].mana < s.cost || game[p].freeze > 0;

            if (!btn.disabled) {
              btn.classList.add("ready-to-use");
            } else {
              btn.classList.remove("ready-to-use");
            }
          } else {
            // HP MASIH TINGGI (LOCK AKTIF)
            btn.disabled = true;
            btn.innerText = "SUPER HEAL < 30HP"; // Tampilkan syarat di tombol
            btn.classList.remove("ready-to-use");

            // Opsional: Beri warna merah sedikit agar terlihat sebagai peringatan
            btn.style.fontSize = "10px";
          }
        } else {
          // SKILL LAIN TETAP NORMAL
          btn.disabled =
            game.turn !== p || game[p].mana < s.cost || game[p].freeze > 0;
          btn.innerText = s.name;
          btn.style.fontSize = ""; // Reset font size
        }
      }
    });
  });
}

function calc(min, max, t) {
  let b = Math.floor(Math.random() * (max - min + 1)) + min;
  // Mengurangi 75% damage (hanya 25% yang masuk)
  return game[t].shield > 0 ? Math.floor(b * 0.25) : b;
}

function log(m) {
  const l = document.getElementById("log");
  l.innerHTML = `<div>> ${m}</div>` + l.innerHTML;
}

function win(id) {
  game.active = false;

  const resOverlay = document.getElementById("result-overlay");
  const resTitle = document.getElementById("result-title");
  const resMsg = document.getElementById("result-message");
  const resWinner = document.getElementById("winner-name");

  resOverlay.style.display = "flex";

  if (id === "p1") {
    resTitle.innerText = "VICTORY!";
    resTitle.style.color = "#00ff88";
    resMsg.innerText = "Kamu berhasil menaklukkan BOT Jovita!";
    resWinner.innerText = "PLAYER 1 WINS";
  } else {
    resTitle.innerText = "DEFEAT";
    resTitle.style.color = "#ff4757";
    resMsg.innerText = "Kalah dengan bot?";
    resWinner.innerText = "JOVITA WINS";
  }
}

function executeSuperPunch(pid, opp) {
  let hitsDone = 0;
  const s = SKILLS.find((x) => x.id === "super_punch");

  function performPunch() {
    if (!game.active) return;

    // 1. Hitung Damage (Cek Shield)
    let d = calc(s.damage, s.damage, opp);
    game[opp].hp -= d;

    // 2. Heal Pengguna (Bot & Player tetap dapat Heal)
    const maxHP = pid === "bot" ? 200 : 100;

    let healAmount = pid === "p1" ? 7 : s.healPerHit;

    game[pid].hp = Math.min(maxHP, game[pid].hp + healAmount);

    // 3. LOGIKA MANA KHUSUS PLAYER 1
    let manaText = "";
    if (pid === "p1") {
      game[pid].mana = Math.min(100, game[pid].mana + 8);
      manaText = " (+7 Mana)";
    }

    // --- VISUAL & LOG ---
    createSuperPunchVisual(opp);
    createHealParticle(pid);

    // Log akan otomatis menyesuaikan apakah ada teks "+7 Mana" atau tidak
    log(`👊 PUNCH ${hitsDone + 1}: ${opp.toUpperCase()} -${d} HP!${manaText}`);

    if (game[opp].hp <= 0) {
      win(pid);
      return true;
    }
    updateUI();
    return false;
  }

  // Pukulan pertama
  performPunch();
  hitsDone++;

  // Interval untuk pukulan 2 dan 3
  const punchTimer = setInterval(() => {
    if (hitsDone >= 3 || !game.active) {
      clearInterval(punchTimer);
      return;
    }

    const isDead = performPunch();
    if (isDead) clearInterval(punchTimer);

    hitsDone++;
  }, s.interval);
}
